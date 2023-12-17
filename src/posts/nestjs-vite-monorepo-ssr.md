이번에 NestJS + Vite로 새로운 사이드 프로젝트를 시작하게 되었다.  
가장 익숙한 스택이였으나 프론트엔드를 깊이있게 파본 적이 없기도 하고, 백엔드에 집중하고 싶어 프론트엔드는 항상 React Router를 이용한 심플한 SPA 형태로 작성해왔다. 하지만 SEO 등의 작업을 간단하게나마 하고싶기도 하고, 프론트엔드 앱 배포에 대한 부담과 비용을 줄이고 싶었다. 이러한 이유로 NestJS(express) 내의 template render 기능을 이용하여 모노레포 웹 앱을 세팅해보았다.

페이지 서빙 과정은 다음과 같다.
1. 배포 시, Vite App을 빌드하여 `.js` 파일과 `manifest.json` 파일을 생성한다.
2. 대상 NestJS 라우터에 Template View를 서빙하도록 설정한다.
3. 이 떄, `manifest.json` 파일을 조회하여 적절한 `.js` 파일을 템플릿으로 주입해준다.

위와 같은 방식으로 페이지를 서빙하는 과정을 NestJS 커스텀 데코레이터를 이용해 간단히 하는 작업까지 진행해 볼 예정이다.

# Vite SSR build 설정
전체적인 설정은 Vite 문서의 [Backend Integration](https://vitejs.dev/guide/backend-integration.html) 문서를 참고하였다.  
`vite.config.ts` 파일은 다음과 같다.

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: '../../dist/public',
    emptyOutDir: false,
    manifest: true,
    rollupOptions: {
      input: {
        main: 'src/pages/main.tsx',
      },
    }
  }
})
```

- `outDir`은 모노레포 환경에서 정상적으로 서버 어플리케이션과 같은 디렉토리에 위치할 수 있도록 변경해주었다.
- `manifest` 옵션을 켜줌으로서 각 파일에 대한 manifest 정보를 내보내도록 설정했다.
- `rollupOptions.input`에 각 SSR 페이지에 대한 엔트리포인트를 지정해주었다.

이렇게 설정해주면 outDir 아래에 `manifest.json` 파일이 생성되고 해당 파일에는 다음과 같은 정보가 담겨있다.
```json
{
  "src/pages/main.tsx": {
    "file": "assets/main-1a2b3c4d5e.js",
    "isEntry": true,
    "src": "src/pages/main.tsx"
  }
}
```
위 `.json` 파일을 이용하여 백엔드에서 리액트 앱 JS 파일을 서빙할 수 있다.

# NestJS Template Render 설정
이 부분 또한 NestJS 문서의 [Model-View-Controller](https://docs.nestjs.com/techniques/mvc) 파트를 참고하였다.

우선 hbs 파일이 빌드 output에 포함되어야 하기 때문에 `nest-cli.json` 파일에 다음 내용을 추가한다.
```json
{
  ...
  "compilerOptions": {
    "assets": [
      { "include": "**/*.hbs", "watchAssets": true }
    ]
  }
}
```
위 내용을 추가해줌으로서 `.hbs` 파일이 빌드 대상에 포함되어 dist 폴더에 정상적으로 복사된다.  
이후 문서에 안내되어 있는 대로 `main.ts` 파일에 handlebars를 이용한 ViewEngine을 활성화해주었다.

```typescript
const bootstrap = async () => {
  // ...
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.useStaticAssets(join(__dirname, 'public'));
  app.setViewEngine('hbs');
  // ...
}
```
이 때, `useStaticAssets()` 메서드로 지정한 폴더가 아까 Vite 파트에서 설정해 둔 outDir와 일치해야 한다.

이제 다음과 같은 방법으로 NestJS 컨트롤러에서 다음과 같은 방법으로 리액트 앱을 서빙할 수 있고, 필요할 시 `data-ssr` 어트리뷰트를 이용하여 값을 주입할 수도 있게 된다.

```typescript
@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render("main")
  root() {
    const result = { value: 'test' };
    const manifest = /** TODO **/;

    return { ...manifest, data: JSON.stringify(result) };
  }
}
```

```handlebars
<!-- main.hbs -->
<html>
  <head>
{{#if css}}
    <link rel="stylesheet" href="{{ css }}">
{{/if}}
{{#if file}}
    <script type="module" src="{{ file }}"></script>
{{/if}}
  </head>
  <body>
    <div id="root" data-ssr="{{data}}"></div>
  </body>
</html>
```

하지만 위와 같은 방식은 꽤 많은 양의 코드 중복을 만들어낸다. 모든 엔드포인트마다 manifest에서 적절한 key 값으로 manifest 값을 찾은 뒤 컨트롤러의 반환값으로 넣어주는 코드를 넣어주어야 한다. 결과값을 data-ssr에 넣어주기 위한 역직렬화 과정 또한 필요하다. 이를 방지하기 위해 Custom Decorator를 사용하여 코드를 간소화하기로 했다.

# Custom Decorator 작성
이전까지는 함수를 wrapping하는 커스텀 데코레이터를 작성하기 위해서는 `MetadataScanner`나 `DiscoveryService` 등의 모듈을 이용하여 구현해야 했는데, 이 때 작성해야 하는 코드의 양이 꽤 많은 편이였다. 이번에는 이를 [nestjs-aop](https://github.com/toss/nestjs-aop) 라이브러리를 이용하여 간소화하여 개발하려고 한다.

전체적인 사용법은 해당 라이브러리 문서에 작성되어 있는 대로 설정했고, LazyDecorator 구현체는 다음과 같이 작성했다.
```typescript
@Aspect(SPA_RENDER_DECORATOR)
export class SpaRenderDecorator implements LazyDecorator<any, string> {
  wrap(params: WrapParams<any, string>) {
    return async (...args: any[]) => {
      const data = await params.method(...args);
      const manifestPath = path.join(__dirname, '..', './public/.vite/manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))[`src/pages/${params.metadata}.tsx`];

      return { manifest, data: JSON.stringify(data) };
    }
  }
}

const WithSpaManifest = (name: string) => createDecorator(SPA_RENDER_DECORATOR, name);
export const RenderSpa = (name: string) => applyDecorators(WithSpaManifest(name), Render(name));
```
`WithSpaManifest`는 결과값을 `{ manifest: any, data: string }`을 담당하고, 매번 두개의 데코레이터를 붙이지 않게 하기 위해 `applyDecorators`로 두 데코레이터를 합쳐서 export하였다.

이를 통해 `@RenderSpa('myapp')` 데코레이터를 이용하여 `myapp.hbs`에 `src/pages/myapp.tsx` 키에 해당하는 manifest 정보를 가져와 주입해서 렌더하는 단일 데코레이터를 구현하였다.

---

위와 같은 과정을 통해 NestJS에서 다음과 같은 형태로 Vite App을 렌더할 수 있게 되었다.
```typescript
@RenderSpa('page')
renderPage() {
  return { data: 'hi' };
}
```

```handlebars
<!-- page.hbs -->
<html>
  <head>
{{#with manifest}}
{{#if css}}
    <link rel="stylesheet" href="{{css}}">
{{/if}}
{{#if file}}
    <script type="module" src="{{file}}"></script>
{{/if}}
{{/with}}
  </head>
  <body>
    <div id="root" data-ssr="{{data}}"></div>
  </body>
</html>
```

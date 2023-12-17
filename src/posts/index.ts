import { Post } from "../types/post";

import startBlogContent from './start-blog.md?raw';
import springSuperclassDeserializeContent from './spring-superclass-deserialize.md?raw';
import nestjsViteMonorepoSsrContent from './nestjs-vite-monorepo-ssr.md?raw';

export const allPosts: Post[] = [
  {
    title: 'NestJS + vite로 모노레포 SSR 웹 어플리케이션 구현',
    slug: 'nestjs-vite-monorepo-ssr',
    date: new Date('2023-12-17'),
    tags: ['nestjs', 'vite', 'monorepo', 'ssr'],
    content: nestjsViteMonorepoSsrContent,
  },
  {
    title: '스프링 세션 Deserialize 시 상위 클래스의 프로퍼티가 유실되는 문제',
    slug: 'spring-superclass-deserialize',
    date: new Date('2023-11-08'),
    tags: ['spring', 'spring session'],
    content: springSuperclassDeserializeContent,
  },
  {
    title: '블로그 시작해요',
    slug: 'start-blog',
    date: new Date('2023-11-08'),
    tags: ['etc'],
    content: startBlogContent,
  }
];
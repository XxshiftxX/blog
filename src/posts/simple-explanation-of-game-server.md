 마인크래프트 등의 게임을 하다 보면 친구들과 함께 플레이하기 위해 **서버**를 여는 경우가 종종 있다.  
하지만 서버를 실제로 열어보면 설치해야 할 것도 많고 열심히 따라해도 잘 안되는 경우도 많다. 하마치 같은 프로그램을 깔아야 하는 경우도 있다.  
이런 복잡한 과정은 이걸 왜 해야하는지 모르면 고치기가 여간 복잡한 것이 아니다.

사실 알고 보면 그리 복잡하지 않다. 게임 서버를 열고 접속화는 과정을 한번 톺아보려고 한다.  
새로운 개념이 나올때마다 **우편배달부** 아저씨에 비유해볼테니 마구잡이로 나오는 용어와 비교해보며 읽어보자.

# IP 주소
우선 서버에 접속하기 위해선 IP 주소가 필요하다. 스마트폰, 컴퓨터, 공유기 등등 인터넷에 접속할 수 있는 기기들에는 꼭 IP 주소가 하나씩 붙게 된다.  
IP 주소는 xxx.xxx.xxx.xxx 형태를 띄는데, 각 자리수에는 0~255의 숫자가 들어갈 수 있다. 즉, IP 주소는 255x255x255x255 가지인 약 42억 가지 경우의 수를 가지고 있다.  

그리고 IP 주소 뒤에는 포트 번호라는게 붙게 된다. 이 포트 번호는 그 장치 내에 있는 프로그램에 부여되는 통신번호라고 생각하면 된다.  
마인크래프트에는 25565, 팰월드에는 8211처럼 한 장치 내에서 어떤 프로그램으로 갈 지에 대한 정보라고 생각하면 된다.

추가로 TCP/UDP라는 개념이 있는데, 이거는 프로그램이 어떤 통신 방식을 사용할지를 결정한다. 이미 프로그램끼리 결정되어있는 것이기 때문에 따로 적어줄 필요는 없다.

위 두가지 정보를 조합하여 게임 서버의 주소란에는 `IP 주소:포트 번호` 의 형태로 주소를 입력하게 된다.

### 우편배달부 아저씨
- `서울특별시 성북구 화랑도 11길 26 | 홍길동` 으로 배달을 간다고 치자.
- `서울특별시 성북구 화랑도 11길 26` 은 **IP 주소** 에 해당한다.  
- `받는 이 홍길동` 은 **포트 번호** 에 해당한다.  
- 보내는 물품이 **우편**인지 **택배**인지는 따로 적을 필요가 없다. 이걸 **TCP와 UDP**의 차이라고 생각하면 된다.

# 공인 IP와 사설 IP

하지만 IP 주소에는 한계가 있다.  
42억이라는 수가 많아보이지만 전 세계 모든 인터넷을 사용하는 장치에 42억개의 IP를 하나씩 나눠주다 보면 이 IP는 금방 동이 나고 말 것이다.  
IP 주소는 전 세계 인터넷 회사들이 서로 나눠갖고, 인터넷 회사들이 우리들에게 하나씩 나눠주게 된다. 이 떄 우리는 한 가구에 한개의 IP 주소만 받게 된다.  
하지만 우리 집에는 스마트폰도 많고 컴퓨터도 두대나 있고 인터넷 TV도 봐야 하는데 어떻게 한개의 IP만으로 이 모든 장치를 동시에 사용할까?  
이 때 필요한 것이 **사설 IP**다.

집에 있는 인터넷 선은 보통 공유기에 꽂혀있을 것이다.  
공유기는 흔히 와이파이 공급기 취급을 받고 있지만 이름 그대로 한개의 인터넷을 여러 기기가 **동시에** 쓸 수 있게 공유해주는 역할을 한다.  

그래서 공인 IP로 드나드는 인터넷 데이터들은 우리집을 들어올 때 공유기를 거쳐서 각 장치로 들어가게 된다.  
이 떄, 공유기가 집 안에 있는 장치를 구별하기 위해 각 장치에 한번 더 IP를 붙여준다. 이게 바로 **사설 IP** 이다.  
반대로, 공유기를 거치기 전 전세계 인터넷에서 우리 집으로 들어오기 위한 공개된 IP를 **공인 IP** 라고 한다.

즉, 공유기를 사용하는 일반적인 집에서는 우리 집 서버로 들어오기 위해 공인 IP와 사설 IP 모두가 필요한 것이다.

> 공유기를 사용하는 장치끼리는 사설 IP를 입력하면 서로 통신할 수 있다.  
> 간혹 모바일 게임을 와이파이 망 안에서 접속하면 멀티플레이가 가능한 케이스를 본 적이 있을 텐데, 이게 사설 IP를 이용한 것이라고 보면 되겠다.

### 우편배달부 아저씨
- `서울 한남더힐 | 홍길동` 으로 배달을 간다고 치자.
- `서울 한남더힐` 이라는 **공인 IP**만으로는 집에 배달을 할 수 없다.
- 그래서 한남더힐은 각 집에 동호수를 부여했다. `서울 한남더힐 101동 202호` 라는 **사설 IP** 주소를 함께 적으면 각 세대에 성공적으로 갈 수 있다.
- 한남더힐 입주민끼리는 `101동 202호` 라는 **사설 IP**만으로 서로 통신할 수 있다.

# 포트포워딩

근데 위에서 말했듯 우리는 1개의 IP 주소밖에 쓸 수 없다.  
사설 IP 없이 공인 IP만으로 서버에 접속하는 꼼수를 생각해내야 하는데, 그 방법이 바로 포트포워딩이다.

포트포워딩은 공인 IP로 어떤 요청이 들어오면 그 포트를 보고 특정 사설 IP로 넘겨주는 역할을 한다.  
공유기에 `223.32.13.25:8211` 이라는 주소로 요청이 들어올 때 공유기가 이 `8211` 이라는 포트를 읽고 미리 설정된 사설 IP로 이 요청을 넘겨주게 설정할 수 있다.  
즉 내 컴퓨터의 사설 IP가 `192.168.0.17` 이라고 했을 떄, 공유기에게 `223.32.13.25:8211` 로 들어오는 요청을 `192.168.0.17:8211` 로 보내줘. 라고 미리 설정할 수 있다는 것이다.

### 우편배달부 아저씨
- `홍길동` 씨가 동호수 없이 배달을 받기 위해 관리사무소에 가서 `홍길동` 앞으로 오는 `택배`는 `101동 202호`로 보내주십시오. 라고 요청한다.
- 그럼 `서울 한남더힐 | 홍길동` 이라는 `택배`는 이제 관리사무소를 통해 `101동 202호`로 가게 된다.
- 이 때, `홍길동`은 **포트 번호**, `택배`는 **TCP**, `101동 202호`는 내 컴퓨터의 **사설 IP**, `관리사무소`는 **공유기** 라고 할 수 있겠다.

### 조금 더 복잡한 우편배달부 아저씨
컴퓨터가 많거나, 서버를 여러개 열거나 할 때 이용할 수 있는 여러가지 트릭이다. 서버를 여러대 열 생각이 없다면 굳이 읽지 않아도 된다.  
주소는 컴퓨터, 받는 이는 프로그램 이라는 것에 유의하며 살펴보자. 아까 배운 TCP/UDP도 여기서 쓰인다.
- `아무개` 씨에게 오는 택배는 `101동 202호`의 `홍길동` 씨에게 전해달라고 할 수 있다  
`[공인:3000 -> 사설:4000]`
- `홍길동` 씨에게 오는 택배는 `101동 202호`의 `홍길동` 씨에게, `아무개` 씨에게 오는 택배는 `303동 404호`의 `홍길동` 씨에게 전해달라고 할 수도 있다  
`[공인:3000 -> 사설1:3000], [공인:4000 -> 사설2:3000]`
- `홍길동` 씨에게 오는 `택배`는 `101동 202호`의 `홍길동` 씨에게, `홍길동` 씨에게 오는 `우편`은 `101동 202호`의 `아무개` 씨에게 전해달라고 할 수도 있다  
`[공인:3000/TCP -> 사설:3000/TCP], [공인:3000/UDP -> 사설:4000/UDP]`  
`택배를 우편으로 바꿔치기 하는것은 당연히 불가능하다!! [TCP -> UDP], [UDP -> TCP]는 불가`

# 방화벽

이제 내 컴퓨터에 성공적으로 접속할 수 있게 되었다. 하지만 이내 방화벽에 막히게 될 것이다.  
방화벽은 특정 포트로 들어가거나 나가는 통신을 막는 역할을 한다. 그럼 우리가 사용하는 포트로 들어오는 통신을 허가해주면 방화벽을 지나 통신이 가능해진다.

간혹 방화벽을 아예 꺼버리도록 안내하는 포스트가 있는데, 이는 택배보관함을 놓기 위해 도어락까지 철거하는 꼴이 된다. (...)  
포트를 모두 열어놓게 되면 정말로 누군가가 원격 통신을 통해 내 컴퓨터를 접근할 수도 있기 때문에 절대 해서는 안된다.

> 일례로, 3389번 포트는 [윈도우 원격 데스크톱](https://www.soft2000.com/12664) 기능에서 쓰이는 포트이다.  
> 나의 IP는 이미 서버 유저들에게 뿌려두었고, 내 컴퓨터에 비밀번호도 걸려있지 않다면 이 포트 주소로 내 컴퓨터에 원격 데스크톱 연결을 할 수 있다.  
> 그럼 내 컴퓨터의 마우스 커서가 멋대로 움직이고 내 파일들을 모두 훔쳐가는 대형 사고도 발생할 수 있다.  
> 이 모든 일이 방화벽을 껐을 때 너무나도 쉽게 일어날 수 있는 일이다!

# 모두 종합해보면...

이제 서버에 연결하기 위한 준비가 모두 끝났다. 사용자가 서버에 접속하려고 하면 다음과 같은 과정을 거쳐 우리 서버로 들어오게 될 것이다.

1. `223.32.13.25:8888` 이라는 **공인 IP**와 **포트 번호**로 인터넷 세상에 요청한다.
2. 인터넷 세상은 `223.32.13.25` 라는 **공인 IP**를 보고 우리 집 인터넷 회선으로 안내한다.
3. 이 인터넷 회선은 공유기로 연결된다. 이 때 공유기는 포트포워드 설정을 보고 `8888`번 포트로 온 요청을 `192.168.0.17:8211` 이라는 **사설 IP**로 보낸다.
4. 방화벽은 내 컴퓨터로 들어온 요청을 보고 `8211` 포트의 인바운드(들어오는 요청)가 가능한지 검사한다.
5. 방화벽을 통과하였다면 `8211`번 포트에 열려있는 게임 서버로 접속된다.

이렇게 게임서버를 열게 되면 이러한 과정을 거치게 된다.  
처음에는 조금 어려울 수는 있겠지만 알고 나면 어떤 멀티플레이 게임이 서버를 열어줄 수 있는 핫산이 될 수 있을 것이다.

---

# 부록 : 그럼 하마치는 왜 깔아야 했나요?

하마치의 역할은 **가상 공유기**이다.  
각자 집에서 게임을 하는 우리는 같은 공유기에 연결되어있지 않기 때문에 사설 IP만으로는 컴퓨터에 접근할 수 없는게 문제였다.  
이 떄 하마치는, 가상의 공유기로서 우리들의 컴퓨터들에 가상의 사설 IP를 부여하고 이 사설 IP만으로 통신할 수 있게 해준다.  
즉, 우리만의 주소록을 만들어 둔 것이다.

포트포워딩은 외부 인터넷으로 나가서 우리 집 공인 IP로 들어와 공유기가 안내해주는 사설 IP로 들어가는 과정이다.  
이를 대체하여 하마치는 각 컴퓨터 서로를 가상의 내부 인터넷으로 묶어 사설 IP를 통해 다이렉트로 들어가는 과정이다. (다만 가상이기 때문에 하마치의 서버를 거칠 것이다.)
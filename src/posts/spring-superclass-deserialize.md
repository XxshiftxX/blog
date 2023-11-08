# TL;DR

```kotlin
// Both baseclass and subclass should implement `Serializable` interface

class BaseClass : Serializable
class EntityClass : BaseClass, Serializable
```

---

컨트롤러에서 Principal을 가져왔을 때, 다른 필드들은 다 정상 존재하는데 딱 ID만 비어있는 상태로 가져와지는 버그가 발생했다.

```kotlin
@MappedSuperclass
abstract class EntityBase {
	@Id val id: Long
}

@Entity
class User : EntityBase(), Serializable {
	@Column val email: String
}
```

엔티티 구성은 대강 위와 같이 되어 있었다. 위 `User` 엔티티를 이용해 로그인한 뒤 다른 엔드포인트에서 `@AuthenticationPrincipal` 어노테이션으로 유저 정보를 가져왔는데 유저 내의 다른 정보들은 정상적으로 불러왔지만 `id` 만은 불러오지 못하는 문제가 발생했다.

해당 로그인 시 세션 저장소로 Redis를 사용하고 있는데, Spring Redis 사용 시 기본으로 설정되는 Serializer는 `JdkSerializationRedisSerializer` 다. 이 Serializer는 `Serializable` 인터페이스를 구현해주기만 하면 직렬화 가능한 대상으로 사용 가능한 심플한 방식을 사용하고 있다. 다만 위 코드에서 `User` 클래스만 `Serializable` 을 구현하고 있고 상위 클래스인 `EntityBase` 는 해당 인터페이스를 구현해주고 있지 않고 있었다.

```kotlin
@MappedSuperclass
abstract class EntityBase : Serializable {
	@Id val id: Long
}

@Entity
class User : EntityBase(), Serializable {
	@Column val email: String
}
```

위와 같이 하위 클래스와 상위 클래스 모두 `Serializable` 인터페이스를 구현해주어야 양 쪽 모두의 필드가 직렬화 대상이 된다. 상위 클래스에만 구현해주는 방법도 사용해보았는데, 이 때는 `User` 가 직렬화 대상이 아니라는 에러가 발생한 것으로 보아 양쪽 모두 구현해주어야 하는 것 같다.
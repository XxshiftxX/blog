import { Post } from "../types/post";

import startBlogContent from './start-blog.md?raw';
import springSuperclassDeserializeContent from './spring-superclass-deserialize.md?raw';

export const allPosts: Post[] = [
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
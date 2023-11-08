import { Post } from "../types/post";

import sampleContent from './sample.md?raw';

export const allPosts: Post[] = [
  {
    title: '테스트로 작성하는 새 블로그 글',
    slug: 'test-article',
    date: new Date('2023-11-08'),
    tags: ['test', 'sample'],
    content: sampleContent,
  }
];
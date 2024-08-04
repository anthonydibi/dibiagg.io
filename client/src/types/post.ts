import { TagKeys } from '../components/blog/BlogTag/types';

export interface Post {
  ogImage: any;
  olderPost: Post;
  newerPost: Post;
  title: string;
  date: string;
  slug: string;
  content: string;
  coverImage: string;
  author: string;
  tags: TagKeys[];
  excerpt: string;
}

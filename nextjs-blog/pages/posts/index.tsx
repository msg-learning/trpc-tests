import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";

export interface PostProps {
  posts: ReturnType<typeof getSortedPostsData>;
}

export default function Posts({ posts }: PostProps) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return {
    props: { posts },
  };
}

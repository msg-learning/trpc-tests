import Head from "next/head";
import { getPost, getPostIds, PostData } from "../../lib/posts";

export interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div>
        <h1>{post.title}</h1>
        <small>{post.date}</small>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
}

export async function getStaticPaths() {
  const ids = getPostIds();
  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  return {
    props: { post },
  };
}

import { Flex } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { GetStaticPaths, GetStaticProps } from "next";
import { Footer } from "../components/organisms/footer";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { PostDto, PostTagDto } from "../services/api/models";
import { Api } from "../services/api";
import { Aside } from "../components/organisms/aside";
import { Posts } from "../components/templates/posts";
import { CreatePostButton } from "../components/molecules/create-post-button";
import { getPosts } from "./api/v1/posts";

type FilteredFeedProps = {
  posts: PostDto[];
  tags: PostTagDto[];
}

export default function FilteredFeed({ posts, tags }: FilteredFeedProps) {
  return (
    <>
      <Head />
      <Flex direction="column"  w="100vw">
        <MainContainer>
          <Aside data={tags}/>
          <Posts data={posts} />
        </MainContainer>
        <Footer data={tags} />
        <CreatePostButton/>
      </Flex>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiClient = new Api("FilteredFeed::getServerSideProps");
  const { tag } = params as Record<string, string>;
  const posts = await getPosts({ tag });
  const tags: PostTagDto[] = [];
  posts.forEach(p => {
    tags.push(...p.tags.map(t => ({ id: t.id, name: t.name, postId: t.postId } as PostTagDto)))
  })
  return { revalidate: 30 * 60, props: { posts: JSON.parse(JSON.stringify(posts)), tags } };
};

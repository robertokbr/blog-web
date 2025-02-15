import { GetStaticPaths, GetStaticProps } from "next"
import { Flex, Stack } from "@chakra-ui/react";
import { Post } from "../../components/organisms/post";
import { MainContainer } from "../../components/atoms/main-container";
import { PostDto, PostTagDto } from "../../services/api/models";
import { Footer } from "../../components/organisms/footer";
import { PostHead as Head } from "../../components/atoms/post-head";
import { Api } from "../../services/api";
import { Comments } from "../../components/templates/comments";
import { useEffect, useMemo } from "react";
import { useContent } from "../../states/hooks/use-content";
import { PageUpButton } from "../../components/molecules/page-up-button";

interface PostDetailProps {
  post: PostDto;
  tags: PostTagDto[];
  notFound?: boolean;
}

export default function FeedPost({ post, tags, notFound }: PostDetailProps) {
  const { setPostComments } = useContent();

  useEffect(() => {
    setPostComments(post.comments);
  }, [post, setPostComments]);


  const containerProps = useMemo(() => {
    return {
      borderBottomRadius: post?.comments.length ? 0 : "lg",
      maxWidth: "772px",
      backgroundColor: "gray.900"
    }
  }, [post]);

  if (notFound) {
    history.back();
  }

  return (
    <>
      <Head data={post}/>
      <Flex direction="column">
        <MainContainer>
          <Stack spacing="0" flex="1" minW="320px" alignItems="center" mb="6">
            <Post data={post} containerProps={containerProps}/>
            <Comments commentContainerProps={{ bg: "gray.900" }}/>
          </Stack>
        </MainContainer>
        <Footer data={tags}/>
        <PageUpButton direction="up"/>
      </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const api = new Api("FeedPost::getServerSideProps");
  const { slug } = params as Record<string, string>;
  const { post, tags } = await api.getPostsAndTagsBySlug(slug);

  if (!post) {
    return { notFound: true }
  }

  return { revalidate: 30 * 60, props: { post, tags } }
}

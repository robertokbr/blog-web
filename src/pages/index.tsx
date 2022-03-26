import { Flex, Stack } from "@chakra-ui/react";
import { Header } from "../components/organisms/Header";
import { Post } from "../components/organisms/post";
import { MainContainer } from "../components/molecules/containers/main-container";
import { FeedHead } from "../components/molecules/heads/FeedHead";
import { GetServerSideProps } from "next";
import { PostsService } from "../services/openapi";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Feed({ posts }) {
  const { data } = useSession();

  return (
    <>
      <FeedHead />
      <Flex direction="column" h="100vh">
        <Header/>
        <MainContainer>
          <Stack spacing="4" flex="1" minW="320px" alignItems="center" mb="6">
            {posts.map((post, i) => <Post key={i} data={post} isPostPreview/>)}
          </Stack>
        </MainContainer> 
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await PostsService.postsControllerFindAll();

  return {
    props: {
      posts,
    }
  }
};
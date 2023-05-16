import { Flex, useToast } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { GetStaticProps } from "next";
import { Footer } from "../components/organisms/footer";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { PostDto, PostTagDto } from "../services/api/models";
import { Api } from "../services/api";
import { Posts } from "../components/templates/posts";
import { CreatePostButton } from "../components/molecules/create-post-button";
import { Bio } from "../components/organisms/bio";
import { LoginErrorToast } from "../utils/toast";
import { useAuth } from "../states/hooks/use-auth";
import { useGoogleOneTapLogin } from '@react-oauth/google';
import useSessionStorage from "../states/hooks/use-session-storage";

type FeedProps = {
  posts: PostDto[];
  tags: PostTagDto[];
}

export default function Feed({ posts, tags }: FeedProps) {
  const toast = useToast();
  const { validateToken } = useAuth();
  const token = useSessionStorage('token');

  useGoogleOneTapLogin({
    disabled: token !== null,
    cancel_on_tap_outside: false,
    onError: () => toast(LoginErrorToast),
    onSuccess: async credentialResponse => {
      const ok = await validateToken(credentialResponse.credential)
      if (!ok) toast(LoginErrorToast);
    },
  });

  return (
    <>
      <Head />
      <Flex direction="column"  w="100vw">
        <Bio pt="6"/>
        <MainContainer>
          <Posts data={posts} />
        </MainContainer>
        <Footer data={tags}/>
        <CreatePostButton/>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const api = new Api("Feed::getServerSideProps");
  const { posts, tags } = await api.getPostsAndTags({});
  return { revalidate: 30 * 60, props: { posts, tags } };
};

import { Flex, Stack } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { GetStaticProps } from "next";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { PostDto, PostTagDto } from "../services/api/models";
import { Api } from "../services/api";
import { Bio } from "../components/organisms/bio";
import { Social } from "../components/organisms/social";
import { GiBirdTwitter } from 'react-icons/gi';
import { FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';


type FeedProps = {
  posts: PostDto[];
  tags: PostTagDto[];
}

const socialContainerProps = { marginLeft: 'auto', marginRight: 'auto' }

export default function Feed({ posts, tags }: FeedProps) {

  return (
    <>
      <Head />
      <Flex direction="column"  w="100vw">
        <Bio pt="6" hideLinks/>
        <MainContainer>
          <Stack spacing="4" flex="1" minW="320px" alignItems="center" mb="6">
          <Social
              icon={FaTiktok}
              containerProps={socialContainerProps}
              data={{
                content: '@rob_kbr',
                link: 'https://www.tiktok.com/@rob_kbr',
                title: "TikTok"
              }}
            />
            <Social
              icon={FaYoutube}
              containerProps={socialContainerProps}
              data={{
                content: 'robkbr',
                link: 'https://www.youtube.com/channel/UCggY0K1bKT24bWf3cfUBdqw',
                title: "YouTube"
              }}
            />
            <Social
              icon={GiBirdTwitter}
              containerProps={socialContainerProps}
              data={{
                content: '@robertojrdev',
                link: 'https://twitter.com/robertojrdev',
                title: "Twitter"
              }}
            />
            <Social
              icon={FaLinkedin}
              containerProps={socialContainerProps}
              data={{
                content: 'Roberto Junior',
                link: 'https://www.linkedin.com/in/robertojrcdc/',
                title: "Linkedin"
              }}
            />
          </Stack>
        </MainContainer>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const api = new Api("Feed::getServerSideProps");
  const { posts, tags } = await api.getPostsAndTags({});
  return { revalidate: 30 * 60, props: { posts, tags } };
};

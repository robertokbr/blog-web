import { Flex, Stack } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { Social } from "../components/organisms/social";
import { GiBirdTwitter } from 'react-icons/gi';
import { FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';

const socialContainerProps = { marginLeft: 'auto', marginRight: 'auto' }

export default function Feed() {

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
                fallbackLink: 'https://www.tiktok.com/@rob_kbr',
                link: 'tiktok://user/rob_kbr',
                title: "TikTok"
              }}
            />
            <Social
              icon={FaYoutube}
              containerProps={socialContainerProps}
              data={{
                content: 'robkbr',
                fallbackLink: 'https://www.youtube.com/channel/UCggY0K1bKT24bWf3cfUBdqw',
                link: 'youtube://www.youtube.com/user/robkbr',
                title: "YouTube"
              }}
            />
            <Social
              icon={GiBirdTwitter}
              containerProps={socialContainerProps}
              data={{
                content: '@robertojrdev',
                link: 'twitter://user?screen_name=robertojrdev',
                fallbackLink: 'https://twitter.com/robertojrdev',
                title: "Twitter"
              }}
            />
            <Social
              icon={FaLinkedin}
              containerProps={socialContainerProps}
              data={{
                content: 'Roberto Junior',
                fallbackLink: 'https://www.linkedin.com/in/robertojrcdc/',
                link: 'linkedin://profile/robertojrcdc/',
                title: "Linkedin"
              }}
            />
          </Stack>
        </MainContainer>
      </Flex>
    </>
  );
}

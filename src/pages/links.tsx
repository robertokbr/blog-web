import { Flex, Stack } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { Social } from "../components/organisms/social";
import { GiBirdTwitter } from 'react-icons/gi';
import { FaLinkedin, FaTiktok, FaYoutube, FaGithubAlt } from 'react-icons/fa';
import { BiBookContent } from 'react-icons/bi';
import { BsDiscord } from "react-icons/bs";
import { Char } from "../components/atoms/char";


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
              icon={BsDiscord}
              containerProps={socialContainerProps}
              data={{
                content: 'Mansão Dev',
                fallbackLink: 'https://discord.gg/2e9RqKQuZV',
                link: 'discord://discord.com/invite/2e9RqKQuZV',
                title: "Discord"
              }}
            />
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
                content: '@robkbr',
                fallbackLink: 'https://www.youtube.com/channel/UCggY0K1bKT24bWf3cfUBdqw',
                link: 'youtube://www.youtube.com/user/robkbr',
                title: "YouTube"
              }}
            />
            <Social
              icon={GiBirdTwitter}
              containerProps={socialContainerProps}
              data={{
                content: '@rob_kbr',
                link: 'twitter://user?screen_name=rob_kbr',
                fallbackLink: 'https://twitter.com/rob_kbr',
                title: "Twitter"
              }}
            />
            <Social
              icon={FaGithubAlt}
              containerProps={socialContainerProps}
              data={{
                content: '@robertokbr',
                fallbackLink: "https://github.com/robertokbr",
                link: 'https://github.com/robertokbr',
                title: "Github"
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
            <Social
              icon={BiBookContent}
              containerProps={socialContainerProps}
              data={{
                content: 'blog.robkbr.com',
                fallbackLink: '/',
                link: '/',
                title: "Blog"
              }}
            />
          </Stack>
        </MainContainer>
        <Char/>
      </Flex>
    </>
  );
}

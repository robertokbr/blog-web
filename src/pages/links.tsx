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
              icon={FaYoutube}
              containerProps={socialContainerProps}
              data={{
                content: '@meunomeebero',
                fallbackLink: 'https://www.youtube.com/channel/UCa7B9LVy_nA2OBy_B6zXO9w',
                link: 'youtube://www.youtube.com/user/meunomeebero',
                title: "YouTube"
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
      </Flex>
    </>
  );
}

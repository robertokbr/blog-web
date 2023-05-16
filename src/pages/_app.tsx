import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import '../styles/global.scss';
import '../styles/highlight.scss';
import { ContentContextProvider } from "../states/contexts/contet-context";
import { CustomSessionProvider } from "../states/contexts/custom-session-context";
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}>
        <ChakraProvider theme={theme}>
          <CustomSessionProvider>
            <ContentContextProvider>
              <Component {...pageProps} />
            </ContentContextProvider>
          </CustomSessionProvider>
        </ChakraProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;

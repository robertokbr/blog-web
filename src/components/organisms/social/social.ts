import { FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface SocialProps {
  containerProps?: FlexProps;
  icon: IconType;
  data: {
    link: string;
    title: string;
    content: string;
  };
}

import { FlexProps } from "@chakra-ui/react";
import { PostDto } from "../../../services/api/models";

export interface PostProps {
  isPostPreview?: boolean;
  containerProps?: FlexProps;
  data: PostDto;
}

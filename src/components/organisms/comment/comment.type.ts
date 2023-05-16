import { FlexProps } from "@chakra-ui/react";
import { CommentDto } from "../../../services/api/models";

export interface CommentProps {
  containerProps?: FlexProps;
  data: CommentDto;
}

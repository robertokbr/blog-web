import { PostDto } from "../../../services/api/models";

export interface PostContentProps {
  data: Pick<PostDto, 'title' | 'content' | 'createdAt'>;
}

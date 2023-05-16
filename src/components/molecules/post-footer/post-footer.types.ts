import { PostTagDto } from "../../../services/api/models";

export interface PostFooterProps {
  data: { id: number; commentsLength: number; tags: PostTagDto[] };
}

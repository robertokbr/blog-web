import axios from "axios";
import { apiConfig } from "../../../configs/api-config";
import { logger } from "../../logger";
import { CommentDto, CommentRateDto, PostAdDto, PostDto, PostRateDto } from "../models";
import { Authorized } from '../../../utils/api-decorators';

export class AxiosAPI {
  static token?: string;

  private getClient() {
    return axios.create({
      baseURL: apiConfig.baseURL,
      headers: {
        Authorization: 'Bearer ' + AxiosAPI.token,
      }
    });
  }

  constructor(private readonly context: string = "Global"){}

  private failReturningNull(error) {
    logger.error({ error, context: this?.context });
    return { data: null };
  };

  private failReturningArray(error) {
    logger.error({ error, context: this?.context });
    return { data: [] };
  }

  public async getPostsAndTagsBySlug(slug: string) {
    const [{ data: post }, { data: tags }] = await Promise.all([
      this.getClient().get('/posts/' + slug).catch(this.failReturningNull),
      this.getClient().get('posts/tags').catch(this.failReturningArray),
    ]);

    return { post, tags };
  }

  public async getPosts(
    params?: Record<string, string | string[]>
  ): Promise<PostDto[]> {
    const { data: posts } = await this.getClient().get(
      '/posts',
      { params },
    ).catch(this.failReturningArray);
    return posts;
  }

  public async getPostsBySlug(slug: string) {
    const { data: post } = await this.getClient().get(
      '/posts/' + slug,
    ).catch(this.failReturningNull);
    return post;
  }

  public async getUserByEmail(email: string) {
    const { data: userByEmail } = await this.getClient().get('/users/' + email);
    return userByEmail;
  }

  @Authorized()
  public async createUser({
    email,
    image,
    name,
    github,
  }) {
    const { data: user } = await this.getClient().post('/users', {
      email,
      image,
      name,
      github
    });

    return user;
  }

  public async getTags() {
    const { data: tags } = await this.getClient().get('/posts/tags').catch(this.failReturningArray);
    return tags;
  }

  @Authorized()
  public async deleteComment(id: string) {
    const { data: comment } = await this.getClient().delete('/posts/' + id + '/comments');
    return comment;
  }

  @Authorized()
  public async createCommentRate({ commentId, userId, value }: Omit<CommentRateDto, 'id'>) {
    const { data: commentRate } = await this.getClient().post('/posts/comments/rate', {
      commentId,
      userId,
      value,
    });
    return commentRate;
  }

  @Authorized()
  public async createRate({ postId, userId, value }: Omit<PostRateDto, 'id'>) {
    const { data: rate } = await this.getClient().post('/posts/rate', {
      postId,
      userId,
      value,
    });
    return rate;
  }

  @Authorized()
  public async createPost(data: Partial<Omit<PostDto, 'tags'>> & { tags: string[] }) {
    const { data: post } = await this.getClient().post('/posts', data);
    return post;
  }

  @Authorized()
  public async updatePost(id: string, data: Partial<Omit<PostDto, 'tags'>> & { tags: string[] }) {
    const { data: post } = await this.getClient().patch('/posts/' + id, data);
    return post;
  }

  @Authorized()
  public async createComment(data: Partial<CommentDto>) {
    const { data: comment } = await this.getClient().post('/posts/comments', data);
    return comment;
  }

  @Authorized()
  public async getMe(token: string) {
    try {
      const { data } = await this.getClient().post('/users', {}, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });

      return data;
    } catch {
      return null;
    }
  }

  @Authorized()
  public async deletePost(id: string) {
    const { data: post } = await this.getClient().delete('/posts/' + id);
    return post;
  }
}

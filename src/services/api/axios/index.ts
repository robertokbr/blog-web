import axios from "axios";
import { apiConfig } from "../../../configs/api-config";
import { logger } from "../../logger";

export class AxiosAPI {
  private client = axios.create({
    baseURL: apiConfig.baseURL,
  });

  constructor(private readonly context: string = "Global"){}

  private failReturningNull(error) {
    logger.error({ error, context: this?.context });
    return { data: null };
  };

  private failReturningArray(error) {
    logger.error({ error, context: this?.context });
    return { data: [] };
  }

  public async getPostsAndTags(params: Record<string, string | string[]>) {
    const [{ data: posts }, { data: tags }] = await Promise.all([
      this.client.get('/posts', { params }).catch(this.failReturningArray),
      this.client.get('posts/tags').catch(this.failReturningArray),
    ]);

    return { posts, tags };
  } 

  public async getPostsBySlug(slug: string) {
    const { data: post } = await this.client.get(
      '/posts/byslug/' + slug,
    ).catch(this.failReturningNull);
    return post;
  }

  public async getUserByEmail(email: string) {
    const { data: userByEmail } = await this.client.get('/users/' + email);
    return userByEmail;
  } 

  public async createUser({
    email,
    image,
    name,
    github,
  }) {
    const { data: user } = await this.client.post('/users', { email, image, name, github });

    return user;
  }
}

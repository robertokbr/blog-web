import { AxiosAPI } from "../services/api/client"
import { logger } from "../services/logger";

export const Authorized = () => {
  return (target: AxiosAPI, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        console.log(error);
        const data = error?.toJSON?.();

        if (data && data.status == 403) {
          AxiosAPI.token = null;
          sessionStorage.removeItem('token');
          logger.info({ msg: 'Removing session token', context: this?.context });
        }
      }
    }
  }
}

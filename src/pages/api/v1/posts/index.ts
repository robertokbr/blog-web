import { NextApiRequest, NextApiResponse } from "next";
import { prismaProvider } from "../../_providers/prisma";

const prisma = prismaProvider.useFactory();

export async function getPosts({ tag }: { tag?: string; }) {
  return prisma.posts.findMany({
    where: {
      ...(tag && {
        tags: {
          some: {
            name: tag,
          },
        },
      }),
      isArchived: false,
    },
    include: {
      user: true,
      rates: true,
      comments: true,
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      const query = req.query as any;
      await getPosts(query);
      res.status(200).json({ message: 'OK' });
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { apiProvider } from "../../../../services/api";
import { prismaProvider } from "../../_providers/prisma";

const api = apiProvider.useFactory();
const prisma = prismaProvider.useFactory();

async function updateVisibility({  postId, token }) {
  const me = await api.getMe(token);
  console.log(me);

  if (!me || me.role !== 'ADMIN') return;

  const post = await prisma.posts.findUnique({
    where: {
      id: postId
    }
  });

  if (!post) return;

  await prisma.posts.update({
    where: {
      id: postId
    },
    data: {
      isArchived: !post.isArchived,
    }
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'PATCH':
      const body = req.body;
      await updateVisibility(body);
      res.status(200).json({ message: 'OK' });
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}

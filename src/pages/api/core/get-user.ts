import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Error>
) {
  try {
    const userId = String(req.query["user"]);

    const result = await prisma.user.findFirst({ where: { id: userId } });

    if (result !== null) res.status(200).json(result);
    else res.status(404).json(new Error("not found"));
  } catch (error: any) {
    res.status(500).json(error as Error);
  }
}

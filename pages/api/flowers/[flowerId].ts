import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
        return res.status(405).end();
        }

        await serverAuth(req, res);

        const { flowerId } = req.query;

        if (typeof flowerId !== 'string') {
        throw new Error('Invalid Id');
        }

        if (!flowerId) {
        throw new Error('Missing Id');
        }
        const prisma = new PrismaClient();
        const flower = await prisma.flower.findUnique({
            where: {
                id: flowerId,
            },
        });


        return res.status(200).json(flowers);
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}

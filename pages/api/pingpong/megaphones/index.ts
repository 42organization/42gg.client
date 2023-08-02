import { NextApiRequest, NextApiResponse } from "next";

interface IMegaphone {
    megaphoneId: number;
    content: string;
    intraId: string;
}


const test: Array<IMegaphone> = [
{
    megaphoneId: 1,
    content: '<1>test test<1>',
    intraId: 'testUser',
},
{
    megaphoneId: 2,
    content: '<2>test test<2>',
    intraId: 'testUser',
},
{
    megaphoneId: 3,
    content: '<3>test test<3>',
    intraId: 'testUser',
},
{
    megaphoneId: 4,
    content: '<4>test test<4>',
    intraId: 'testUser',
},
{
    megaphoneId: 5,
    content: '<5>test test<5>',
    intraId: 'testUser',
},
]


export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req;

    if (method === 'GET') {
        res.status(200).json({"megaphoneList": test});
    }
}
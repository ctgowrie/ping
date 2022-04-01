import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  value: string,
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.status(405).send({value: ''});
    return;
  }

  const body = req.body;
  if (body.value === 'ping') {
    console.log(body);
    res.status(200).send({value: 'pong'});
    return;
  }
  if (body.value === 'pong') {
    console.log(body);
    res.status(200).send({value: 'ping'});
    return;
  }
  
  res.status(200).send({value: ''})
  return;
}

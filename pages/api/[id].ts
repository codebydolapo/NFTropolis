// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import metadata from "../../data/data.json"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Metadata | any>
) {
  const { id } = req.query
  const _id = Number(id) - 1
  res.status(200).json(metadata[Number(_id)])
}
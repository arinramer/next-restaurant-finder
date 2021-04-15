import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const path = process.cwd() + `\\reviews\\${id}.json`
    switch (req.method) {
      case 'GET':
        if(fs.existsSync(path)) {
          let rawdata = fs.readFileSync(path)
          let reviews = JSON.parse(rawdata)
          res.status(200).json(reviews)
        } else {
          res.status(200).json([])
        }
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
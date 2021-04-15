import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const review = req.body
    const path = process.cwd() + `\\reviews\\${id}.json`
    switch (req.method) {
      case 'POST':
        if(!fs.existsSync(path)) {
          let arr = []
          arr.push(review);
          let data = JSON.stringify(arr)
          console.log(data)
          fs.writeFileSync(path, data)
          res.status(200).json(review)
        } else {
          let rawdata = fs.readFileSync(path)
          let arr = JSON.parse(rawdata)
          arr.push(review)
          var newarr = JSON.stringify(arr)
          fs.writeFileSync(path, newarr)
          res.status(200).json(review)
        }
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
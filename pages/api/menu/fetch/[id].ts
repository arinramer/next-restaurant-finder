import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const path = process.cwd() + `\\menu\\${id}.json`
    switch (req.method) {
      case 'GET':
        if(fs.existsSync(path)) {
          let rawdata = fs.readFileSync(path)
          let menuitem = JSON.parse(rawdata)
          res.status(200).json(menuitem)
        } else {
          res.status(200).json([])
        }
    }
}
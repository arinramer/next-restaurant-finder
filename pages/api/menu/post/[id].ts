import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const menuitem = req.body
    const path = process.cwd() + `\\menu\\${id}.json`
    switch (req.method) {
      case 'POST':
        if(!fs.existsSync(path)) {
          let arr = []
          arr.push(menuitem)
          let data = JSON.stringify(arr)
          fs.writeFileSync(path, data)
          res.status(200).json(menuitem)
        } else {
          let rawdata = fs.readFileSync(path)
          let arr = JSON.parse(rawdata)
          arr.push(menuitem)
          var newarr = JSON.stringify(arr)
          fs.writeFileSync(path, newarr)
          res.status(200).json(menuitem)
        }
    }
}
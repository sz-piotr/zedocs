import express from 'express'
import { logListening } from '../logger'
import { Outputs } from './outputs'

export function runServer(outputs: Outputs, port: number) {
  const app = express()

  app.use(function (req, res, next) {
    if (req.path.endsWith('/') && req.path.length > 1) {
      const query = req.url.slice(req.path.length)
      res.redirect(301, req.path.slice(0, -1) + query)
    } else {
      next()
    }
  })

  app.get('*', function (req, res, next) {
    const output = outputs.get(req.path)
    if (output) {
      res.type(output.type).status(200).send(output.content)
    } else {
      next()
    }
  })

  app.listen(port, () => logListening(port))
}

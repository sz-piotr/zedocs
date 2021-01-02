import express from 'express'
import url from 'url'
import ws from 'ws'
import { Outputs } from './outputs'
import { parseLiveReloadMessage } from './parseLiveReloadMessage'

const LIVE_RELOAD_SOURCE_FILE = require.resolve('livereload-js')
const LIVE_RELOAD_PORT = 35729

const HANDSHAKE = {
  command: 'hello',
  protocols: ['http://livereload.com/protocols/official-7'],
  serverName: 'ZeDocs LiveReload 2',
}

export function runLiveReload(outputs: Outputs) {
  const app = express()
  const wss = new ws.Server({ noServer: true })

  wss.on('connection', (socket) => {
    let sentHello = false
    let gotHello = false

    socket.send(JSON.stringify(HANDSHAKE), () => {
      sentHello = true
    })

    socket.on('message', (data) => {
      const message = parseLiveReloadMessage(data.toString())
      if (message?.command === 'hello') {
        gotHello = true
      }
    })

    const unsubscribe = outputs.onChange((paths) => {
      if (sentHello && gotHello) {
        for (const path of paths) {
          const message = JSON.stringify({
            command: 'reload',
            path,
            liveCSS: true,
          })
          socket.send(message)
        }
      }
    })

    socket.on('close', () => {
      unsubscribe()
    })
  })

  app.get('/livereload.js', function (req, res) {
    res.sendFile(LIVE_RELOAD_SOURCE_FILE)
  })

  const server = app.listen(LIVE_RELOAD_PORT)

  server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname
    if (pathname === '/livereload') {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request)
      })
    } else {
      socket.destroy()
    }
  })
}

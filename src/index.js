import express from 'express'
import router from './router'

export { default as loadConf } from './load-conf'

export default (config) => {
  const app = express()
  app.set('config', config)
  app.use(router)
  return app
}

export const start = (app) => new Promise((resolve, reject) => {
  const config = app.get('config')
  const server = app.listen(config.port, (err) => {
    if (err) return reject(err)
    app.set('server', server)
    resolve(server)
  })
})

// TODO: force stop if connections not ended after a timeout
export const stop = (app) => new Promise((resolve, reject) => {
  const server = app.get('server')
  if (!server) return reject(new Error('app is already stopped'))
  server.close((err) => {
    if (err) return reject(err)
    resolve()
  })
})

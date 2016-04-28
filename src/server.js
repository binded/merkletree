/* eslint-disable no-console */
import initApp, { loadConf, start, stop } from './'

const config = loadConf()
const app = initApp(config)

start(app).then((server) => {
  const port = server.address().port
  console.log(`Server listening at http://localhost:${port}`)
}).catch((err) => {
  console.error(err)
  console.error(err.stack)
  process.exit(1)
})

// Graceful exit
let gracefulShutdownInProgress = false
const gracefulShutdown = () => {
  if (gracefulShutdownInProgress) {
    // This means gracefulShutdown was called twice, let's ungracefuly
    // shutdown
    process.exit(1)
  }
  gracefulShutdownInProgress = true
  const server = app.get('server')
  console.log('Graceful shutdown')
  stop(app).then(() => {
    process.exit(0)
  }).catch((err) => {
    console.error(err)
    console.error(err.stack)
    process.exit(1)
  })
  server.getConnections((err, count) => {
    if (count) {
      console.log(`Waiting for ${count} connection(s) to close`)
      console.log('Enter Ctrl-C one more time to force shutdown.')
    }
  })
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

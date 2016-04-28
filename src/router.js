import { Router } from 'express'
import * as records from './resources/records'

const recordsRouter = new Router()
  .post('/', records.create)

const router = new Router()
  .get('/healthz', (req, res) => {
    res.status(200)
    res.end()
  })
  .get('/test-graceful-shutdown', () => {
    // don't close connection
  })
  .use(recordsRouter)

export default router

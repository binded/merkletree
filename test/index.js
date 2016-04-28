import test from 'blue-tape'
import request from 'supertest-as-promised'
import initApp, { loadConf, start, stop } from '../src'

const app = initApp(loadConf())

test('start server', () => start(app))

test('GET /healthz', () => (
  request(app).get('/healthz').expect(200)
))

test('stop server', () => stop(app))

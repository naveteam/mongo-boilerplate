import Koa from 'koa'
import Cors from '@koa/cors'
import koaBody from 'koa-body'
import helmet from 'koa-helmet'
import Mongoose from 'mongoose'
import { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL } from 'config'
import routes from 'routes'
import { authMiddleware, errorHandlingMiddleware } from 'middlewares'

const app = new Koa()

app.use(helmet())

Mongoose.connect(MONGODB_URL)

app.use(
  Cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
)

app.use(koaBody({ multipart: true }))

app.use(errorHandlingMiddleware)

app.use(authMiddleware)

app.use(routes.routes())
app.use(routes.allowedMethods())

export default app

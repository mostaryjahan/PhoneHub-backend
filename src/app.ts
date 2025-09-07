import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/routes'
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import config from './app/config'

const app:Application = express()

// parsers
app.use(express.json())
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));

// application routes
app.use('/api', router);


app.get('/',(req:Request, res:Response)=>{
    res.send('home page')
})
app.use(globalErrorHandler)

app.use(notFound)
export default app;


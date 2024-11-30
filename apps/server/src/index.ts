import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import productRouter from './routes/productRoutes'
import collectionRouter from './routes/collectionRoutes'


const app = express()



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', productRouter)
app.use('/api', collectionRouter)

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})

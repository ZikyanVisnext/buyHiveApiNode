import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import mongoose from 'mongoose'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000

try {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDb Conntected')
} catch (error) {
  console.log(error.message)
}

app.use('/', routes)

app.listen(port, ()=>{
  console.log(`Server is running at port ${port}`)
})
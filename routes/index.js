import express from 'express'
import productRoutes from './api/products.js'
import categoryRoutes from './api/category.js'

const router = express.Router()

router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)

export default router
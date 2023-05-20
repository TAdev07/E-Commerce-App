const express = require('express');
const router = express.Router();

const authRouter = require('./authRoute');
const productRouter = require('./productRoute');
const blogRouter = require('./blogRoute');
const prodCategoryRouter = require('./prodCategoryRoute');
const blogCategoryRouter = require('./blogCategoryRoute');
const brandRouter = require('./brandRoute');
const couponRouter = require('./couponRoute');
const colorRouter = require('./colorRoute');

router.use('/user', authRouter);
router.use('/product', productRouter);
router.use('/blog', blogRouter);
router.use('/category', prodCategoryRouter);
router.use('/blog-category', blogCategoryRouter);
router.use('/brand', brandRouter);
router.use('/coupon', couponRouter);
router.use('/color', colorRouter);

module.exports = router;

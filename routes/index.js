const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controller')

console.log('route loaded')

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));
router.use('/likes',require('./likes'));

module.exports=router;
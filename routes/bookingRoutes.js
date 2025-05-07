const express=require("express")
const router=express.Router()
const {bookActivity,showAllBookings}=require('../controllers/bookingController')
const {verifyToken}=require('../middleware/authMiddleware')

router.post('/book/:activityId',verifyToken,bookActivity)
router.post('/mybookings',verifyToken,showAllBookings)
module.exports=router;
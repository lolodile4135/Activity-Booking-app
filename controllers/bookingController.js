// controllers/bookingController.js
const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

exports.bookActivity = async (req, res) => {
  try {
    const activityId = req.params.activityId;
    const userId = req.user.userId; // populated by verifyToken middleware

    //check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // prevent duplicate bookings
    const existingBooking = await Booking.findOne({ user: userId, activity: activityId });
    if (existingBooking) {
      return res.status(400).json({ message: "You have already booked this activity" });
    }

    const booking = new Booking({ user: userId, activity: activityId });
    await booking.save();

    res.status(201).json({ message: "Activity booked successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.showAllBookings = async (req, res) => {
    try {
      const userId = req.user.userId;
  
      const bookings = await Booking.find({ user: userId })
        .populate('activity') // shows activity details
        .sort({ bookedAt: -1 }); // latest first
  
      res.status(200).json({ bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch bookings' });
    }
  };
// controllers/activityController.js
const Activity = require('../models/Activity');

exports.createActivity = async (req, res) => {
  try {
    const { title, description, location, date, time } = req.body;

    if (!title || !location || !date || !time) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const activity = new Activity({
      title,
      description,
      location,
      date,
      time,
    });

    await activity.save();
    res.status(201).json({ message: 'Activity created successfully', activity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

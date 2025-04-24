const ConnectedMentors = require('../models/ConnectedMentors');
const User = require('../models/User');
const UpcomingClasses = require('../models/UpcomingClasses');
exports.getConnectedMentorsAndClasses = async (req, res) => {
  try {
    const menteeId = req.user._id; // Assuming the mentee's ID is available in req.user

    // Find the connected mentors document for this mentee
    const connectedMentorsDoc = await ConnectedMentors.findOne({ mentee: menteeId });

    if (!connectedMentorsDoc) {
      return res.status(200).json({
        success: true,
        message: "No connected mentors found for this mentee.",
        mentorsWithClasses: []
      });
    }

    // Fetch the names of the connected mentors and their scheduled classes
    const mentorsWithClasses = await Promise.all(connectedMentorsDoc.mentors.map(async (mentorId) => {
      const mentor = await User.findById(mentorId, 'name');
      const upcomingClasses = await UpcomingClasses.findOne({ mentorId });

      // Filter out classes that are within the duration of another class
      const availableClasses = upcomingClasses ? upcomingClasses.classes.filter((cls, index, classes) => {
        const classStartTime = new Date(cls.date);
        const classEndTime = new Date(classStartTime.getTime() + cls.duration * 60 * 60 * 1000); // Assuming duration is in hours

        // Check if any other class overlaps with this class
        const isOverlapping = classes.some((otherCls, otherIndex) => {
          if (index === otherIndex) return false; // Skip the same class
          const otherStartTime = new Date(otherCls.date);
          const otherEndTime = new Date(otherStartTime.getTime() + otherCls.duration * 60 * 60 * 1000);

          return (classStartTime < otherEndTime && classEndTime > otherStartTime);
        });

        return !isOverlapping;
      }) : [];

      return {
        id: mentor._id,
        name: mentor.name,
        scheduledClasses: availableClasses.map(cls => ({
          id: cls._id,
          title: cls.title,
          date: cls.date,
          endTime: new Date(new Date(cls.date).getTime() + cls.duration * 60 * 60 * 1000) // Add end time
        }))
      };
    }));

    res.status(200).json({
      success: true,
      message: "Connected mentors and their classes retrieved successfully.",
      mentorsWithClasses
    });

  } catch (error) {
    console.error('Error fetching connected mentors and classes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching connected mentors and classes',
      error: error.message
    });
  }
};
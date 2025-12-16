const Interview = require('../models/Interview');

exports.getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.userId })
      .populate('jobId')
      .sort({ dateTime: -1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate('jobId');
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    if (interview.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createInterview = async (req, res) => {
  try {
    const { jobId, roundName, dateTime, meetingLink, interviewerDetails, notes } = req.body;

    if (!roundName || !dateTime) {
      return res.status(400).json({ error: 'Round name and date/time are required' });
    }

    const interview = new Interview({
      userId: req.userId,
      jobId,
      roundName,
      dateTime: new Date(dateTime),
      meetingLink,
      interviewerDetails,
      notes
    });

    await interview.save();
    await interview.populate('jobId');
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInterview = async (req, res) => {
  try {
    let interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    if (interview.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { roundName, dateTime, meetingLink, interviewerDetails, notes } = req.body;

    if (roundName) interview.roundName = roundName;
    if (dateTime) interview.dateTime = new Date(dateTime);
    if (meetingLink !== undefined) interview.meetingLink = meetingLink;
    if (interviewerDetails !== undefined) interview.interviewerDetails = interviewerDetails;
    if (notes !== undefined) interview.notes = notes;

    await interview.save();
    await interview.populate('jobId');
    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    if (interview.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Interview.findByIdAndDelete(req.params.id);
    res.json({ message: 'Interview deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

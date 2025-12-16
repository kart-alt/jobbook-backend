const Update = require('../models/Update');

exports.getUpdates = async (req, res) => {
  try {
    const updates = await Update.find({ userId: req.userId })
      .populate('jobId')
      .sort({ createdAt: -1 });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUpdate = async (req, res) => {
  try {
    const { jobId, title, description, date } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const update = new Update({
      userId: req.userId,
      jobId,
      title,
      description,
      date: date ? new Date(date) : Date.now()
    });

    await update.save();
    await update.populate('jobId');
    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUpdate = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    if (!update) {
      return res.status(404).json({ error: 'Update not found' });
    }

    if (update.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Update.findByIdAndDelete(req.params.id);
    res.json({ message: 'Update deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const { company, title, location, salary, jobType, status, jobLink, appliedDate, notes } = req.body;

    if (!company || !title) {
      return res.status(400).json({ error: 'Company and title are required' });
    }

    const job = new Job({
      userId: req.userId,
      company,
      title,
      location,
      salary,
      jobType: jobType || 'Full-time',
      status: status || 'Applied',
      jobLink,
      appliedDate: appliedDate ? new Date(appliedDate) : Date.now(),
      notes
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { company, title, location, salary, jobType, status, jobLink, appliedDate, notes } = req.body;

    if (company) job.company = company;
    if (title) job.title = title;
    if (location !== undefined) job.location = location;
    if (salary !== undefined) job.salary = salary;
    if (jobType) job.jobType = jobType;
    if (status) job.status = status;
    if (jobLink !== undefined) job.jobLink = jobLink;
    if (appliedDate) job.appliedDate = new Date(appliedDate);
    if (notes !== undefined) job.notes = notes;
    job.updatedAt = Date.now();

    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

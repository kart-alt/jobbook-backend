const express = require('express');
const authMiddleware = require('../middleware/auth');
const { getJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const router = express.Router();

router.get('/', authMiddleware, getJobs);
router.get('/:id', authMiddleware, getJob);
router.post('/', authMiddleware, createJob);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

module.exports = router;

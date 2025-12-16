const express = require('express');
const authMiddleware = require('../middleware/auth');
const { getInterviews, getInterview, createInterview, updateInterview, deleteInterview } = require('../controllers/interviewController');
const router = express.Router();

router.get('/', authMiddleware, getInterviews);
router.get('/:id', authMiddleware, getInterview);
router.post('/', authMiddleware, createInterview);
router.put('/:id', authMiddleware, updateInterview);
router.delete('/:id', authMiddleware, deleteInterview);

module.exports = router;

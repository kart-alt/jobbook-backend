const express = require('express');
const authMiddleware = require('../middleware/auth');
const updateController = require('../controllers/updateController');

const router = express.Router();

router.get('/', authMiddleware, updateController.getUpdates);
router.post('/', authMiddleware, updateController.createUpdate);
router.delete('/:id', authMiddleware, updateController.deleteUpdate);

module.exports = router;
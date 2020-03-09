const express = require('express');

const taskController = require('../controllers/tasks');

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/', taskController.postTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;

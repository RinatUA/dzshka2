//роутер для постів, дає маршрути контролеру
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/create', postController.createPost);

module.exports = router;

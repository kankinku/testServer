// createGalleryRouter.js

const express = require('express');
const router = express.Router();
const createGalleryController = require('../controllers/createGalleryController');

// 갤러리 생성을 처리하는 POST 요청을 받는 라우터
router.post('/', createGalleryController.createGallery);

module.exports = router;

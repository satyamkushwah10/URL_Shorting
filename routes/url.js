const express = require('express');
const router = express.Router();
const { handleGenrateNewShortUrl,handleGetUrl,handleGetAnalytics } = require('../controllers/url');  

router.post('/', handleGenrateNewShortUrl);
router.get('/:shortID', handleGetUrl);
router.get('/analytics/:shortID', handleGetAnalytics);

module.exports = router;  
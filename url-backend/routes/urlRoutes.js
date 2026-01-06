const express = require( 'express' );
const router = express.Router();


const { createTinyURL, getLongURL } = require('../controllers/urlController');

router.post('/', createTinyURL);
router.get('/:shortId', getLongURL);

module.exports = router;
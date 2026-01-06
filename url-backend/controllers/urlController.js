const asyncHandler = require('express-async-handler');
const URL = require('../models/urls');
const Counter = require('../models/counter');
const { getContainerId } = require('../utils/dockerUtils');
const { updateCounter, initializeCounter } = require('./counterController');
const { getNextCounterRange } = require('./counterManagement');
const { encodeBase62 } = require('../utils/encoding');

const createTinyURL = asyncHandler(async (req, res, next) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }
  
  const serverId = getContainerId();
  let counter = await Counter.findOne({ serverId });

  if (!counter || counter.currentCounter > counter.rangeEnd) {
    // Get a new range from ZooKeeper if the current counter exceeds the range
    const range = await getNextCounterRange();
    await initializeCounter(serverId, range);
    const shortId = encodeBase62(range.start);
    saveURL(shortId, originalUrl, res, next);
  } else {
    const shortId = encodeBase62(counter.currentCounter);
    await updateCounter(serverId, counter.currentCounter + 1);
    saveURL(shortId, originalUrl, res, next);
  }
});

const saveURL = asyncHandler(async (shortId, originalUrl, res, next) => {
  const newUrl = new URL({ shortId, originalUrl });
  const savedUrl = await newUrl.save();
  res.status(201).json(savedUrl);
});

const getLongURL = asyncHandler(async (req, res, next) => {
  const { shortId } = req.params;
  const url = await URL.findOne({ shortId });
  if (!url) {
    return res.status(404).json({ error: 'URL not found' });
  }
  return res.status(200).json({ originalUrl: url.originalUrl });
});

module.exports = {
  createTinyURL,
  getLongURL
};

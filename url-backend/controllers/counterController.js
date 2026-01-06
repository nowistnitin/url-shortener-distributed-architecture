const asyncHandler = require('express-async-handler');
const Counter = require('../models/counter');

const initializeCounter = asyncHandler(async (serverId, range) => {
  const counter = await Counter.findOneAndUpdate(
    { serverId },
    { currentCounter: range.start, rangeEnd: range.end },
    { upsert: true, new: true }
  );
  return counter;
});

const updateCounter = asyncHandler(async (serverId, newCounterValue) => {
  await Counter.findOneAndUpdate(
    { serverId },
    { currentCounter: newCounterValue }
  );
});

module.exports = {
  updateCounter,
  initializeCounter
};

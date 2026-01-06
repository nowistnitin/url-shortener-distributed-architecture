const asyncHandler = require('express-async-handler');
const Counter = require('../models/counter');
const { initializeCounter } = require('./counterController');
const { getNextCounterRange } = require('./counterManagement');

const initializeServer = asyncHandler(async (serverId) => {
  let counter = await Counter.findOne({ serverId });
  if (!counter) {
    const range = await getNextCounterRange();
    counter = await initializeCounter(serverId, range);
  } else {
    console.log(`Server ${serverId} already has counter range: ${counter.currentCounter} to ${counter.rangeEnd}`);
  }
});

module.exports = {
  initializeServer
};
const client = require('./zookeeperClient');
const zookeeper = require('node-zookeeper-client');

// Root path in ZooKeeper for counter ranges
const COUNTER_PATH = '/counters';  
// Define the size of each counter range
const RANGE_SIZE = 100000;

// Initialize the counter root path in ZooKeeper if it doesn't exist
client.once('connected', () => {
  client.exists(COUNTER_PATH, (error, stat) => {
    if (error) {
      console.error('Failed to check counter path existence:', error);
      return;
    }
    if (!stat) {
      client.create(COUNTER_PATH, (error) => {
        if (error) {
          console.error('Failed to create counter path:', error);
        } else {
          console.log('Counter path initialized.');
        }
      });
    }
  });
});


const getNextCounterRange = () => {
    return new Promise((resolve, reject) => {
      console.log('Attempting to start transaction for counter range.');
      client.transaction()
        .create(`${COUNTER_PATH}/range-`, null, zookeeper.CreateMode.EPHEMERAL_SEQUENTIAL)
        .commit((error, results) => {
          if (error) {
            console.error('Error committing transaction:', error);
            return reject(error);
          }
          console.log('Transaction committed, results:', results);
          const path = results[0].path;
          console.log('Created path:', path);
          const rangeStart = parseInt(path.split('-').pop()) * RANGE_SIZE;
          console.log('Range start calculated:', rangeStart);
          resolve({ start: rangeStart, end: rangeStart + RANGE_SIZE - 1 });
        });
    });
  };


module.exports = {
    getNextCounterRange
  };
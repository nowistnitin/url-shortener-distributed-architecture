const zookeeper = require('node-zookeeper-client');

/* Creates a ZooKeeper client that connects to a ZooKeeper server running on localhost at port 2181.*/

const host = process.env.ZOOKEEPER_HOST || 'localhost';
const port = process.env.ZOOKEEPER_PORT || '2181';

const client = zookeeper.createClient(`${host}:${port}`);

client.once('connected', () => {
  console.log('Connected to ZooKeeper.');
});


client.connect();

module.exports = client;

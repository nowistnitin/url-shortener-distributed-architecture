const express = require( "express" )
const connectDb = require( "./config/dbConnection.js" );
const { getContainerId } = require('./utils/dockerUtils');
const errorHandler = require( "./middleware/errorHandler.js" );
const { initializeServer } = require('./controllers/serverController.js');
var cors = require( 'cors' )

const dotenv = require( "dotenv" ).config( {
    path: `.env.${ process.env.NODE_ENV }`
} );

const app = express();
const port = process.env.PORT || 5000;

connectDb();
app.use(cors());
app.use(express.json());

const serverId = getContainerId();
initializeServer(serverId);

app.use( "/url", require( "./routes/urlRoutes.js" ) );
app.use( errorHandler );

const server = app.listen( port, () =>
{
    console.log( `Server is running on port ${ port }` );
} );

module.exports = server;
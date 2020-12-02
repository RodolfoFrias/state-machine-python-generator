// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');
const bodyParser = require('body-parser'); 

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

const auth = require('./routes/auth');

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  // liveQuery: {
  //   classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  // }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey
const trustProxy = true;
var dashboard = new ParseDashboard({
  "apps":[
    {
      "serverURL": 'http://localhost:1337/parse',
      "appId":'myAppId',
      "masterKey":'myMasterKey',
      "appName":'state-machine-python-generator'
    }
  ],
  "users":[
    {
      "user":'admin',
      "pass":'cliente'
    }
  ]
}, { 
  allowInsecureHTTP: true,
  trustProxy: 1
 });

var app = express();

app.use('/dashboard', dashboard);
// Serve static assets from the /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

//Pug
app.set('view engine', 'pug');
//Boby parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

//Routes
 app.use('/', auth);

var port = process.env.PORT || 1337;

app.listen(port, function() {
    console.log('serve running on port ' + port + '.');
});

// This will enable the Live Query real-time server
//ParseServer.createLiveQueryServer(httpServer);

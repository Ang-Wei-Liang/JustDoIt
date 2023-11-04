// Import packages
const express = require("express");
const home = require("./routes/home");

//const openai = require('./config/open-ai');

const colors = require('colors');


const { google } = require('googleapis');
const { YoutubeTranscript } = require('youtube-transcript');
const path = require('path'); // Import the 'path' module

require('dotenv').config(); // Load environment variables from .env

//const firebase = require('firebase/app');

const bodyParser = require('body-parser');

//require('firebase/auth'); // Import other Firebase services as needed



mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
const dbName = 'NotesDB';
const collectionName = 'notes';




// Middlewares
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'routes/public')));


// Routes
app.use("/", home);


/*var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});*/

/*const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};*/

const admin = require('firebase-admin');

// Initialize Firebase using environment variables

//const serviceAccount = require('./roastme-c7654-firebase-adminsdk-ow3h3-68e716b30d.json');
/*const serviceAccount = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace '\\n' with actual newlines
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
  "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
};*/

/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://your-firebase-project.firebaseio.com', // Replace with your project's database URL
});*/

// Now you can use Firebase admin methods with the initialized app

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

app.use(bodyParser.json());

const API_KEY = process.env.YOUTUBE_API_KEY

// Create a YouTube Data API client
const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY,
});
/*
try {
    const client = await MongoClient.connect('mongodb+srv://NotesGuy101:NotesPass123@basicnotesappname.2xnr3po.mongodb.net/?retryWrites=true&w=majority');
    console.log('Mongo Conn....');
    const db = client.db('notes-database'); // Replace 'your-database-name' with your actual database name

    // Create a collection for your notes (if it doesn't exist)
    const notesCollection = db.collection('notes');

    // Insert the note and pin into the collection
    const result = await notesCollection.insertOne({ note, pin });
    console.log("Note and PIN added to the database");

    client.close();
} catch (err) {
    console.log(err);
    console.log("An error occurred while saving the note and PIN to the database");
}*/




// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Create a new user with email and password
      const user = await admin.auth().createUser({
        email,
        password,
      });
  
      res.status(200).json({ message: 'User created successfully', uid: user.uid});
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
 });


// Signin Endpoint
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userRecord = await admin.auth().getUserByEmail(email);

      const userEmail = userRecord.email;

      console.log(admin.auth());
  
      // Sign in the user using Firebase Authentication
      const user = await admin.auth().signInWithEmailAndPassword(email, password);
  
      res.status(200).json({ message: 'Signin successful', uid: user.uid, email: userEmail });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(401).json({ error: 'Authentication failed' });
    }
});







// EJS template engine setup
/*app.set('view engine', 'ejs');*/
//app.set('views', __dirname + '/views');


// Serve static files (e.g., CSS, images, JavaScript)
//app.use(express.static('public'));


// Middleware for parsing POST data (if needed)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
/*
app.get('/', (req, res) => {
    res.render('index', { chatHistory: [] }); // Render the initial chat interface
});*/






// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));

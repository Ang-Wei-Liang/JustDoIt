// Import packages
const express = require("express");
const home = require("./routes/home");

const openai = require('./config/open-ai');
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

const serviceAccount = require('./roastme-c7654-firebase-adminsdk-ow3h3-68e716b30d.json');
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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://your-firebase-project.firebaseio.com', // Replace with your project's database URL
});

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



app.post('/chat', async (req, res) => {
    // Obtaining Both Params
    const userInput = req.body.userInput;
    const chatHistory = req.body.chatHistory || [];

    console.log("chatHistory (backend) is " + chatHistory)
    //var promptInput

    try {

        // Construct messages by iterating over the history
        const messages = chatHistory.map(([role, content]) => ({
            role,
            content,
        }));

        // Add latest user input
        messages.push({ role: 'user', content: userInput });

        console.log("messages are " + messages)

        // Call the API with user input & history
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: 'gpt-3.5-turbo',
        });

        // Get completion text/content
        //const completionText = completion.data.choices[0].message.content;
        const completionText = completion.choices[0].message.content

        console.log(colors.yellow((completion.choices)))

        const inputString = completionText

        console.log(colors.yellow('=================================='));
        console.log(colors.green('Bot: ' + inputString));
        console.log(colors.yellow('=================================='));

        //const resultsSummary = [];

        const inputStringUnCut = inputString.split("#");

        var inputStringCut

        if (inputStringUnCut[0][1] == 'I'){
        inputStringCut = inputStringUnCut.slice(2);
        } else {
        inputStringCut = inputStringUnCut.slice(1);
        }

        //resultsSummary.push(inputStringCut);

        console.log("Image Link:", inputStringCut[0]);
        console.log("\n");
        console.log("Caption:", inputStringCut[1]);
        console.log(colors.yellow('================================='));

        const imageURL = inputStringCut[0]
        const caption = inputStringCut[1]

        // Create an empty array
        const resArray = [];

        if (imageURL == "" || caption == "") {
            resArray.push("An error occured");
        } else {
            // Add the variables to the array using the push method
            //resArray.push(expandedDescription, visualStyle, artisticStyle, imageURL, caption);
            resArray.push(imageURL, caption);
        }

        return res.json({ response: resArray });

    } catch (error) {
        console.error(colors.red(error));
        return res.status(500).json({ error: 'Failed to generate response' });
    }
});


app.post('/chatDebateRoast', async (req, res) => {
    // Obtaining Both Params
    const userReasonsInput = req.body.userReasonsInput;
    const searchinputlocks = req.body.searchinputlocks;
    const chatHistoryDebateRoast = req.body.chatHistoryDebateRoast || [];


    userReasonsInputMessageFormat = "My stance is that I believe in " + searchinputlocks + "my reasons are " + userReasonsInput;

    console.log("userReasonsInputMessageFormat is " + userReasonsInputMessageFormat)
    //var promptInput

    try {

        // Construct messages by iterating over the history
        const messages = chatHistoryDebateRoast.map(([role, content]) => ({
            role,
            content,
        }));

        // Add latest user input
        messages.push({ role: 'user', content: userReasonsInputMessageFormat });

        //console.log("messages are " + messages)

        // Call the API with user input & history
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: 'gpt-3.5-turbo',
        });

        // Get completion text/content
        //const completionText = completion.data.choices[0].message.content;
        const completionText = completion.choices[0].message.content

        //console.log(colors.yellow((completion.choices)))

        const outputStringDebateRoast = completionText

        console.log(colors.yellow('=================================='));
        console.log(colors.green('Bot: ' + outputStringDebateRoast));
        console.log(colors.yellow('=================================='));

        return res.json({ response: outputStringDebateRoast });

    } catch (error) {
        console.error(colors.red(error));
        return res.status(500).json({ error: 'Failed to generate response' });
    }
});


app.post('/chatWritingRoast', async (req, res) => {
    // Obtaining Both Params

    const writingInput = req.body.userWritingInput;
    const chatHistoryWritingRoast = req.body.chatHistoryWritingRoast || [];


    //userReasonsInputMessageFormat = "My stance is that I believe in " + searchinputlocks + "my reasons are " + userReasonsInput;

    //console.log("userReasonsInputMessageFormat is " + userReasonsInputMessageFormat)

    //var promptInput

    try {

        // Construct messages by iterating over the history
        const messages = chatHistoryWritingRoast.map(([role, content]) => ({
            role,
            content,
        }));

        // Add latest user input
        messages.push({ role: 'user', content: writingInput });

        //console.log("messages are " + messages)

        // Call the API with user input & history
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: 'gpt-3.5-turbo',
        });

        // Get completion text/content
        //const completionText = completion.data.choices[0].message.content;
        const completionText = completion.choices[0].message.content

        //console.log(colors.yellow((completion.choices)))

        const outputStringWritingRoast = completionText

        console.log(colors.yellow('=================================='));
        console.log(colors.green('Bot: ' + outputStringWritingRoast));
        console.log(colors.yellow('=================================='));

        return res.json({ response: outputStringWritingRoast });

    } catch (error) {
        console.error(colors.red(error));
        return res.status(500).json({ error: 'Failed to generate response' });
    }
});




// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));

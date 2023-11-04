const express = require("express");
const router = express.Router();
const path = require("path");

// Import the EJS module
const ejs = require("ejs");



router.get("/", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "index.html");
  return res.sendFile(filePath);
});

/*
router.get("/count", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "indexCountdown.html");
  return res.sendFile(filePath);
});*/





/*router.get("/", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "index.html");
  return res.sendFile(filePath);
});




router.get("/picture", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "picture.html");
  return res.sendFile(filePath);
});

router.get("/home", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "writing.html");
  return res.sendFile(filePath);
});

router.get("/writingroast", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "writingroast.html");
  return res.sendFile(filePath);
});

router.get("/writingtips", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "writingtips.html");
  return res.sendFile(filePath);
});

router.get("/opinionroast", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "opinionroast.html");
  return res.sendFile(filePath);
});

router.get("/opiniontips", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "opiniontips.html");
  return res.sendFile(filePath);
});

router.get("/coderoast", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "coderoast.html");
  return res.sendFile(filePath);
});

router.get("/codetips", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "codetips.html");
  return res.sendFile(filePath);
});*/


/*
app.get('/', (req: Request, res: Response) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});*/

/*
router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});*/

module.exports = router;



/*router.get("/home", async (req, res, next) => {
  // Render the "home.ejs" template
  console.log("home reached")
  const templatePath = path.join(__dirname, "views", "index.ejs");
  ejs.renderFile(templatePath, { title: "Express Testing" }, (err, html) => {
    if (err) {
      console.error("Error rendering EJS template:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.send(html);
  });
});*/

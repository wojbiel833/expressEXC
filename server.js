const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.engine(
  "hbs",
  hbs({ extname: "hbs", layoutsDir: "./layouts", defaultLayout: "mainLayout" })
);
app.set("view engine", ".hbs");

// podlaczanie calego folderu z plikami, najczesciej nazwa to public
app.use(express.static(path.join(__dirname, "/views")));
// Jeśli chcesz umożliwić obsługę formularzy x-www-form-urlencoded, dodaj middleware express.urlencoded.
app.use(express.urlencoded({ extended: false }));
// Jeśli dodatkowo chcesz odbierać dane w formacie JSON (mogą być wysyłane za pomocą form-data), to również express.json:

app.use(express.json());

// MIDDLEWARE dodajacy metode.show
// app.use((req, res, next) => {
//   res.show = (name) => {
//     res.sendFile(path.join(__dirname, `/views/${name}`));
//   };
//   next();
// });

app.post("/contact/send-message", upload.single("image"), (req, res) => {
  const { author, sender, title, message } = req.body;
  const file = req.file;

  if (author && sender && title && message && file) {
    res.render("contact", { isSent: true, filename: file.originalname });
  } else {
    res.render("contact", { isError: true });
  }
  // res.json(req.body);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "dark" });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/info", (req, res) => {
  res.render("info");
});

app.get("/history", (req, res) => {
  res.render("history");
});

app.use("/user", (req, res) => {
  res.render("login");
}); // pokazuje napis login.html

//Zostaw dla Pawla
app.use("/home", (res, req) => {
  res.show("Hello world!");
}); // pokazuje blad show i send tak samo

// Podlaczanie plikow  kazdy z osobna
// app.get("/style.css", (req, res) => {
//   res.show("style.css");
// });

// app.get("/test.png", (req, res) => {
//   res.show("test.png");
// });

app.get("/hello/:name", (req, res) => {
  res.render("hello", { layout: false, name: req.params.name });
});

app.use((req, res) => {
  res.status(404).show("404.png");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});

/*
SERVER BEZ EXPRESSU
const http = require('http');

const server = http.createServer((req, res) => {

  if(req.url === '/' && req.method === 'GET') {
    res.write('<h1>My first server!</h1>');
    res.end();
  }
  else if(req.url === 'about/' && req.method === 'GET') {
    res.write('<h1>About</h1>');
    res.end();
  }

  // ... then similar other routes

})

server.listen(8000, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${8000}`);
});
*/

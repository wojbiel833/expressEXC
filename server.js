const express = require("express");
const path = require("path");

const app = express();

// podlaczanie calego folderu z plikami, najczesciej nazwa to public
app.use(express.static(path.join(__dirname, "/views")));

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.get("/", (req, res) => {
  res.show("index.html");
});

app.get("/about", (req, res) => {
  res.show("about.html");
});

app.get("/contact", (req, res) => {
  res.show("contact.html");
});

app.get("/info", (req, res) => {
  res.show("info.html");
});

app.get("/history", (req, res) => {
  res.show("history.html");
});

//Zostaw dla Pawla
app.use("/home", (res, req) => {
  res.show("Hello world!");
}); // pokazuje blad show i send tak samo

app.use("/user", (req, res) => {
  res.show("login.html");
}); // pokazuje napis login.html

// Podlaczanie plikow  kazdy z osobna
// app.get("/style.css", (req, res) => {
//   res.show("style.css");
// });

// app.get("/test.png", (req, res) => {
//   res.show("test.png");
// });

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

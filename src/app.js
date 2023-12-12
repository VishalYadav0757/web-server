const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
const PORT = process.env.PORT || 3030;

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); // we can either write this code or rename `templates` folder to `views` and remove this code.
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    desc: "Weather Updates",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Vishal Yadav",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help & Support",
    message: "For any issues/concerns contact admin.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address !!" });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req?.query?.address,
          location,
          forecast: forecastData,
        });
      });
    }
  );
});

/*
  With the code using wild card handler we can specify what component should be shown if nested routing occurs.
  So, if someone tries to load any url with `/help/...` this code gets executed.
*/
app.get("/help/*", (req, res) => {
  res.render("404", {
    desc: "Help Data Not Found",
  });
});

/*
  `*` is called wild card handler.
  It matches for any page that is not mentioned above and if any page loades that is not mentioned above this component is rendered.
  This code should be last as it matches routes in this file from the start of the file.
*/
app.get("*", (req, res) => {
  res.render("404", {
    desc: "Page Not Found",
  });
});

app.listen(PORT, () => {
  console.log("Server is up and running !!");
});

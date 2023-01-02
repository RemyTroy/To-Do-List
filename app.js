// requiring two packages we have installed and creating and requesting app

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// must add variable of item blank that will get changed under the post request
let items = ["Buy Groceries", "Put Groceries Away", "Take out Trash"];
let workItems = [];

app.set("view engine", "ejs");
//must have to use bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
// tell express to serve your local files this would grab any files in public and use them in this example css
app.use(express.static("public"));

app.get("/", function(req, res) {
  let today = new Date();

  //javascript date format stack overflow
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  }
  // this is to render it in your language
  var day = today.toLocaleDateString("en-US", options);

  res.render('list', {
    listTitle: day,
    newlistItems: items,
    route:"/"
  });

});
// post request from form is received it allows me to get the data from input box // this would be if i didnt figure out the easier route which is to just add another item to the list("route)in res.render of both app.gets
app.post("/", function(req, res) {
  let item = (req.body.newItem);
// if comes from work list add to work list not the homepage list
  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    // you add the res.render that you would put here you would add it to the other one then redirect
    res.redirect("/");
  }


});


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newlistItems: workItems,
    route:"/work"
  });
});

app.post("/work", function(req, res) {



  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

//Listening on port 3000 and if it goes well then logging a message saying that the server is running

app.listen(3000, function() {
  console.log("server is running port 3000");


});









// writing this in javascript below:

// var currentDay = today.getDate();
// var day = "";
//
// switch (currentDay) {
//   case 0:
//     day = "Sunday"
//     break;
//
//   case 1:
//     day = "Monday"
//     break;
//   case 2:
//     day = "Tuesday"
//     break;
//   case 3:
//     day = "Wednesday"
//     break;
//   case 4:
//     day = "Thursday"
//     break;
//   case 5:
//     day = "Friday"
//     break;
//   case 6:
//     day = "Saturday"
//     break;
//   default:
// console.log("Error");
// }

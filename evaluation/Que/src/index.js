 const express = require("express");

 const app = express();

 app.use(express.json());

 module.exports = app;




 const colorCont = require("./controllers/colorCont");

 app.use("/colors", colorCont );

 
 const productCont = require("./controllers/productCont");

 app.use("/products", productCont);



 //----------1st get api for all products----------

 const getAllProd = require("./controllers/querys/1st Get allProducts")

 app.use("/allProducts", getAllProd);


//---------2nd find all products which are higher than Rs.500------

const moreThen500 = require("./controllers/querys/2nd Products gt500");

app.use("/moreThen500", moreThen500);


//---------3rd find all the products which are available in more than 3 different colours----

const moreThen3col = require("./controllers/querys/3rd moreThen 3colors");

app.use("/moreThen3Col", moreThen3col)


//------------find all the products which have atleast 1 colour that matches.----------

const oneColMatch = require("./controllers/querys/4th oneColorMatch");

app.use("/oneColMatch",oneColMatch)


//----------5th find the product which has the most colours.--------

const mostCol = require("./controllers/querys/5th MostCol")

app.use("/mostColor", mostCol);


//-----------6th find the products which can be used by men and women.------

const both = require("./controllers/querys/6th usedByBoth");

app.use("/usedByBoth", both)


//--------7th find the total number of products on the site----------

const totalProd = require("./controllers/querys/7th totalProdOnSite");

app.use("/totalProducts", totalProd);


//----------8th find the colour which has the most products.------

const mostProd = require("./controllers/querys/8th colorMostProd");

app.use("/ColorMostProd", mostProd);
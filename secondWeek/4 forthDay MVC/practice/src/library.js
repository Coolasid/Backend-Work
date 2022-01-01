
const express = require("express");


const app = express();

app.use(express.json());

module.exports = app;


//-----------importing Controllers--------

const authorCont = require("./controllers/authorCont");

app.use("/authors", authorCont);

const bookCont = require("./controllers/bookCont");

app.use("/books", bookCont);

const sectionCont = require("./controllers/sectionCont");

app.use("/sections", sectionCont);


//-----------Checkout Books-------------------

const checkOutBooks = require("./controllers/checkOutBooks");

app.use("/checkOutBooks", checkOutBooks);


//-----------------find all books written by an author-----------

const authorBooks = require("./controllers/allBooksOfAuthor");

app.use("/authourBooks", authorBooks);

//----------------------find books in a section--------------

const bookInSect = require("./controllers/bookInSection");

app.use("/BookInSection", bookInSect);


//---------------------------find books in a section that are not checked out------

const unCheckedBooks = require("./controllers/unCheckedBooks");

app.use('/notCheckoutBooks', unCheckedBooks);


//--------------------------find books of 1 author inside a section---------------

const bookOfAnAuthSection = require("./controllers/bookOfAuthorInSection");

app.use("/booksOfAnAuthor", bookOfAnAuthSection);


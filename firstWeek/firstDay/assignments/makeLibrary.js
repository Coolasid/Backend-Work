let readline = require("readline");

let EventEmitter = require("events");

let eventEmitter = new EventEmitter();

let books = ["Got", "Loard of ring"]

function showBooks(){

    console.log(books);
    return;
}




let r1 = readline.createInterface({

    input: process.stdin,
    output: process.stdout

}) 



function interactWithUser(){

    r1.question("Press 1 - Show all books, Press 2 - Add a new book, Press 3 - Quit\n",(selectedOption) => {

        if( selectedOption == "1"){

            eventEmitter.on("showBooksPressed", showBooks)
            eventEmitter.emit("showBooksPressed");

            interactWithUser();

        }else if( selectedOption == "2"){

           r1.question("Please Provide Name of the Book\n",(bookName) =>{


                books.push(bookName);

                eventEmitter.emit("showBooksPressed")

               interactWithUser();
           })
            
           
        }else if( selectedOption == "3"){

            r1.question("if you Want to exit press y for Yes or n for No\n",(ans)=>{


                if( ans == "y"){
                    console.log("Bye Bye")
                    r1.close();
                }else{
                    interactWithUser();
                }
            })
        }else{
            console.log("Please enter valid Number");
            interactWithUser()
        }



    })

}

interactWithUser();
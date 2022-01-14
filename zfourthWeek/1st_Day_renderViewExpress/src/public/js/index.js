function showUser(user) {
  const parsedUser = JSON.parse(user);

  alert(parsedUser.firstName);
}

function updateSubmitH(e){

  const event = JSON.parse(e);


  event.preventDefault(); 

  console.log(event.target);

}
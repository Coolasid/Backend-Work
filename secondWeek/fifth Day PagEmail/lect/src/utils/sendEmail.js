
const transporter = require("../configs/email")

module.exports= (data)=>{

    transporter.sendMail(data)

};
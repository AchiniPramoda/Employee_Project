
var nodemailer = require('nodemailer');
const Employees=require("../models/Employee")


var dateYear = new Date().getFullYear();
var dateMonth = new Date().getMonth(); // start counting from 0
var dateDay = new Date().getDate();// start counting from 1

//Email schedules code comes here

async function sendMail(){
    
    try{

        var today = new Date();
        var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
        console.log(date)
                const [employees] = await Employees.find({dateOfBirth:date});
                
                       
                console.log(employees.name);
              
                
               
        //         let d = employees.dateOfBirth.split('-')
        //         let dM = +d[1]  // For the month
        //         let dD = +d[0] // for the day 
        //         let age = dateYear - +d[2]

     
var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
            user: 'cdazzdevc@outlook.com',   //put your mail here
            pass: 'Devy.io#1'              //password here
          }
 });
 
 const mailOptions = { 
    from: 'cdazzdevc@outlook.com',       // sender address
    to: employees.email,          //receiver address
    subject: 'Birthday Greeting!',  
    html: `<p> Wishing ${employees.name} &#128525; a special Birthday! Best Regards and warm wishes from <b> Cdazzdev.com and team </b></p> `// plain text body
};


    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.log(err);
        }
       
          console.log("Sent:"+info.response);
         });
   
         const result = await transport.sendMail(mailOptions);
         return result
        } catch(error){
            return error
        }
    } 
    module.exports=sendMail;
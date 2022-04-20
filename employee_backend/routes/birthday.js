
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
        
                const [employees] = await Employees.find({dateOfBirth:date});
                const employeesAll = await Employees.find();
                
                      // console.log(employeesAll);
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

 try{
 employeesAll.forEach(element=>{
     console.log("called");
 const mailOptions = { 
    from: 'cdazzdevc@outlook.com',       // sender address
    to: employeesAll.email,          //receiver address
    subject: 'Birthday Greetings!',  
    html: `<p> Wishing ${employees.name} &#128525; a special Birthday! Best Regards and warm wishes from <b> Cdazzdev.com and team </b></p> `// plain text body
};


    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.log(err);
        }
       
          console.log("Sent:"+info.response);
          
         });
   
     

         async function mailsend(){
            const result = await transport.sendMail(mailOptions);
            return result
         }

        }  )}
        catch(error){
            return error }   
        }
         catch(error){
            return error
        }
    } 
    module.exports=sendMail;
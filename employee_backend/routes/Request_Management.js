const router = require("express").Router();

const { request } = require("express");
const Request = require("../models/Request");
//const { request } = require("https");
const Emoployee = require("../models/Employee");

router.post('/AddRequest',async (req, res) => {


    let request = new Request({
        title: req.body.title,
        email: req.body.email,
        description: req.body.description,
    });

    try {
        await request.save();
        res.send(request);
        //await for send email
    } catch (err) {
       
        res.status(400).send('Error: ' + err);
   }

});


/*Router for get all Requests by using id of the request*/

router.get("/request/my", async (req, res) => {

    await Request.find(req.params._id)
        .then(request => res.send(request))
        .catch(err => res.status(400).send('Error: ' + err))

});

//router for delete request
router.put("/request/accept/:id", async (req, res) => {

    await Request.findByIdAndUpdate(req.params.id,{status : true})
        .then(request => res.send(request))
        .catch(err => res.status(400).send('Error: ' + err))
        

})
//router for the reject request using request id

router.put("/request/reject/:id", async (req, res) => {

    await Request.findByIdAndUpdate(req.params.id,{status : false})
        .then(request => res.send(request))
        .catch(err => res.status(400).send('Error: ' + err))
        const url = `${process.env.BASE_URL}/admin/employees/${request.id}/verify/${token.token}`;
		await sendEmail(request.email,"Verify Email",url);
        

})


//router for get stusus of request with id
router.get("/request/status/:id", async (req, res) => {

    await Request.findById(req.params.id)
        .then(request => res.send(request))
        .catch(err => res.status(400).send('Error: ' + err))


});


/*Router for update employee*/

router.put("/UpdateEmployee/request/:id", async (req, res) => {

    console.log(req.body);

    let imageURL;
    if (req.body.isImageUpdated === "true") {

        let image = req.files.photo;

        let urlPrefix = "http://localhost:8092/static/images";
        let imageName = Date.now() + "-" + image.name;

        image.mv("./public/images/Employees/" + imageName, (err, result) => {
            if (err) return res.status(400).send("Error : " + err);
        });

        imageURL = urlPrefix + "/Employees/" + imageName;
    }
    else if (req.body.isFileUpdated === "true") {

        let fileme = req.files.photo;

        let Prefix = "http://localhost:8092/static/images";
        let fileName = Date.now() + "-" + fileme.name;

        fileme.mv("./public/images/Employees/" + fileName, (err, result) => {
            if (err) return res.status(400).send("Error : " + err);
        });

        filecv= Prefix + "/Employees/" + fileName;
    }
    
    await Emoployee.findById(req.params.id)
        .then(employee => {
            employee.name = req.body.name;
            employee.empNumber = req.body.empNumber;
            employee.dateOfBirth = req.body.dateOfBirth;
             employee.email = req.body.email;
            employee.empType = req.body.empType;
            employee.phoneNo = req.body.phoneNo;
            employee.Address = req.body.Address;
            employee.joindate = req.body.joindate;
            employee.ivalutionDate = req.body.ivalutionDate;
            if (req.body.isImageUpdated === "true") {
                employee.imageURL = imageURL;
            }
            else if (req.body.isFileUpdated === "true") {
                employee.filecv = filecv;
            }
            employee.save()
                .then(() => res.send("Updated Successfully!"))
                .catch(err => res.status(400).send('Error: ' + err));
        })
        .catch(err => res.status(400).send("Error : " + err));



       
});
//router for update employee by request  is accepted
router.put("/UpdateEmployee/request/accept/:id", async (req, res) => {

    console.log(req.body);

    let imageURL;
  

    if (req.body.isImageUpdated === "true") {

        let image = req.files.photo;

        let urlPrefix = "http://localhost:8092/static/images";




        image.mv("./public/images/Employees/" + image.name, (err, result) => {

            if (err) return res.status(400).send("Error : " + err);
        });

        imageURL = urlPrefix + "/Employees/" + image.name;
    }
    else if (req.body.isFileUpdated === "true") {

        let fileme = req.files.photo;

        let Prefix = "http://localhost:8092/static/images";

        fileme.mv("./public/images/Employees/" + fileme.name, (err, result) => {
            if (err) return res.status(400).send("Error : " + err);
        });

        filecv= Prefix + "/Employees/" + fileme.name;

    }
    await Emoployee.findById(req.params.id,{status : true})

        .then(employee => {
            employee.name = req.body.name;
            employee.empNumber = req.body.empNumber;
            employee.dateOfBirth = req.body.dateOfBirth;
            employee.email = req.body.email;
            employee.empType = req.body.empType;
            employee.phoneNo = req.body.phoneNo;
            employee.Address = req.body.Address;
            employee.joindate = req.body.joindate;
            employee.ivalutionDate = req.body.ivalutionDate;
            if (req.body.isImageUpdated === "true") {
                employee.imageURL = imageURL;
            }
            else if (req.body.isFileUpdated === "true") {
                employee.filecv = filecv;
            }
            employee.save()
                .then(() => res.send("Updated Successfully!"))
                .catch(err => res.status(400).send('Error: ' + err));
        })

        .catch(err => res.status(400).send("Error : " + err));


});



module.exports = router;
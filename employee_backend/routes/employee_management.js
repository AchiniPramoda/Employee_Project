const router = require("express").Router();
const Emoployee = require("../models/Employee");

/*Router for get all Employees*/
router.get("/get",(req, res) => {

     Emoployee.find({ deleted: false })
        .then(employee => res.send(employee))
        
        .catch(err => res.status(400).send('Error: ' + err))
  

});

router.get("/", async (req, res) => {

    await Emoployee.find(req.params.id )
        .then(employee => res.send(employee))
        .catch(err => res.status(400).send('Error: ' + err))

});

/*Router for get Emoployee by Id*/
router.get("/:id", async (req, res) => {

    await Emoployee.findById(req.params.id)
        .then((employee) => res.send(employee))
        .catch(err => res.status(400).send("Error : " + err))

});

/*Router for create employee*/
router.post('/Add',async (req, res) => {

    const empNumber = req.body.empNumber;

    let Exit = await Emoployee.findOne({
        empNumber: empNumber,
    });

    if (Exit)
        return res.status(404).send("employee already created!");

    let image = req.files.photo;
    let urlPrefix = "http://localhost:8092/static/images";
    let imageName = Date.now() + "-" + image.name;

    image.mv("./public/images/Employees/" + imageName, (err, result) => {
        if (err) return res.status(400).send("Error : " + err);
    });

  
    let imageURL = urlPrefix + "/Employees/" + imageName;



/// file handle

let fileme = req.files.photo;
let Prefix = "http://localhost:8092/static/files";

let fileName = Date.now() + "-" + fileme.name;
fileme.mv("./public/images/Employees/" + fileName, (err, result) => {
    if (err) return res.status(400).send("Error : " + err);
});
let filecv = Prefix + "/Employees/" + fileName;


    let employee = new Emoployee({
        name: req.body.name,
        empNumber: empNumber,
        empType: req.body.empType,
        phoneNo: req.body.phoneNo,
        Address: req.body.Address,
        joindate: req.body.joindate,
        ivalutionDate: req.body.ivalutionDate,
        filecv,
        imageURL
    });

    try {
        await employee.save();
        res.send(employee);
    } catch (err) {
        console.log(err);
        res.status(400).send('Error: ' + err);
    }

});

/*Router for delete employee*/
router.delete("/DeleteEmployee/:id", async (req, res) => {

    await Emoployee.findByIdAndDelete(req.params.id ,{ deleted: true })
        .then(() => res.send("Emoployee Deleted Successfully!"))
       .catch(err => res.status(400).send("Error : " + err));

});

/*Router for  employee*/
router.delete('/DeleteEmployees/:id', async (req, res) => {
    try {
      await Emoployee.findByIdAndUpdate(req.params.id, { deleted: true });
      res.status(200).json('user Deleted');
      
    } catch (error) {
      res.status(500).json(error)
    }
  })


/*Router for get all Employees*/
router.put("/restore/:id", async (req, res) => {
    await Emoployee.findByIdAndUpdate(req.params.id,{deleted : false})
        .then(() => res.send("Emoployee update Successfully!"))
       .catch(err => res.status(400).send("Error : " + err));
});


/*Router for update employee*/

router.put("/UpdateEmployee/:id", async (req, res) => {

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
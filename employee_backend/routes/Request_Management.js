const router = require("express").Router();

const Request = require("../models/Request");
//const { request } = require("https");

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
router.get('/request/:id', async (req, res) => {

    await Request.findById(req.params.id)
        .then((request) => res.send(request))

        .catch(err => res.status(400).send("Error : " + err))


});

module.exports = router;
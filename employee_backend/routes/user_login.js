
//const { Employee} = require("../models/Employee");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const  crypto = require("crypto");
const router = require("express").Router();



router.post("/adding", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const  employee = await Employee.findOne({id: req.body._id });
		if (!employee)
			return res.status(401).send({ message: "Invalid Email or Password" });

	// compare password with hash password in database and return true or false 
	
		const validPassword = await bcrypt.compare(req.body.password, employee.password);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
			
		
        if(!employee.verfied){
			let  token =await Token.findOne({userId:employee});
			if(!token){
				token = await new Token({
					userId:employee._id,
					token:crypto.randomBytes(32).toString("hex")
		
				}).save();
				//const url = `${process.env.BASE_URL}/api/${employee.id}/verify/${token.token}`;
				//await sendEmail(employee.email,"Verify Email",url);
			}
          //return res.status(400).send({message:"verfiy your email "});
		}
		//const token = employee.generateAuthToken();
		res.status(200).send({  message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		console.log(error);
	}
});
//create validation function
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
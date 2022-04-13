const router = require("express").Router();
const  crypto = require("crypto");
const bcrypt = require("bcrypt");

///////////////
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const { User, validate } = require("../models/user");



router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user=await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
			userId:user.id,
			token:crypto.randomBytes(32).toString("hex")

		}).save();
		const url = `${process.env.BASE_URL}/admin/employees/${user.id}/verify/${token.token}`;
		await sendEmail(user.email,"Verify Email",url);


		res.status(201).send({ message: "An email sent user account, please verify your account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
// route for verification token
router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user.id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });


//indByIdAndUpdate(req.params.id, { deleted: true });
		await User.findByIdAndUpdate(req.params.id ,{verfied: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});



module.exports = router;






import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import React from "react";
//import success from "../../images/success.png";
//import styles from "./styles.module.css";
import  "./style.css";
import success from './suc.png';
import success2 from './mm.jpg';
import RobotAnimated from "./robot-animated"

import { Fragment } from "react/cjs/react.production.min";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:8092/api/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			{validUrl ? (
				<div className="containers">
					<img src={success} alt="success_img" className="styles.success_img" />
					<h1>Email verified successfully</h1>
					
					<Link to="/admin/employees/Login">
						<button className="green_btn">Login</button>
					</Link>
				</div>
			) : (
				
				<h1>404 Not Found<br/>
				
				
				<div>
              <RobotAnimated />
                </div>
				something went wrong ,Try again !!!!!!!
				</h1>

			)}
			
		</Fragment>
	);
};


export default EmailVerify;
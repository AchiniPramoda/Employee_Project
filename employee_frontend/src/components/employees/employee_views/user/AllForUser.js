import React, { Component } from 'react'
import axios from "axios"
import img1 from './logo8.png';
import img2 from './img22.png';
import img3 from './img33.png';
import img4 from './img66.png';
import img5 from './img44.png';

import SmallView from "./EmployeeSmallView"
const isBackgroundRed = true;
class AllForUser extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    };
    
    // Get all packages from datasbase
    componentDidMount() {
        axios.get("http://localhost:8092/api/get").then(res => {
            this.setState({ employees: res.data });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        <div
      style={{
        backgroundColor: isBackgroundRed ? 'red' : 'blue',
      }}
    />
        return (
       
            <div className="container">
                <div className="row">
                    
                    <div class="container h-100">
			<div
				class="row h-100 align-items-center justify-content-center text-center">

			</div>
		</div>
        
      <header className="landing-header-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="banner-con">
                <h1 className="heading-1 mb-20">
                  Transforming
                  Business Intelligence with Employees...
                </h1>
                <p className="">
                  Learn what your audience is doing on your website to make smart, informed decisions. Let
                  Hypertarget accelerate your business growth with an insightful dashboard that delivers
                  actionable, visual insights. Our data analytics software is here to help you out!
                  Learn what your audience is doing on your website to make smart, informed decisions. Let Hypertarget accelerate your business growth with an insightful dashboard that delivers actionable, visual insights. Our data analytics software is here to help you out!
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="banner-img-wrapper">
                <img src={img1} alt="My logo"  width={600} height={700} layout='responsive'  />
              </div>
            </div>
            {/* col-2 */}
           
          </div>
        </div>
      </header>
      <div className="banner-bottom-logos-area">
        <div className="container banner-bottom-logo-container">
          <div className='row align-items-center justify-content-between'>
            <div className="col-md-2 col-sm-4 text-center p-3">
             <a><img src={img2} width={50} height={50} layout='responsive' alt="Netflix" /></a> 
            </div>
            <div className="col-md-2 col-sm-4 text-center p-3">
              <img src={img3} width={50} height={50} layout='responsive' alt="reddit" />
            </div>
            <div className="col-md-2 col-sm-4 text-center p-3">
              <img src={img4} width={50} height={50} layout='responsive' alt="amazon" />
            </div>
            <div className="col-md-2 col-sm-4 text-center p-3">
              <img src={img5} width={50} height={50} layout='responsive' alt="Discord" />
            </div>
           
          </div>
        </div>
        <br/>
      </div>
      <br/>
      <br/>
      <br/>
      <hr />
      <div class="container h-100">
			<div
				class="row h-100 align-items-center justify-content-center text-center">
				<div class="col-lg-10 align-self-end">
				<h2 className={"text-secondary text-center mb-5"}>Our Employees Details</h2>
					<hr class="divider my-4" />
				</div>
				<div class="col-lg-8 align-self-baseline">
					<p class="text-white-75 font-weight-light mb-5">"Whether you enjoy city breaks or extended holidays in the sun, you can always improve your travel experiences by staying in a small."</p>

				</div>
			</div>
		</div>
      
      <br/>
      <hr />
      <br/>
      <br/>
                    <React.Fragment>
                   
                        {
                            this.state.employees.map(employee => {
                                return <SmallView employee={employee} count={3} />
                            })
                        }
                    </React.Fragment><br/>
                    <br/>
                    <br/>
                </div>
                <br/>
                <br/>
            </div>

        );
    }
}

export default AllForUser;
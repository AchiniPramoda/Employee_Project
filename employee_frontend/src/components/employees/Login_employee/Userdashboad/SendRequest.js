import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import EmployeeValidations from '../../../../validations/EmployeeValidations';
import { Alert } from '../../../../services/Alert';

class UpdateEmployeeName  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            email:"",
            password:"",
            
        }
    }



    render() {
        return (   
            <CreateContainer>
    
            <div className="container">
              <div className="">
                    <div className="row g-0">
                        <div className="col-md-7">
                         <h3>Change your password here</h3>
                        </div>
                        <div className="col-md-5 p-3">
                            <div className="card-body">
                                <h4 className="card-title text-secondary mt-3">Create Emoployee</h4>
                                <hr class="" />
                                
                                <form onSubmit={(e) => this.submit(e)}>
                               
                                <div className="mb-3">
                                        <label for="milage" className="form-label">Enter Email </label>
                                        <input
                                            className="form-control"
                                            id="email"
                                            type="email"
                                            value={this.state.email}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="sheets" className="form-label">Enter Password</label>
                                        <input
                                            className="form-control"
                                            id="password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="condition" className="form-label">Enter Password Again</label>
                                        <input
                                            className="form-control"
                                            id="newpassword"
                                            type="password"
                                            value={this.state.newpassword}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="d-grid gap-2 mx-auto">
                                        <button type="submit" className="btn btn-primary">Update Emoployee</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <br/>
        <br/>
            </CreateContainer>
         
        );
    }
}

export default withRouter(UpdateEmployeeName);
const CreateContainer = styled.div`
  img{
   height:600px;
  }
  h4{
    front-color: black
  }
.nav-link{
color:white !important;
&:hover{
    background-image: linear-gradient(to right top, #3f7f85, #578e9a, #6f9dad, #89acbf, #a2bbd0, #9eb7cb, #99b2c7, #95aec2, #7396a6, #527e89, #34666b, #194f4c);
}
}
div {
    border-radius: 5px;
    background-color: white;
    padding:1px;
  }
  .container{
    background:gray;
    margin-top:30px;
    border: 7px solid  gray
}
.imag{
    background-image: url(../../../assets/images/dummy_image.jpg);
  
  hr{
    height: 10px;
    border: 1;
    box-shadow: inset 0 9px 9px -3px gray;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    }
    
`;
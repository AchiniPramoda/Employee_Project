import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';


import { Alert } from './../../../../services/Alert';
import Validations from '../../../../validations/requestvalidation';


//asign to the values using java script constructor


    

class CreateRequest extends Component {
    constructor(props) {//asign to the values using java script constructor
        super(props);
        this.state = {
            title :"",
            email :"",
            description:"",     
        }
    }

    // Handle input feild
    onInputValueChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    
    
    // Function for Check Status code
    handleError = (err) => {
        if (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    Alert("error", "Something went wrong!", err.response.data)

                }
            } else {
                Alert("error", "Something went wrong.", err)

            }
        }
    }
    onSelectValueChange = (e) => {
        this.setState({[e.target.id]:e.target.value});
    }

    // Function for create Employee
    submit = (e) => {

        e.preventDefault();

        const result = Validations({
            title: this.state.title,
            email: this.state.email,
            description: this.state.description,
        });

        if (result.status) {
           
                const formData = new FormData();
                formData.append('title', this.state.title);
                formData.append('email', this.state.email);
                formData.append('description', this.state.description);

              

                axios.post("http://localhost:8092/api/AddRequest", formData).then(res => {
                    Alert("success", "Done!", "Employee Created Successfully.");
                    this.setState({
                        title: "",
                        email: "",
                        description: "",
                       
                    });
                    this.props.history.push("/admin/employees")
                }).catch(err => {
                    this.handleError(err);
                })
            

        } else {
            Alert("error", "Form Validation Error!", result.error)
        }

    }

    render() {
        return (   
            <CreateContainer>
    
            <div className="container">
              <div className="">
                    <div className="row g-0">

                        <div className="col-md-5 p-3">
                            <div className="card-body">
                                <h4 className="card-title text-secondary mt-3">Fill out the request details </h4>
                                <hr class="" />
                                
                                <form onSubmit={(e) => this.submit(e)}>
                                <div className="mb-3">
                                        <label for="title" className="">Title</label>
                                        <input
                                            className="form-control"
                                            id="title"
                                            value={this.state.title}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label for="email" className="">Email</label>
                                        <input
                                            className="form-control"
                                            id="email"
                                            value={this.state.email}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label for="condition" className="">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            type="text"
                                            value={this.state.description}
                                            onChange={(e) => this.onInputValueChange(e)}
                                        />
                                    </div>
                                    
                        
        
                                    <div className="d-grid gap-2 mx-auto">
                                        <button type="submit" className="btn btn-primary">Create Emoployee</button>
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

export default withRouter(CreateRequest);
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
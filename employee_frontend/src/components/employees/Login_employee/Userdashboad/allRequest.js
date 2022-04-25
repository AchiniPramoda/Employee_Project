import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios"
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';

import RequestActions from  './RequestAction'
import {  MDBIcon } from "mdbreact";
//import  reports from './report.png'

const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


const styles = {
    paperContainer: {
        height: 1356,
        backgroundImage: `url(${"../assets/images/dummy_image.jpg"})`
    }
};
class AllEmployeeRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            FilterRequest: [],
            isGen: false
           
        }
    }

    updateContent = () => {
        axios.get("http://localhost:8092/api/request/my").then(res => {
            this.setState({
                requests: res.data,
                FilterRequest: res.data ,
              
            });
        }).catch(err => {
            console.log(err);
            
        });

       
    }

    // Get all packages from datasbase
    componentDidMount() {
        this.updateContent();
    }

    // Function for search employees

    search = (e) => {
        let searchTag = e.target.value.toLowerCase();
        let FilterRequest = [];

        this.state.requests.forEach(requests => {
            if (requests.email.toLowerCase().includes(searchTag) || requests.title.toLowerCase().includes(searchTag)) {
                FilterRequest.push(requests)
            }
        })

        this.setState({
            FilterRequest,
            searchTag
        });

    }

    getRedirectButton = () => {
        return <button type="button" onClick={() => { this.props.history.push("/admin/employees/CreateEmployee") }} class="but3">Emoployee Create</button>
    }


    render() {
        return (
<SearchContainer>


            <div className="container-fluid mt-5">
                <div className="row">    
                    <nav class="navbar navbar-light bg-light">
                        <div class="container-fluid">
                            <div class="d-flex">
                                <input onChange={(e) => this.search(e)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button   class="btn btn-primary"type="submit">
                                
                                </button>
                                
                            </div>
                        </div>
                    </nav>

                    {
                        this.state.isGen ? <div className="row text-end">
                            
                            <div className="col">
                            <h3></h3>
                                {this.getRedirectButton()}
                                <ReactToPrint

                                    documentTitle={"Employee"}
                                    onAfterPrint={() => { this.setState({ isGen: false }); }}
                                    trigger={() => {
                                        return <button type="button" class="but2">Generate PDF
                                        </button>       
                                    }}
                                    
                                    content={() => this.componentRef}
                                />
                                <button onClick={() => { this.setState({ isGen: false }); }} type="button" class="but">Cancel
                              
                                </button>
                            </div>
                        </div> : <div className="row text-end">
                            
                        </div>
                    }
                    <div ref={el => (this.componentRef = el)}>
                      <h3>{date}</h3>
                      <h3 className={"text-secondary text-center mb-5"}>All Request Management Details</h3>
                  
                        <div class="">
                            <table class="table table-hover text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Request Title</th>
                                        <th scope="col">Request Email </th>
                                        <th scope="col">Request Description </th>
                                        <th scope="col">Request Status </th>
                                        
                                        {
                                            
                                            !this.state.isGen ? <th scope="col">Actions</th> :<React.Fragment />
                                        }
                                        
                                    </tr>
                                </thead>
                               
                                <tbody>
                                    <React.Fragment>
                                        {
                                            this.state.FilterRequest.map(request => {
                                                return <RequestActions key={request._id} request={request} isGen={this.state.isGen} updateContent={this.updateContent} />
                                            })
                                        }
                                    </React.Fragment>
                                </tbody>
                            </table>
                            <MDBIcon icon="spinner" spin size="3x" fixed />
                        </div>
                    </div>
                    <div className="row text-end">  
                    <div className="col">
                   
                                
                               <button type="button" onClick={() => { this.setState({ isGen: true }); }} class="but22">Genrate Report
                             
                               </button>
                           </div>
                           </div>
                </div>
            </div>
            </SearchContainer>
        );
    }
}

export default withRouter(AllEmployeeRequest);
const SearchContainer = styled.div`
.container{
    background:gray;
    margin-top:30px;
    border: 1px solid  gray;
}
.table{
        tr:nth-child(even) {background-color: #CCC}
        tr:nth-child(odd) {background-color: #FFF}
 }
    
tr:hover {background-color: #ddd;
};

th:nth-child{background-color:#ddd;};
.nav-link{
color:white !important;

.container-fluid{
    background-color: #ddd;
}
}
table th,tr {
    border: 1px solid black;
    border-style: solid
  }
.btn{
      color:white;
      border-radius:7px;
      border: 1px solid gray;
      border-style: solid;
      width:89%;
}
h3{
    color:black;  
}
.button{
    color:white;
    border: 1px solid gray;
    border-style: solid;
    background-color:#3b78b1;
}
}
.but{
    display:inline-block;
    border:1px solid #fff;
    border-radius:7px;
    font-weight:400px;
    width:120px;
    height:40px;
    float:right;
    background:red;
    color:white;
    margin: 4px 4px;
  }
  
}
.but2{
    display:inline-block;
    border:1px solid #fff;
    border-radius:7px;
    font-weight:400px;
    width:120px;
    height:40px;
    float:right;
    background:#3b78b1;
    color:white;
    margin: 4px 4px;
  }
  .but22{
    display:inline-block;
    border:1px solid #fff;
    border-radius:7px;
    font-weight:400px;
    width:150px;
    height:40px;
    float:right;
    background:#3b78b1;
    color:white;
    margin: 4px 4px;
  }
  .but3{
    display:inline-block;
    border:1px solid #fff;
    border-radius:7px;
    font-weight:400px;
    width:180px;
    height:40px;
    float:right;
    background: #03fca5;
    color:white;
    margin: 4px 4px;
  }
 
`;
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import CreateEmployee from "./create_Employee/CreateEmployee";
import UpdateEmployee from "./update_Employee/UpdateEmployee";
import Empmore from "./employee_views/admin/moreEmployeeAction";
import Login from './Login_employee/login/login';
import AllEmployeeContainer from './employee_views/admin/AllEmployeeContainer';
import Signup from './Login_employee/Signup/signup';
import EditUser from './Login_employee/Userdashboad/Edituser';
import EmailVerify from './Emailverify/EmailVerify';
import AddRequest from './Login_employee/Userdashboad/SendRequest'

const AdminManager = () => {
   
    return (<React.Fragment>
        <Router>
            <Switch>
                <Route
                    path="/admin/employees/UpdateEmployee/:id"
                    component={(props) => (
                        <UpdateEmployee{...props} key={window.location.pathname} />
                    )}
                />
                 <Route
                    path="/admin/employees/moreEmployeeAction/"
                    component={(props) => (
                        <Empmore {...props} key={window.location.pathname} />
                    )}
                />
                <Route path="/admin/employees/CreateEmployee">
                    <CreateEmployee />
                </Route>
                
                <Route path="/admin/employees/login">
                    <Login />
                </Route>
                <Route path="/admin/employees/signup">
                    <Signup />
                </Route>
                <Route path="/admin/employees/UpdateEmployeeName/:id"
                    component={(props) => (
                        <EditUser {...props} key={window.location.pathname} />
                    )}
                />
           
                
                <Route path="/admin/employees/:id/verify/:token/">
                    <EmailVerify/>
                </Route>
                <Route path="/admin/employees/AddRequest">
                    <AddRequest/>
                </Route>
                <Route path="/">
                    <AllEmployeeContainer />
                </Route>
            </Switch>
        </Router>
    </React.Fragment>);
}

export default AdminManager;

import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import CreateEmployee from "./create_Employee/CreateEmployee";
import UpdateEmployee from "./update_Employee/UpdateEmployee";
import Empmore from "./employee_views/admin/moreEmployeeAction";

import AllEmployeeContainer from './employee_views/admin/AllEmployeeContainer';

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
                

                
                <Route path="/">
                    <AllEmployeeContainer />
                </Route>
            </Switch>
        </Router>
    </React.Fragment>);
}

export default AdminManager;

import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import AllemployeeContainer from '../employees/employee_views/user/AllForUser';
import Dashboad from '../employees/Login_employee/Userdashboad/Edituser';
const  UserContainer= () => {
  
    return (<React.Fragment>
     
            <Switch>
                <Route path="/">
                    <AllemployeeContainer />
                </Route> 
                
                <Route path="/users/Dashbord">
                    <Dashboad />
                </Route>     
            </Switch>
    </React.Fragment>);
}

export default UserContainer;
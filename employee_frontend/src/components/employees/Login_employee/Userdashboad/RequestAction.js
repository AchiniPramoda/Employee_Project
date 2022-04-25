import React from 'react';
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import axios from 'axios';

const RequestAction = (props) => {
    const history = useHistory();
    const request = props.request;

    // Function for delete request
    const deleteEmmpolyee = () => {
        Swal.fire({
            title: 'Are you want to reject request',
            text: "Note that ths process can not be revert.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Accept'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put(`http://localhost:8092/api/request/accept/${request._id}`)
                    .then(res => {
                        Swal.fire(
                            'Done!',
                            'Request Accept successfully!',
                            'success'
                        )
                        console.log(request)
                        props.updateContent();
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
    }
 // Function for delete request
 const RejectRequest = () => {
    Swal.fire({
        title: 'Are you want to reject request',
        text: "Note that ths process can not be revert.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
    }).then((result) => {

        if (result.isConfirmed) {
            axios.put(`http://localhost:8092/api/request/reject/${request._id}`)
                .then(res => {
                    Swal.fire(
                        'Done!',
                        'Employee deleted successfully!',
                        'success'
                    )
                    console.log(request)
                    props.updateContent();
                }).catch(err => {
                    console.log(err)
                })
        }
    })
}
    // Function for redirect
    let handleClick = (path) => {
        history.push(path);
    }

 if (request.status === true) {
    request.status("Accepted");
}
  
    
    return (<React.Fragment>
        <tr>
            
            <td>{request.title}</td>
            <th scope="row">{request.email}</th>
            <td>{request.description}</td>
            <td>{request.status}</td>
     
        
              { !props.isGen ?<td>
                    
                    <button onClick={deleteEmmpolyee} type="button" class="btn btn-success m-">Accept Request</button>
                    <button onClick={RejectRequest} type="button" class="btn btn-danger m-1">Reject Request</button>
                    
                </td> : <React.Fragment />
    }
        </tr>
    
    </React.Fragment>);
}

export default RequestAction;
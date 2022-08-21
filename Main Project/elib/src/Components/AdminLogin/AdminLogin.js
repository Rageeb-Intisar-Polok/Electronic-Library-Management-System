import React from 'react';
import { useHistory } from 'react-router';

const AdminLogin = () => {

    const history = useHistory();

    function handleLogin(){
        const adminPassword = document.getElementById('pass');
        console.log(adminPassword.value)

        if(adminPassword.value == 12345){
            history.push('/adminPanel')
        }
        else{
            alert("worng password")
        }
    }

    return (
        <div className="d-flex align-items-center container mt-5">
            <div className="col-md-6">
                <img className="rounded-circle" src="https://i.ibb.co/T02TH2n/logo.jpg" />
            </div>
            <div className="col-md-6">
                <h1>Admin Login</h1>
                        <form>
                            <div className="from-group pt-3" >
                                <input id="pass" type="password" className="form-control" placeholder="Enter Password" required/>
                            </div>
                        
                        </form>
                        <div className="pt-3">
                                <input onClick={handleLogin} type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </div>
        </div>
    );
};

export default AdminLogin;
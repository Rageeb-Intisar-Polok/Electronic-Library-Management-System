import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import "./login.css";
import "../history.js";

class Login extends Component {


    constructor(){
        super()
        this.sendData = this.sendData.bind(this);
        this.gotData = this.gotData.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      }



    sendData(gotid,gotpass) {
    
    
        Axios.post('http://localhost:5000/login', {
            id: gotid,
            pass : gotpass
        })
        setTimeout(() => { this.gotData(gotid); }, 500);
    }

    async gotData(gotid) {

        
        const config = {
            method: 'get',
            url: 'http://localhost:5000/checkLogin'
        }
    
        let res = await Axios(config)
    
        console.log(res.data);
    
        if(res.data==gotid){
            this.props.history.push('/menu')
        }
        else{
            alert("invalid id or password");
        }
    }
    




    handleLogin() {
        let submitedID = document.getElementById('id').value;
        let submitedPass = document.getElementById('pass').value;
        console.log(submitedID);

         let abc;


        this.sendData(submitedID  ,submitedPass);


    }

    render(){
        return (
            <div className="d-flex align-items-center container mt-5">
    
                <div className = "main">
    
                    <div className = "row mt-3">
    
                        <div className="col">
                            <div className =  "logo">
                                <img className="rounded-circle" src="https://i.ibb.co/T02TH2n/logo.jpg" />
                            </div>
                          
                        </div>
                        <div className="col">
    
                            <div className = "box">
    
                                <form onSubmit={this.handleLogin}>
    
                                    <div className = "row">
                                        <h3><b><i>Log In</i></b></h3>
                                    </div>
    
                                    <br/><br/>
    
                                    <div className = "row">
                                        <input id="id" type="text" className="form-control" placeholder="Enter ID" required />
                                    </div>
    
                                    <br/><br/>
    
                                    <div className = "row">
                                        <input id="pass" type="password" className="form-control" placeholder="Enter Password" required />
                                    </div>
    
                                    <br/><br/>
    
                                    <div className = "row">
    
                                        <div className = "mycol">
                                            {/* <input onClick={handleLogin} type="submit" className="btn" value="Login" /> */}
    
                                            <button onClick={this.handleLogin} type="button" className="btn" value="Login">Log In</button>
    
                                        </div>
                                    
                                    </div>
    
                                </form>
    
                            </div>
    
    
                         
                    </div>
    
                    </div>
    
    
                </div>
    
            </div>
        );
    }

    
};

export default withRouter(Login);
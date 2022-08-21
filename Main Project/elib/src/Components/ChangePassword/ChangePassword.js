import React, { useEffect, useState, Component } from 'react';
import ReactDOM from "react-dom";
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import "./ChangePassword.css";
import { getDefaultNormalizer } from '@testing-library/react';

import "../history.js";

class ChangePassword extends Component {

    constructor(){
        super();
        console.log("inside constructor");
        this.state = {id : 'yyy', chtml : ''};
        // this.new_Pass_Handle = this.new_Pass_Handle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.backend = this.backend.bind(this);
    }

    async componentDidMount(){
        
        const config = {
            method: 'get',
            url: 'http://localhost:5000/menu'
        }
    
        let abc = await Axios(config);
        console.log('found from back end : ',abc);
        this.setState({id : abc.data});

        if(abc.data=='yy'){

            setTimeout(() => { this.props.history.goBack(); }, 2000);
        }
       
    }

    async backend(fp,np){
        console.log(fp);
        console.log(np);
        Axios.post('http://localhost:5000/changePass1', {
            fp : fp,
            np : np
        });
        const config = {
            method: 'get',
            url: 'http://localhost:5000/changePass2'
        }
    
        let report = await Axios(config);
        if(report == 'changed'){
            alert("password changed successfully.");
        }
        else{
            alert("Invalid old password.");
        }
    }

    handleChange(){
        console.log("handle clicked");
        let fp = document.getElementById('current_password').value;
        let np = document.getElementById('new_password').value;
        let cp = document.getElementById('confirm_password').value;


        let s = 0,l=np.length;
        let a = false;
        let b = false;
        let c = false;
        let d = false;
        for(let i=0;i<l;i++){
            if(np[i]>='A'&&np[i]<='Z'){
                a=true;
            }
            if(np[i]>='a'&&np[i]<='z'){
                b = true;
            }
            if(np[i]>='0'&&np[i]<='9'){
                c = true;
            }
            if(np.length>=8){
                d = true;
            }
        }
        if(a&&b&&c&&d){
            console.log("they are true");
            console.log("state is set");
            if(np==cp){
                

                this.backend(fp,np);


            }
            else{
                alert("Confirm password is not same.");
            }
        }
        else{
            this.setState({chtml : ''});
            alert("New Password must contain an uppercase letter, a lowercase letter, a number, and at least of 8 character long. ");
        }
    }


    render(){

        if(this.state.id == 'yyy'){
            return(
                <div>
                    <h1>Wait for a while.....</h1>
                </div>
            )
        }
        else if(this.state.id == 'yy'){
            return (
                <div>
                    <h1>Access denied. Enter ID and Password. </h1>
                </div>
            );
        }
        else{
            return(
                 <div className="d-flex align-items-center container mt-5">
                    {/* <div> */}
                    <div className = "row">

                        <div className="col">
                            <div className =  "logo">
                                <img className="rounded-circle" src="https://i.ibb.co/T02TH2n/logo.jpg" />
                            </div>
  
                        </div>


                        <div className="col">

    

                            <div className = "box">

        
    

                                    <div className = "row">
                                        <h3><b><i>Change password</i></b></h3>
                                    </div>


                                    <br/> <br/>

                                    <div className = "row">
                                        <input id="current_password" type="password" className="form-control" placeholder="Enter current password" required />
                                    </div>

                                    <br/><br/>

                                    <div className = "row">
                                        <input id="new_password" type="password" className="form-control" placeholder="Enter new password" required />
                                        {/* <input id="new_password" type="password" onChange = {this.new_Pass_Handle} className="form-control" placeholder="Enter new password" required /> */}

                                    </div>

                                    <div className = "row">
                                        <p>Password must contain an uppercase letter, a lowercase letter, a number, and at least of 8 character long. </p>
                                    </div>
                                    

                                    <br/>

                                    <div className = "row">
                                        <input id="confirm_password" type="password" className ="form-control" placeholder="Enter confirm password" required />
                                        
                                    </div>

                                    <br/><br/>


                                    <div className = "row">

                                        <div className = "majed">
                


                                            <input onClick={this.handleChange} type="submit" className="btn" value="Change Password" />

                                            {/* <div dangerouslySetInnerHTML={{ __html: this.state.chtml }} /> */}
                                        </div>
                                    </div>
            


                            </div>


 
                        </div>


                    </div>

                </div>
            );
        }

    }

    
};

export default withRouter(ChangePassword);
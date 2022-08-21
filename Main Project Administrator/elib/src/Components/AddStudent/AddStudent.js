import { Container, Form, Button } from 'react-bootstrap';
import "./AddStudent.css";
import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { getDefaultNormalizer } from '@testing-library/react';

import "../history.js";





class AddStudent extends Component {




    constructor(){
        super();
        console.log("inside constructor");
        this.state = {id : 'yyy', deptHtml : "", selectValue : ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Set = this.Set.bind(this);
  //      this.collectDept = this.collectDept.bind(this);
    }


    async componentDidMount(){
        
        const config = {
            method: 'get',
            url: 'http://localhost:5000/menu'
        };
    
        let abc = await Axios(config);
        console.log('found from back end : ',abc);
        this.setState({id : abc.data});

        if(abc.data=='yy'){

            setTimeout(() => { this.props.history.goBack(); }, 2000);
        }
        else if(abc.data!='yyy'){


            let config = {
                method: 'get',
                url: 'http://localhost:5000/collectDeptNumber'
            };
            let number = await Axios(config);
            console.log("number is : ")
            console.log(number);


            config = {
                method: 'get',
                url: 'http://localhost:5000/collectDepts'
            };
            let cde = await Axios(config);

            console.log("depts are : ");
            console.log(cde);
         //   console.log()
            this.setState({deptHtml : cde.data});
        }
       
    }

  //  async collectDept(){
  //      console.log("collect dept");
  //  }


    Set() {
        return { __html: this.state.deptHtml };
    }

    handleSubmit(){

        const ID = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const dept = document.getElementById('dept').value;
        const lvl = document.getElementById('lvl').value;
        const trm = document.getElementById('trm').value;

        const password = "amarpassword";

        console.log(ID);
        console.log(name);
        console.log(dept);
        console.log(lvl);
        console.log(trm);

         const studentDetails = {ID, name, dept, lvl, trm, password};

             Axios.post('http://localhost:5000/addStudent_sendData',
             {   id : ID,
                 nm : name, 
                 dept : dept, 
                 lvl : lvl, 
                 trm : trm, 
                 pass : password
             }).then(()=>{
                 alert("passed to database")
             })

        
    }

    render(){

        if(this.state.id == 'yyy'){
            return(
                <div>
                    <h1>Wait for a while.....</h1>
                </div>
            )
        }
        else if (this.state.id == 'yy'){
            return (
                <div>
                    <h1>Access denied. Enter Password. </h1>
                </div>
            );
        }
        else{
            return(
                    <div className = "row">

                        <div className="col">
                            <div className =  "logo">
                                <img className="rounded-circle" src="https://i.ibb.co/T02TH2n/logo.jpg" />
                            </div>
                      
                        </div>

                        <div className="col">

                            <div className = "box">

                                {/* <form onSubmit={this.handleSubmit}> */}

                                    <div className = "row">
                                     <h3><b><i>Add Student</i></b></h3>
                                    </div>

                                    <br/><br/>

                                    <div className = "row">
                                     <input id="id" type="text" className="form-control" placeholder="Enter ID" required />
                                    </div>

                                 <br/><br/>

                                    <div className = "row">
                                        <input id="name" type="text" className="form-control" placeholder="Enter Name" required />
                                    </div>

                                    <br/><br/>

                                <div className = "row">
                                        {/* <input id="dept" type="text" className="form-control" placeholder="Enter Department" required /> */}
                                        <div className = "col abcd"><label className = "lbl">Select Dept : </label></div>
                                        <div className = "col abcd"><div dangerouslySetInnerHTML={{ __html: this.state.deptHtml }} /></div>
                                    </div>

                                    <br/><br/>

                                   <div className = "row">
                                        <div className = "col abcd"><label className = "lbl">Select Level : </label></div>
                                        <div className = "col abcd"><select id = "lvl"><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
                                    </div>

                                    <br/><br/>

                                    <div className = "row">
                                        <div className = "col abcd"><label className = "lbl">Select Term : </label></div>
                                        <div className = "col abcd"><select id = "trm"><option>i</option><option>ii</option></select></div>
                                    </div>

                                    <br/><br/>

                                    <div className = "row">

                                        <div className = "mycol">
                                            <input onClick={this.handleSubmit} type="submit" className="btn" value="Add" />
                                        </div>
                                
                                    </div>

                                {/* </form> */}

                            </div>


                     
                    </div>



                </div>
            );

        }
    }

    
}

export default withRouter(AddStudent);
import React, {useState, useEffect} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import "./AddStudent.css";

const AddStudent = () => {

    const handleSubmit = () => {

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

        // const submitReview = () =>{
             Axios.post('http://localhost:5000/addStudent',
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

    return (


        <div className = "row">

                    <div className="col">
                        <div className =  "logo">
                            <img className="rounded-circle" src="https://i.ibb.co/T02TH2n/logo.jpg" />
                        </div>
                      
                    </div>
                    <div className="col">

                        <div className = "box">

                            <form onSubmit={handleSubmit}>

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
                                    <input id="dept" type="text" className="form-control" placeholder="Enter Department" required />
                                </div>

                                <br/><br/>

                                <div className = "row">
                                    <input id="lvl" type="text" className="form-control" placeholder="Enter Level" required />
                                </div>

                                <br/><br/>

                                <div className = "row">
                                    <input id="trm" type="text" className="form-control" placeholder="Enter Term" required />
                                </div>

                                <br/><br/>

                                <div className = "row">

                                    <div className = "mycol">
                                        <input onClick={handleSubmit} type="submit" className="btn" value="Add" />
                                    </div>
                                
                                </div>

                            </form>

                        </div>


                     
                </div>



````````````</div>





    );
};

export default AddStudent;
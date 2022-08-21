import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import "./IssueBook.css";
import { getDefaultNormalizer } from '@testing-library/react';

import "../history.js";

class IssueBook extends Component {

    constructor(){
        super()
        console.log("inside constructor");
        this.Set = this.Set.bind(this);
        this.extraFun = this.extraFun.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {id : 'yyy', deptHtml : "", selectValue : ""};
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
        else{
            this.setState({id : abc.data});
        }
       
    }


    extraFun(dept,lvl,trm){
        console.log(dept);
        console.log(lvl);
        console.log(trm);
        console.log(this.state.id);
    }







    handleSubmit(){
        const dept = document.getElementById('dept').value;
        const lvl = document.getElementById('lvl').value;
        const trm = document.getElementById('trm').value;
        const ID = this.state.id;

        console.log(dept);
        console.log(lvl);
        console.log(trm);
        console.log(this.state.id);

    //    this.extraFun(dept,lvl,trm);

         const studentDetails = {ID,  dept, lvl, trm};

             Axios.post('http://localhost:5000/issueBookSentDetails',
             {   id : ID,
                 dept : dept, 
                 lvl : lvl, 
                 trm : trm
             }).then(()=>{
                 alert("passed to database")
             })

             this.props.history.push('/bookList');

        console.log("inside handlesubmit issue books");
     //   console.log(studentDetails);
        
    }











    Set() {
        return { __html: this.state.deptHtml };
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
            return(
                <div>
                    <h1>Access denied. Enter ID and Password. </h1>
                </div>
            );
        }
        else{
            console.log("inside render");
            console.log(this.state.id);
            return (
                
                <div className="d-flex align-items-center container mt-5">
                    <div className = "row">

                        <div className="col">
                            <div className =  "logo">
                                <img className="rounded-circle" src="https://i.ibb.co/T02TH2n/logo.jpg" />
                            </div>
  
                        </div>


                        <div className="col">

    

                            <div className = "box">

        
    

                                    <div className = "row">
                                        <h3><b><i>Issue Book</i></b></h3>
                                    </div>


                                    <br/> <br/>


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
                                            <input onClick={this.handleSubmit} type="submit" className="btn" value="See Books" />
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

export default withRouter(IssueBook);
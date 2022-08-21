import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import "./AddBook.css";
import { getDefaultNormalizer } from '@testing-library/react';

import "../history.js";

class AddBook extends Component {

    constructor(){
        super();
        console.log("inside constructor");
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.state = {id : 'yyy', deptHtml : "", selectValue : "", bookCover : null};
     //   this.state = {id : 'yyy', deptHtml : "", selectValue : ""};
    }


    handleSubmit(e){

        e.preventDefault();

        const data = new FormData();
        

        console.log("inside addbook handle submit");
    //    let book_no = document.getElementById('book_no').value;
        let book_title = document.getElementById('book_title').value;
        let author = document.getElementById('author').value;
        let publisher = document.getElementById('publisher').value;
        let edition = document.getElementById('edition').value;
     //   let book_cover = null;
         let pages = document.getElementById('pagesr').value;
        let publication_year = document.getElementById('publication_year').value;
        let department = document.getElementById('dept').value;
        let quantity = document.getElementById('quantity').value;
        let level = document.getElementById('lvl').value;
        let term = document.getElementById('trm').value;
        console.log("inside handlesubmit");




      //  const [title,setTitle] = useState();






     //   console.log(this.state.bookCover);
        data.append('book_title',book_title);
        data.append('author',author);
        data.append('publisher',publisher);
        data.append('edition',edition);
        data.append('pages',pages);
        data.append('publication_year',publication_year);
        data.append('department',department);
        data.append('quantity',quantity);
        data.append('level',level);
        data.append('term',term);
        data.append('file',this.state.bookCover);

        console.log(data);

        Axios({
            method: "POST",
            url: "http://localhost:5000/upload",
            data: data,
          }).then((res) => {       
              alert(res.data.message);
          });



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

       
    }

    fileSelectedHandler = event =>{
        console.log("inside event");
        console.log(event);
        this.setState({
            bookCover : event.target.files[0]
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
                <div>
                    <div className = "row">

                        <div className="col">
                            <div className =  "logo">
                                <img className="rounded-circle" src="https://i.ibb.co/T02TH2n/logo.jpg" />
                            </div>
  
                        </div>


                        <div className="col">

    

                            <div className = "box">

        
                                <form onSubmit={this.handleSubmit}>

                                <div className = "row">
                                    <h3><b><i>ADD BOOK</i></b></h3>
                                </div>


                                <br/>

                                {/* <div className = "row">
                                    <input id="book_no" type="number" className="form-control" placeholder="book no" required />
                                </div> */}

            

                                <div className = "row">
                                    <input id="book_title" type="text" className="form-control" placeholder="book title" required />
                                </div>

            

                                <div className = "row">
                                    <input id="author" type="text" className="form-control" placeholder="author" required />
                                </div>

            

                                <div className = "row">
                                    <input id="publisher" type="text" className="form-control" placeholder="publisher" required />
                                </div>

            

                                <div className = "row">
                                    <input id="edition" type="text" className="form-control" placeholder="edition" required />
                                </div>

            
                                <div className = "row">
                                    <div className = "col abcd"><label className = "lbl">Cover Photo : </label></div>
                                    
                                    <div className = "col abcd"><input type="file" name="myImage" onChange = {this.fileSelectedHandler} id = "coverPhoto" multiple accept="image/*"/></div>
                                </div>

            
                                <div className = "row">
                                    <input id="pagesr" type="number" className="form-control" placeholder="pages" required />
                                </div>

            
                                <div className = "row">
                                    <input id="publication_year" type="number" className="form-control" placeholder="publication year" required />
                                </div>

            
                                <div className = "row">
                                    <div className = "col abcd"><label className = "lbl">Department  </label></div>
                                    <div className = "col abcd"><div dangerouslySetInnerHTML={{ __html: this.state.deptHtml }} /></div>
                                </div>

            
                                <div className = "row">
                                    <input id="quantity" type="number" className="form-control" placeholder="quantity" required />
                                </div>

            
                                <div className = "row">
                                        <div className = "col abcd"><label className = "lbl">Select Level : </label></div>
                                        <div className = "col abcd"><select id = "lvl"><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
                                </div>

                                
                                <div className = "row">
                                        <div className = "col abcd"><label className = "lbl">Select Term : </label></div>
                                        <div className = "col abcd"><select id = "trm"><option>i</option><option>ii</option></select></div>
                                </div>

            
    

           

                                <div className = "row">

                                    <div className = "majed">
                
            
                                        <button type="submit" className="btn">Submit</button>
                                    </div>
                                </div>
            

                                </form>

                            </div>


 
                        </div>


                    </div>

                </div>
            );
        }

    }

    
}

export default withRouter(AddBook);
const express = require('express');
const app = express();
const mysql = require("mysql");
const bcrypt = require('bcrypt');

 const cors = require('cors');
 const bodyParser = require('body-parser');

 const multer = require('multer');
const { config } = require('nodemon');
 //const router = require('router');

 app.use(bodyParser.json());
 app.use(cors());


   a = 'yy';




 const db = mysql.createConnection({
     host: '127.0.0.1',
     user: 'root',
     password: 'g0(DenW1ngisaracket',
     database: 'elib'
 });


  db.connect((err)=>{
      if(err) { console.log("can not connect to mysql database, polok");
            console.log(err);
    }
      console.log("connected to mysql database, polok");



  });



  //var upload = multer({ dest: "./public/uploads/" });





                                                          // adminstrator





  app.post('/loginError',(req,res)=>{
    a = 'yy';
  });



  app.post('/login', (req,res)=>{
    
    console.log("                                                 inside post backend new");


    const Pass = req.body.pass;

   // console.log(Pass);



     a = Pass;


    
  });

  app.get('/checkLogin',(req,res)=>{
      console.log("                                               inside get backend new");
      console.log(a);
      res.send(a);
  });



  let add_id;
  let add_nm;
  let add_dept;
  let add_lvl;
  let add_trm;
  let add_pass;


  app.post('/addStudent_sendData', (req,res)=>{

    add_id = req.body.id;
    add_nm = req.body.nm;
    add_dept = req.body.dept;
    add_lvl = req.body.lvl;
    add_trm = req.body.trm;
    add_pass = req.body.pass;

    console.log("inside add student backend");

    AddStudentToDatabase();
    
  });

  async function AddStudentToDatabase(){

    console.log("function started addstudenttodatabase");

    hash_pass = await hashPassword (add_pass,10);

    console.log("hash pass process is finished.");
    console.log(hash_pass);

    console.log(add_id);


    const sqlInsert = "INSERT INTO student (id, name, dept, lvl, term, pass) values (?,?,?,?,?,?)";
    db.query(sqlInsert,[add_id,add_nm,add_dept,add_lvl,add_trm,hash_pass],(err,result)=>{
        console.log("send to database");
        if(err){
          console.log("error");
          console.log(err);
        }
        else{
          console.log("no error");
        }
    });
  }

  app.get('/menu',(req,res)=>{
    console.log("inside get backend menu");
    console.log(a);
    res.send(a);
  });





                                                                                                      //   from add student



  let number = 0;

  app.get('/collectDeptNumber',(req,res)=>{
    
   
    console.log("from add student for counting depts from database..");
    const toPass = `SELECT count( * ) as name FROM depts`;
  //  const toPass = `SELECT pass from student WHERE id = '180201100'`;
    db.query(toPass,(err,result)=>{
      console.log("inside counting dept numbers");
      console.log(result);
      number = result[0].name;
      console.log(number);
      let toSend = JSON.stringify(number);
      console.log(toSend);
      res.send(toSend);
      console.log("after sending number");
    });

    console.log("after the q block");


  });


  app.get('/collectDepts',(req,res)=>{



    console.log("from add student for collecting depts from database.. ");
    const sqlInsert = "SELECT name FROM depts";
    console.log(sqlInsert);
    db.query(sqlInsert,(err,result)=>{
      console.log("inside query of collecting depts....");
      console.log(result);

      let dept = "<select id = \"dept\"> ";


      for(i=0;i<number;i++){

        dept = dept.concat("<option value = \"");
        dept = dept.concat(result[i].name);
        dept = dept.concat("\">");
        dept = dept.concat(result[i].name);
        dept = dept.concat("</option>");

      }

      dept = dept.concat("</select>");

      console.log(dept);


      res.send(dept);
    });
  });





var upload = multer({ dest: "../../Main_Project_Documents/public/uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("inside post upload");
  console.log(req.file);
  console.log(req.file.originalname);
  const myJSON = JSON.stringify(req.file.originalname); 
  console.log(myJSON);
  try {    
    if (req.file) {

      title = req.body.book_title;
      author = req.body.author;
      publisher = req.body.publisher;
      edition = req.body.edition;
      pages = req.body.pages;
      year = req.body.publication_year;
      dept = req.body.department;
      quantity = req.body.quantity;
      level = req.body.level;
      term = req.body.term;

      console.log(req);
      console.log(year);
      console.log(dept);
      console.log(term);
      const sqlInsert = "INSERT INTO book (title, author, publisher, edition,  pages, publication_year, dept, Lvl, term, quantity,cover_picture) values (?,?,?,?,?,?,?,?,?,?,?)";

      console.log(sqlInsert)

      db.query(sqlInsert,[title,author,publisher,edition,pages,year,dept,level,term,quantity,req.file.filename],(err,result)=>{
            console.log("send to database");
            if(err){
              console.log("error on uploading book");
              console.log(err);
            }
            else{
              console.log("no error uploading book");
              let toPass = "SELECT book_no FROM book where title = ? AND author = ? AND publisher = ? AND edition = ? AND pages = ? AND publication_year = ? AND dept = ? AND Lvl = ? AND term = ?";
              db.query(toPass,[title,author,publisher,edition,pages,year,dept,level,term],(err,result1)=>{
                console.log("collecting book basic no.");
                console.log(result1[0].book_no);
                for(i=0;i<quantity;i++){
                  let newSql = "INSERT INTO all_book (basic_id, self_id,yes) values(?,?,?)";
                  db.query(newSql,[result1[0].book_no,i+1,0],(err,result2)=>{
                  //  console.log("inserting individual books");
                    if(err){
                      console.log("error on inserting individual books.");
                      console.log(err);
                    }
                    else{
                      console.log("inserted book ",i+1);
                    }
                  })
                }
                let message1 = "Book Uploaded successfully.\n      Basic id : "+result1[0].book_no+ "\n      Main id : 1 to "+i;
            //    console.log(message);
                res.send({
                  status: true,
                  message: message1
                });
              })
            }
        });





      
    } else {
      res.status(400).send({
        status: false,
        data: "File Not Found :(",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});



 






                                                                  // by default.
app.get('/', (req, res) => {
    res.send('Hello World! by default')
});

app.listen(5000, () => {
    console.log('Listening on port 5000')
  });






                                                              // hashing password.




   async function hashPassword (password, saltRounds = 10){

    console.log("inside hashing process");

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash password
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }

    // Return null if error
    return null;
};
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddStudent from './Components/AddStudent/AddStudent';
import AddBook from './Components/AddBook/AddBook';
import Menu from './Components/AdminMenu/Menu';
import AddBatch from './Components/AddBatch/AddBatch';
import ReceiveBook from './Components/ReceiveBook/ReceiveBook';
import ViewStudent from './Components/ViewStudent/ViewStudent';

function App() {
  return (
    <div>
      {/* <h1>Hello</h1>
      <Login></Login>
      <AdminLogin></AdminLogin> */}

      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/checkLogin">
            <Login></Login>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/addStudent">
            <AddStudent></AddStudent>
          </Route>
          <Route path="/addBook">
            <AddBook></AddBook>
          </Route>
          <Route path="/menu">
            <Menu></Menu>
          </Route>
          <Route path="/addBatch">
            <AddBatch></AddBatch>
          </Route>
          <Route path="/viewStudent">
            <ViewStudent></ViewStudent>
          </Route>
          <Route path="/receiveBook">
            <ReceiveBook></ReceiveBook>
          </Route>



        <Route exact path="/">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

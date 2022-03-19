import logo from './logo.svg';
import './App.css';
import React from 'react';
import ListRequest from './expense/ListRequest';
import RequestForm from './expense/RequestForm';
import ReviewForm from './expense/ReviewForm';
import AmendForm from './expense/AmendForm';
import {
  useParams,
  BrowserRouter,
  Routes,
  Link,
  Route
} from "react-router-dom";


function ShowReview(){
  let {id, taskId} = useParams();
  return <ReviewForm id={id} taskId={taskId}/>;
}

function ShowAmend(){
  let {id, taskId} = useParams();
  return <AmendForm id={id} taskId={taskId}/>;
}

function App() {
  return (
    <BrowserRouter>
      <div class="row">
          <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/apply">Apply Expense Request</Link>
                </li>
              </ul>
            </div>
          </nav>
      
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          
            <Routes>
              <Route path='/' element={<ListRequest/>}></Route>
              <Route path='/apply' element={<RequestForm/>}></Route>
              <Route path='/review/:id/:taskId' element={<ShowReview/>}></Route>
              <Route path='/amend/:id/:taskId' element={<ShowAmend/>}></Route>
            </Routes>
          
          </main>
          
      </div>
    </BrowserRouter>
  );
}

export default App;

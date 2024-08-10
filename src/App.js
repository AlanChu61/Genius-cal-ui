import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeacherList from './components/TeacherList';
import AddTeacher from './components/AddTeacher';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import TeacherDetail from './components/TeacherDetail';
import StudentDetail from './components/StudentDetail';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">Teacher Salary Management System</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/teachers">
                    <div className="text-center">
                      <i className="bi bi-person-badge fs-1"></i><br />
                      老师
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/students">
                    <div className="text-center">
                      <i className="bi bi-people fs-1"></i><br />
                      学生
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/class_records">
                    <div className="text-center">
                      <i className="bi bi-book fs-1"></i><br />
                      课程
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <div className="text-center">
                      <i className="bi bi-box-arrow-in-right fs-1"></i><br />
                      登录
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<h1 className="text-center mt-4">Genius-Calculator</h1>} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/:id" element={<TeacherDetail />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/login" element={<Login />} />
        </Routes>


      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeacherList from './components/TeacherList';
import AddTeacher from './components/AddTeacher';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import TeacherDetail from './components/TeacherDetail';
import StudentDetail from './components/StudentDetail';
import AddClassRecords from './components/AddClassRecords';
import ClassRecords from './components/ClassRecords';
import TeacherRates from './components/TeacherRates'; // 引入 TeacherRates 组件
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">Teacher Salary Management System</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
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
                      <i class="bi bi-people fs-1"></i><br />
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
                  <Link className="nav-link" to="/teacher_rates">
                    <div className="text-center">
                      <i className="bi bi-currency-exchange fs-1"></i><br />
                      课时费
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
          <Route path="/class_records" element={<ClassRecords />} />
          <Route path="/add-class-records" element={<AddClassRecords />} />
          <Route path="/teacher_rates" element={<TeacherRates />} /> {/* TeacherRates 页面 */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
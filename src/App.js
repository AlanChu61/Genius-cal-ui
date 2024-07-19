import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeacherList from './components/TeacherList';
import AddTeacher from './components/AddTeacher';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import TeacherDetail from './components/TeacherDetail';
import StudentDetail from './components/StudentDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/teachers">Teachers</Link></li>
            <li><Link to="/students">Students</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Teacher Salary Management System</h1>} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/:id" element={<TeacherDetail />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/add-student" element={<AddStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

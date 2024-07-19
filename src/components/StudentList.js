import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/students/');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        <Link to={`/students/${student.id}`}>{student.name} - {student.subject}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/teachers/');
                console.log('Teachers:', response.data);
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers', error);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div>
            <h2>Teacher List</h2>
            <ul>
                {teachers.map((teacher) => (
                    <li key={teacher.id}>
                        <Link to={`/teachers/${teacher.id}`}>{teacher.name} - {teacher.mode}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeacherList;

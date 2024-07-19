import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StudentDetail() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [classRecords, setClassRecords] = useState([]);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/students/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student', error);
            }
        };

        const fetchClassRecords = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/class_records?student_id=${id}`);
                setClassRecords(response.data);
            } catch (error) {
                console.error('Error fetching class records', error);
            }
        };

        fetchStudent();
        fetchClassRecords();
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{student.name}'s Class Records</h2>
            <ul>
                {classRecords.map((record) => (
                    <li key={record.id}>{record.subject} - {record.date} - {record.hours} hours</li>
                ))}
            </ul>
        </div>
    );
}

export default StudentDetail;

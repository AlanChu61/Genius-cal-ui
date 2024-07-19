import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TeacherDetail() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [classRecords, setClassRecords] = useState([]);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/teachers/${id}`);
                setTeacher(response.data);
            } catch (error) {
                console.error('Error fetching teacher', error);
            }
        };

        const fetchClassRecords = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/class_records?teacher_id=${id}`);
                setClassRecords(response.data);
            } catch (error) {
                console.error('Error fetching class records', error);
            }
        };

        fetchTeacher();
        fetchClassRecords();
    }, [id]);

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{teacher.name}'s Class Records</h2>
            <ul>
                {classRecords.map((record) => (
                    <li key={record.id}>{record.subject} - {record.date} - {record.hours} hours</li>
                ))}
            </ul>
        </div>
    );
}

export default TeacherDetail;

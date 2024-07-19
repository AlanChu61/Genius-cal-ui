import React, { useState } from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';

function AddClassRecord() {
    const [teacherId, setTeacherId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState(moment());
    const [hours, setHours] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/class_records', {
                teacher_id: parseInt(teacherId),
                student_id: parseInt(studentId),
                subject,
                date: date.toISOString(),
                hours: parseFloat(hours),
            });
            setTeacherId('');
            setStudentId('');
            setSubject('');
            setDate(moment());
            setHours('');
        } catch (error) {
            console.error('Error adding class record', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Teacher ID:
                <input type="number" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} />
            </label>
            <br />
            <label>
                Student ID:
                <input type="number" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
            </label>
            <br />
            <label>
                Subject:
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </label>
            <br />
            <label>
                Date:
                <Datetime value={date} onChange={(val) => setDate(val)} />
            </label>
            <br />
            <label>
                Hours:
                <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} />
            </label>
            <br />
            <button type="submit">Add Class Record</button>
        </form>
    );
}

export default AddClassRecord;

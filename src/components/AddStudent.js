import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [totalHours, setTotalHours] = useState('');
    const [remainingHours, setRemainingHours] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/students', {
                name,
                subject,
                total_hours: parseFloat(totalHours),
                remaining_hours: parseFloat(remainingHours),
            });
            setName('');
            setSubject('');
            setTotalHours('');
            setRemainingHours('');
        } catch (error) {
            console.error('Error adding student', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Subject:
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </label>
            <br />
            <label>
                Total Hours:
                <input type="number" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} />
            </label>
            <br />
            <label>
                Remaining Hours:
                <input type="number" value={remainingHours} onChange={(e) => setRemainingHours(e.target.value)} />
            </label>
            <br />
            <button type="submit">Add Student</button>
        </form>
    );
}

export default AddStudent;

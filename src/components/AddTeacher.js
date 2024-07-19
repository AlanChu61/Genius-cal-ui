import React, { useState } from 'react';
import axios from 'axios';

function AddTeacher() {
    const [name, setName] = useState('');
    const [mode, setMode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/teachers', {
                name,
                mode,
            });
            setName('');
            setMode('');
        } catch (error) {
            console.error('Error adding teacher', error);
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
                Mode:
                <input type="text" value={mode} onChange={(e) => setMode(e.target.value)} />
            </label>
            <br />
            <button type="submit">Add Teacher</button>
        </form>
    );
}

export default AddTeacher;

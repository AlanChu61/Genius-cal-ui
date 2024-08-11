import React, { useState } from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';

function AddClassRecords() {
    // 模拟教师和学生的数据
    const mockTeachers = [
        { id: 1, name: '胡小明' },
        { id: 2, name: '张三丰' },
        { id: 3, name: '李四' }
    ];

    const mockStudents = [
        { id: 1, name: '林小小' },
        { id: 2, name: '张大国' },
        { id: 3, name: '王小二' }
    ];

    const [records, setRecords] = useState([{ teacherId: mockTeachers[0].id, studentId: mockStudents[0].id, subject: '', date: moment(), hours: '' }]);

    const handleRecordChange = (index, field, value) => {
        const newRecords = [...records];
        newRecords[index][field] = value;
        setRecords(newRecords);
    };

    const handleAddRecord = () => {
        setRecords([...records, { teacherId: mockTeachers[0].id, studentId: mockStudents[0].id, subject: '', date: moment(), hours: '' }]);
    };

    const handleRemoveRecord = (index) => {
        const newRecords = records.filter((_, i) => i !== index);
        setRecords(newRecords);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Promise.all(records.map(record =>
                axios.post('http://127.0.0.1:8000/class_records', {
                    teacher_id: parseInt(record.teacherId),
                    student_id: parseInt(record.studentId),
                    subject: record.subject,
                    date: record.date.toISOString(),
                    hours: parseFloat(record.hours),
                })
            ));
            setRecords([{ teacherId: mockTeachers[0].id, studentId: mockStudents[0].id, subject: '', date: moment(), hours: '' }]);
        } catch (error) {
            console.error('Error adding class records', error);
        }
    };

    return (
        <div>
            <h2>批量添加课程记录</h2>
            <form onSubmit={handleSubmit}>
                {records.map((record, index) => (
                    <div key={index} className="mb-4">
                        <label>
                            Teacher:
                            <select value={record.teacherId} onChange={(e) => handleRecordChange(index, 'teacherId', e.target.value)}>
                                {mockTeachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label>
                            Student:
                            <select value={record.studentId} onChange={(e) => handleRecordChange(index, 'studentId', e.target.value)}>
                                {mockStudents.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label>
                            Subject:
                            <input type="text" value={record.subject} onChange={(e) => handleRecordChange(index, 'subject', e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Date:
                            <Datetime value={record.date} onChange={(val) => handleRecordChange(index, 'date', val)} />
                        </label>
                        <br />
                        <label>
                            Hours:
                            <input type="number" value={record.hours} onChange={(e) => handleRecordChange(index, 'hours', e.target.value)} />
                        </label>
                        <br />
                        <button type="button" onClick={() => handleRemoveRecord(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddRecord}>Add Another Record</button>
                <br /><br />
                <button type="submit">Submit All Records</button>
            </form>
        </div>
    );
}

export default AddClassRecords;
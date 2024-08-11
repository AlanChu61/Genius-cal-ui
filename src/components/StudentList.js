import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentList() {
    // 模拟学生数据
    const mockStudents = [
        {
            id: 1,
            name: '李小明',
            grade: '12年级',
            timezone: 'GMT+8',
            mode: '在线',
            school: '华南中学',
            notes: '对数学有特别兴趣，需特别关注。',
            subjects: ['数学', '物理']
        },
        {
            id: 2,
            name: '王大力',
            grade: '11年级',
            timezone: 'GMT+8',
            mode: '线下',
            school: '北方高中',
            notes: '化学基础较弱，需要多加练习。',
            subjects: ['化学', '生物']
        },
        {
            id: 3,
            name: '张三',
            grade: '10年级',
            timezone: 'GMT+8',
            mode: '在线',
            school: '东城区一中',
            notes: '英语表达能力较强，适合小组讨论。',
            subjects: ['英语', '历史']
        },
    ];

    const [students, setStudents] = useState([]);

    useEffect(() => {
        // 模拟从后端获取数据
        setStudents(mockStudents);
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">学生</h2>
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="搜索学生..."
                />
                <Link to="/add-student" className="btn btn-success">新增学生</Link>
            </div>

            <div className="row">
                {students.map((student) => (
                    <div className="col-md-4 mb-3" key={student.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <Link
                                    to={`/students/${student.id}`}
                                    state={{ student }} // 使用 state 属性传递学生信息
                                    className="btn btn-outline-primary mb-3 w-100"
                                >
                                    检视
                                </Link>
                                <h5 className="card-title">{student.name}</h5>
                                <p className="card-text"><strong>年级:</strong> {student.grade}</p>
                                <p className="card-text"><strong>模式:</strong> {student.mode}</p>
                                <p className="card-text"><strong>学校:</strong> {student.school}</p>
                                <p className="card-text"><strong>科目:</strong></p>
                                <ul>
                                    {student.subjects.map((subject, index) => (
                                        <li key={index}>{subject}</li>
                                    ))}
                                </ul>
                                <p className="card-text"><strong>备注:</strong> {student.notes}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentList;
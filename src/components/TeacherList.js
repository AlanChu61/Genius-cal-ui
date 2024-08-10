import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherList() {
    // 模拟教师数据
    const mockTeachers = [
        {
            id: 1,
            name: '胡小明',
            mode: '在线',
            specialization: '数学',
            email: 'huxiaoming@example.com',
            timezone: 'GMT+8',
            paymentMethod: '微信',
            students: ['学生A', '学生B', '学生C']
        },
        {
            id: 2,
            name: '张三丰',
            mode: '线下',
            specialization: '物理',
            email: 'zhangsanfeng@example.com',
            timezone: 'GMT+8',
            paymentMethod: '支付宝',
            alipayNumber: '123456789',
            students: ['学生D', '学生E']
        },
        {
            id: 3,
            name: '李四',
            mode: '在线',
            specialization: '化学',
            email: 'lisi@example.com',
            timezone: 'GMT+8',
            paymentMethod: '交给 Coco',
            students: ['学生F']
        },
    ];

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        // 模拟从后端获取数据
        setTeachers(mockTeachers);
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">教师</h2>
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="搜索教师..."
                />
                <Link to="/add-teacher" className="btn btn-success">新增教师</Link>
            </div>

            <div className="row">
                {teachers.map((teacher) => (
                    <div className="col-md-4 mb-3" key={teacher.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <Link
                                    to={`/teachers/${teacher.id}`}
                                    state={{ teacher }} // 使用 state 属性传递教师信息
                                    className="btn btn-outline-primary mb-3 w-100"
                                >
                                    检视
                                </Link>
                                <h5 className="card-title">{teacher.name}</h5>
                                <p className="card-text"><strong>模式:</strong> {teacher.mode}</p>
                                <p className="card-text"><strong>专业科目:</strong> {teacher.specialization}</p>
                                <p className="card-text"><strong>学生列表:</strong></p>
                                <ul>
                                    {teacher.students.map((student, index) => (
                                        <li key={index}>{student}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeacherList;
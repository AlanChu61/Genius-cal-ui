import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherDetail() {
    const location = useLocation();
    const { teacher } = location.state || {}; // 通过 location.state 获取教师信息

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="fw-bold mb-4">{teacher.name} 的课程记录</h2>
            <div className="card mb-4 shadow-sm">
                <div className="card-header">
                    <h4>教师信息</h4>
                </div>
                <div className="card-body">
                    <p><strong>姓名:</strong> {teacher.name}</p>
                    <p><strong>模式:</strong> {teacher.mode}</p>
                    <p><strong>专业科目:</strong> {teacher.specialization}</p>
                    <p><strong>邮箱:</strong> {teacher.email}</p>
                    <p><strong>时区:</strong> {teacher.timezone}</p>
                    <p><strong>付款方式:</strong> {teacher.paymentMethod}</p>
                    {teacher.paymentMethod === '支付宝' && (
                        <p><strong>支付宝账号:</strong> {teacher.alipayNumber}</p>
                    )}
                </div>
            </div>

            <h4>课程记录</h4>
            <ul className="list-group">
                {teacher.students.map((student, index) => (
                    <li key={index} className="list-group-item">
                        <strong>{student}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeacherDetail;
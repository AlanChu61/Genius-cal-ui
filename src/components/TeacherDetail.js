import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherDetail() {
    const location = useLocation();
    const { teacher } = location.state || {}; // 通过 location.state 获取教师信息

    // 模拟课程记录数据
    const mockClassRecords = [
        {
            id: 1,
            courseName: '微积分',
            student: '林小小',
            time: '星期一 17:00',
            duration: 2,
            hoursCompleted: 2,
            hoursPending: 0,
            financialConfirmed: true,
        },
        {
            id: 2,
            courseName: '微积分',
            student: '张大国',
            time: '星期一 17:00',
            duration: 2,
            hoursCompleted: 0,
            hoursPending: 2,
            financialConfirmed: false,
        },
        // 更多课程记录...
    ];

    if (!teacher) {
        return <div>Loading...</div>;
    }

    // 计算汇总信息
    const totalCompletedHours = mockClassRecords.reduce((acc, record) => acc + record.hoursCompleted, 0);
    const totalPendingSalary = 1000; // 模拟的未结薪水总额

    return (
        <div className="container mt-4">
            {/* 部分 1: 教师的基本信息 */}
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

            {/* 部分 2: 课程记录表格和汇总信息 */}
            <div className="d-flex justify-content-between mb-4">
                <h4>课程记录</h4>
                <div>
                    <Link to="/edit-content" className="btn btn-primary me-2">用户更改内容</Link>
                    <Link to="/add-course" className="btn btn-primary">新增课程</Link>
                </div>
            </div>

            <table className="table table-bordered text-center">
                <thead className="table-light">
                    <tr>
                        <th>课名</th>
                        <th>学生</th>
                        <th>时间</th>
                        <th>时长</th>
                        <th>已上 (小时)</th>
                        <th>未上 (小时)</th>
                        <th>财务确认</th>
                    </tr>
                </thead>
                <tbody>
                    {mockClassRecords.map((record) => (
                        <tr key={record.id}>
                            <td>{record.courseName}</td>
                            <td>{record.student}</td>
                            <td>{record.time}</td>
                            <td>{record.duration} hr</td>
                            <td>{record.hoursCompleted} hr</td>
                            <td>{record.hoursPending} hr</td>
                            <td>
                                {record.financialConfirmed ? (
                                    <i className="bi bi-check-lg text-success"></i>
                                ) : (
                                    <i className="bi bi-x-lg text-danger"></i>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <p><strong>已上总课时:</strong> {totalCompletedHours} hr</p>
                <p><strong>未结薪水:</strong> {totalPendingSalary} 元</p>
            </div>
        </div>
    );
}

export default TeacherDetail;
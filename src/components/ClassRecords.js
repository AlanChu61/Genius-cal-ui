import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 引入 Link 组件
import moment from 'moment';

function ClassRecords() {
    // 模拟课程记录数据
    const allRecords = [
        {
            id: 1,
            teacherId: 1,
            studentId: 1,
            subject: '微积分',
            date: '2024-08-01T10:00:00Z',
            hours: 2,
        },
        {
            id: 2,
            teacherId: 2,
            studentId: 2,
            subject: '物理',
            date: '2024-08-02T14:00:00Z',
            hours: 1.5,
        },
        {
            id: 3,
            teacherId: 1,
            studentId: 3,
            subject: '化学',
            date: '2023-08-05T14:00:00Z',
            hours: 1,
        },
        {
            id: 4,
            teacherId: 3,
            studentId: 2,
            subject: '历史',
            date: '2023-07-16T09:00:00Z',
            hours: 1,
        },
        // 更多课程记录...
    ];

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

    const currentMonthStart = moment().startOf('month').subtract(1, 'month').date(16);
    const currentMonthEnd = moment().startOf('month').date(15);

    const currentMonthRecords = allRecords.filter(record => {
        const recordDate = moment(record.date);
        return recordDate.isBetween(currentMonthStart, currentMonthEnd, 'day', '[]');
    });

    const previousYearsRecords = allRecords.filter(record => {
        const recordDate = moment(record.date);
        return recordDate.isBefore(currentMonthStart);
    });

    const [showPreviousYears, setShowPreviousYears] = useState(false);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>当前月课程记录 (07-16 - 08-15)</h2>
                <Link to="/add-class-records" className="btn btn-success">新增课程记录</Link>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Teacher</th>
                        <th>Student</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMonthRecords.map((record) => (
                        <tr key={record.id}>
                            <td>{mockTeachers.find(t => t.id === record.teacherId).name}</td>
                            <td>{mockStudents.find(s => s.id === record.studentId).name}</td>
                            <td>{record.subject}</td>
                            <td>{moment(record.date).format('YYYY-MM-DD HH:mm')}</td>
                            <td>{record.hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-primary mt-4" onClick={() => setShowPreviousYears(!showPreviousYears)}>
                {showPreviousYears ? '隐藏往年数据' : '显示往年数据'}
            </button>

            {showPreviousYears && (
                <div>
                    <h2 className="mt-4">往年课程记录</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Teacher</th>
                                <th>Student</th>
                                <th>Subject</th>
                                <th>Date</th>
                                <th>Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {previousYearsRecords.map((record) => (
                                <tr key={record.id}>
                                    <td>{mockTeachers.find(t => t.id === record.teacherId).name}</td>
                                    <td>{mockStudents.find(s => s.id === record.studentId).name}</td>
                                    <td>{record.subject}</td>
                                    <td>{moment(record.date).format('YYYY-MM-DD HH:mm')}</td>
                                    <td>{record.hours}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ClassRecords;
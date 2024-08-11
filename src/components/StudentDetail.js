import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentDetail() {
    const location = useLocation();
    const { student } = location.state || {}; // 通过 location.state 获取学生信息

    // 模拟课程记录数据
    const mockClassRecords = [
        {
            id: 1,
            courseName: '微积分',
            teacher: '胡小明',
            time: '2024-07-18',
            duration: 2,
        },
        {
            id: 2,
            courseName: '物理',
            teacher: '张三丰',
            time: '2024-07-20',
            duration: 2,
        },
        {
            id: 3,
            courseName: '化学',
            teacher: '李四',
            time: '2024-08-10',
            duration: 1,
        },
        {
            id: 4,
            courseName: '历史',
            teacher: '王五',
            time: '2024-08-16',
            duration: 3,
        },
        // 更多课程记录...
    ];

    // 模拟报课、续课、剩余课时的记录数据
    const enrollmentRecords = [
        {
            id: 1,
            enrollmentDate: '2024-07-01',
            renewalDate: '2024-08-01',
            totalHours: 20,
            remainingHours: 12,
        },
        {
            id: 2,
            enrollmentDate: '2024-09-01',
            renewalDate: '2024-10-01',
            totalHours: 15,
            remainingHours: 10,
        },
        // 更多记录...
    ];

    if (!student) {
        return <div>Loading...</div>;
    }

    // 将课程记录按区间分组
    const groupRecordsByDateRange = (records) => {
        const grouped = {};

        records.forEach(record => {
            const date = new Date(record.time);
            let start, end;

            if (date.getDate() <= 15) {
                // 上一个月的16号到这个月的15号
                start = new Date(date.getFullYear(), date.getMonth() - 1, 16);
                end = new Date(date.getFullYear(), date.getMonth(), 15);
            } else {
                // 这个月的16号到下个月的15号
                start = new Date(date.getFullYear(), date.getMonth(), 16);
                end = new Date(date.getFullYear(), date.getMonth() + 1, 15);
            }

            const rangeKey = `${start.getFullYear()} ${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')} - ${end.getFullYear()} ${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;

            if (!grouped[rangeKey]) {
                grouped[rangeKey] = { records: [], totalHours: 0 };
            }

            grouped[rangeKey].records.push(record);
            grouped[rangeKey].totalHours += record.duration;
        });

        return grouped;
    };

    const recordsByPeriod = groupRecordsByDateRange(mockClassRecords);

    return (
        <div className="container mt-4">
            {/* 部分 1: 学生的基本信息和编辑按钮 */}
            <h2 className="fw-bold mb-4">{student.name} 的课程记录</h2>
            <div className="card mb-4 shadow-sm">
                <div className="card-header d-flex justify-content-between">
                    <h4>学生信息</h4>
                    <Link to={`/edit-student/${student.id}`} state={{ student }} className="btn btn-warning">编辑学生信息</Link>
                </div>
                <div className="card-body">
                    <p><strong>姓名:</strong> {student.name}</p>
                    <p><strong>年级:</strong> {student.grade}</p>
                    <p><strong>模式:</strong> {student.mode}</p>
                    <p><strong>学校:</strong> {student.school}</p>
                    <p><strong>时区:</strong> {student.timezone}</p>
                    <p><strong>备注:</strong> {student.notes}</p>
                </div>
            </div>

            {/* 部分 2: 报课、续课、剩余课时记录 */}
            <h4>报课/续课/剩余课时记录</h4>
            <table className="table table-bordered text-center mb-4">
                <thead className="table-light">
                    <tr>
                        <th>报课日期</th>
                        <th>续课日期</th>
                        <th>总课时</th>
                        <th>剩余课时</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollmentRecords.map((record) => (
                        <tr key={record.id}>
                            <td>{record.enrollmentDate}</td>
                            <td>{record.renewalDate}</td>
                            <td>{record.totalHours} hr</td>
                            <td>{record.remainingHours} hr</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 部分 3: 课程记录表格和汇总信息 */}
            <h4>课程记录</h4>

            {Object.keys(recordsByPeriod).map((period) => (
                <div key={period} className="mb-4">
                    <h5>{period} 总上课时数: {recordsByPeriod[period].totalHours} hr</h5>
                    <table className="table table-bordered text-center">
                        <thead className="table-light">
                            <tr>
                                <th>科目</th>
                                <th>教师</th>
                                <th>上课时数</th>
                                <th>上课日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recordsByPeriod[period].records.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.courseName}</td>
                                    <td>{record.teacher}</td>
                                    <td>{record.duration} hr</td>
                                    <td>{record.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default StudentDetail;
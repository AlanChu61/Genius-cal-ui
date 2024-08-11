import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherDetail() {
    const location = useLocation();
    const { teacher } = location.state || {}; // 通过 location.state 获取教师信息
    const navigate = useNavigate(); // 用于导航到其他页面

    // 模拟课程记录数据
    const mockClassRecords = [
        {
            id: 1,
            courseName: '微积分',
            student: '林小小',
            time: '2024-07-18',
            duration: 2,
        },
        {
            id: 2,
            courseName: '微积分',
            student: '张大国',
            time: '2024-07-20',
            duration: 2,
        },
        {
            id: 3,
            courseName: '线性代数',
            student: '王小二',
            time: '2024-08-10',
            duration: 1,
        },
        {
            id: 4,
            courseName: '物理',
            student: '李四',
            time: '2024-08-16',
            duration: 3,
        },
        // 更多课程记录...
    ];

    if (!teacher) {
        return <div>Loading...</div>;
    }

    const handleViewRates = () => {
        // 跳转到 TeacherRates 页面，并传递教师姓名作为搜索条件
        navigate('/teacher_rates', { state: { searchTerm: teacher.name } });
    };

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
            {/* 部分 1: 教师的基本信息和编辑按钮 */}
            <h2 className="fw-bold mb-4">{teacher.name} 的课程记录</h2>
            <div className="card mb-4 shadow-sm">
                <div className="card-header d-flex justify-content-between">
                    <h4>教师信息</h4>
                    <Link to={`/edit-teacher/${teacher.id}`} state={{ teacher }} className="btn btn-warning">编辑教师信息</Link>
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

            <button className="btn btn-primary mb-4" onClick={handleViewRates}>
                查看课时费记录
            </button>

            {/* 部分 2: 课程记录表格和汇总信息 */}
            <h4>课程记录</h4>

            {Object.keys(recordsByPeriod).map((period) => (
                <div key={period} className="mb-4">
                    <h5>{period} 总上课时数: {recordsByPeriod[period].totalHours} hr</h5>
                    <table className="table table-bordered text-center">
                        <thead className="table-light">
                            <tr>
                                <th>学生</th>
                                <th>科目</th>
                                <th>上课时数</th>
                                <th>上课日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recordsByPeriod[period].records.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.student}</td>
                                    <td>{record.courseName}</td>
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

export default TeacherDetail;
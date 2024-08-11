import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherRates() {
    const location = useLocation();
    const initialSearchTerm = location.state?.searchTerm || ''; // 获取传递的教师姓名
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [rates, setRates] = useState([
        { id: 1, teacherName: '胡小明', subject: '数学', student: '林小小', hourlyRate: 200 },
        { id: 2, teacherName: '张三丰', subject: '物理', student: '张大国', hourlyRate: 220 },
        { id: 3, teacherName: '李四', subject: '化学', student: '王小二', hourlyRate: 210 },
    ]);
    const [newRate, setNewRate] = useState({ teacherName: '', subject: '', student: '', hourlyRate: '' });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRate({ ...newRate, [name]: value });
    };

    const handleAddRate = () => {
        setRates([...rates, { ...newRate, id: rates.length + 1 }]);
        setNewRate({ teacherName: '', subject: '', student: '', hourlyRate: '' });
    };

    useEffect(() => {
        // 自动执行搜索
        if (initialSearchTerm) {
            setSearchTerm(initialSearchTerm);
        }
    }, [initialSearchTerm]);

    const filteredRates = rates.filter(rate =>
        rate.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.student.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="fw-bold mb-4">教师课时费管理</h2>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="搜索教师、科目或学生..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>教师姓名</th>
                        <th>科目</th>
                        <th>学生</th>
                        <th>课时费 (元/小时)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRates.map(rate => (
                        <tr key={rate.id}>
                            <td>{rate.teacherName}</td>
                            <td>{rate.subject}</td>
                            <td>{rate.student}</td>
                            <td>{rate.hourlyRate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4 className="mt-4">新增教师课时费</h4>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="教师姓名"
                    name="teacherName"
                    value={newRate.teacherName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="科目"
                    name="subject"
                    value={newRate.subject}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="学生"
                    name="student"
                    value={newRate.student}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="课时费 (元/小时)"
                    name="hourlyRate"
                    value={newRate.hourlyRate}
                    onChange={handleInputChange}
                />
                <button className="btn btn-success" onClick={handleAddRate}>新增课时费</button>
            </div>
        </div>
    );
}

export default TeacherRates;
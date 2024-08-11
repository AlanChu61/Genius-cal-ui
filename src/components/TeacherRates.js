import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherRates() {
    const location = useLocation();
    const initialSearchTerm = location.state?.searchTerm || ''; // 获取传递的教师姓名
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [rates, setRates] = useState([]);
    const [newRate, setNewRate] = useState({ teacher_name: '', subject: '', student_name: '', salary_per_hour: '' });

    // 获取教师课时费列表
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/teacher_rates');
                setRates(response.data);
            } catch (error) {
                console.error('Error fetching rates:', error);
            }
        };

        fetchRates();

        // 自动执行搜索
        if (initialSearchTerm) {
            setSearchTerm(initialSearchTerm);
        }
    }, [initialSearchTerm]);

    // 更新表单输入值
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRate({ ...newRate, [name]: value });
    };

    // 添加新的教师课时费记录
    const handleAddRate = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/teacher_rates', newRate);
            setRates([...rates, response.data]);
            setNewRate({ teacher_name: '', subject: '', student_name: '', salary_per_hour: '' });
        } catch (error) {
            console.error('Error adding rate:', error);
        }
    };

    // 搜索过滤
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredRates = rates.filter(rate =>
        rate.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.student_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <td>{rate.teacher_name}</td>
                            <td>{rate.subject}</td>
                            <td>{rate.student_name}</td>
                            <td>{rate.salary_per_hour}</td>
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
                    name="teacher_name"
                    value={newRate.teacher_name}
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
                    placeholder="学生姓名"
                    name="student_name"
                    value={newRate.student_name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="课时费 (元/小时)"
                    name="salary_per_hour"
                    value={newRate.salary_per_hour}
                    onChange={handleInputChange}
                />
                <button className="btn btn-success" onClick={handleAddRate}>新增课时费</button>
            </div>
        </div>
    );
}

export default TeacherRates;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddTeacher() {
    const [name, setName] = useState('');
    const [mode, setMode] = useState('在线');
    const [education, setEducation] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('微信');
    const [alipayNumber, setAlipayNumber] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTeacher = {
            name,
            mode,
            education,
            specialization,
            email,
            paymentMethod,
            alipayNumber: paymentMethod === '支付宝' ? alipayNumber : null,
        };
        console.log('新增教师:', newTeacher);
        // 在此处添加代码，将 newTeacher 发送到后端保存
        // 例如：axios.post('http://127.0.0.1:8000/teachers/', newTeacher);

        // 提交后重定向回教师列表页面
        navigate('/teachers');
    };

    return (
        <div className="container mt-4">
            <h2 className="fw-bold mb-4">新增教师</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">姓名</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mode" className="form-label">教学模式</label>
                    <select
                        className="form-select"
                        id="mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                    >
                        <option value="在线">在线</option>
                        <option value="线下">线下</option>
                        <option value="都可">都可</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="education" className="form-label">学历</label>
                    <input
                        type="text"
                        className="form-control"
                        id="education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="specialization" className="form-label">科目</label>
                    <input
                        type="text"
                        className="form-control"
                        id="specialization"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">邮箱</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentMethod" className="form-label">付款方式</label>
                    <select
                        className="form-select"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="微信">微信</option>
                        <option value="支付宝">支付宝</option>
                        <option value="交给 Coco">交给 Coco</option>
                    </select>
                </div>
                {paymentMethod === '支付宝' && (
                    <div className="mb-3">
                        <label htmlFor="alipayNumber" className="form-label">支付宝账号</label>
                        <input
                            type="text"
                            className="form-control"
                            id="alipayNumber"
                            value={alipayNumber}
                            onChange={(e) => setAlipayNumber(e.target.value)}
                            required={paymentMethod === '支付宝'}
                        />
                    </div>
                )}
                <button type="submit" className="btn btn-success">保存</button>
            </form>
        </div>
    );
}

export default AddTeacher;
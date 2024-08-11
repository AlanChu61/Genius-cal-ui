import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditTeacher() {
    const location = useLocation();
    const { teacher } = location.state || {}; // 获取当前教师信息
    const navigate = useNavigate();

    // 使用教师信息初始化表单状态
    const [name, setName] = useState(teacher.name || '');
    const [mode, setMode] = useState(teacher.mode || '在线');
    const [specialization, setSpecialization] = useState(teacher.specialization || '');
    const [email, setEmail] = useState(teacher.email || '');
    const [timezone, setTimezone] = useState(teacher.timezone || '');
    const [paymentMethod, setPaymentMethod] = useState(teacher.paymentMethod || '微信');
    const [alipayNumber, setAlipayNumber] = useState(teacher.alipayNumber || '');

    const handleSave = () => {
        // 模拟保存教师信息，可以在这里进行后端 API 调用
        console.log('保存教师信息:', {
            name,
            mode,
            specialization,
            email,
            timezone,
            paymentMethod,
            alipayNumber: paymentMethod === '支付宝' ? alipayNumber : '',
        });
        // 保存后返回教师详情页面
        navigate(`/teachers/${teacher.id}`, { state: { teacher: { ...teacher, name, mode, specialization, email, timezone, paymentMethod, alipayNumber } } });
    };

    return (
        <div className="container mt-4">
            <h2 className="fw-bold mb-4">编辑教师信息</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">姓名</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="mode" className="form-label">模式</label>
                    <select className="form-select" id="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
                        <option value="在线">在线</option>
                        <option value="线下">线下</option>
                        <option value="都可">都可</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="specialization" className="form-label">专业科目</label>
                    <input type="text" className="form-control" id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">邮箱</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="timezone" className="form-label">时区</label>
                    <input type="text" className="form-control" id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentMethod" className="form-label">付款方式</label>
                    <select className="form-select" id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="微信">微信</option>
                        <option value="支付宝">支付宝</option>
                        <option value="交给 Coco">交给 Coco</option>
                    </select>
                </div>
                {paymentMethod === '支付宝' && (
                    <div className="mb-3">
                        <label htmlFor="alipayNumber" className="form-label">支付宝账号</label>
                        <input type="text" className="form-control" id="alipayNumber" value={alipayNumber} onChange={(e) => setAlipayNumber(e.target.value)} />
                    </div>
                )}
                <button type="button" className="btn btn-primary" onClick={handleSave}>保存</button>
            </form>
        </div>
    );
}

export default EditTeacher;
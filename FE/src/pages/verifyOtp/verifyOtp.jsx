import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './verifyOtp.module.css';
import button from '../../components/button/button.module.css';
import { verifyOtp } from '../../services/authServices';

const VerifyOtp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Verify OTP - Motspetits";
    }, []);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return; 

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault(); 
        const paste = e.clipboardData.getData('text').trim();
        if (/^\d{5}$/.test(paste)) {
            const newOtp = paste.split('');
            setOtp(newOtp); 
            setTimeout(() => {
                inputRefs.current[4]?.focus();
            }, 0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const otpCode = otp.join('');

        if (otpCode.length !== 5) {
            setError('Please enter full 5-digit OTP code.');
            return;
        }

        try {
            const data = await verifyOtp(otpCode, "ACCOUNT_VERIFICATION");
            console.log("Verify otp success", data);
            navigate('/login');
        } catch (e) {
            setError(e.message || "OTP verification failed");
        }
    };

    const setInputRef = (el, index) => {
        inputRefs.current[index] = el;
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div style={{ textAlign: 'center' }}>
                    <img src="/logo.png" className={styles.logo} alt="Logo" />
                    <div className={styles.title}>Please, enter your OTP Code</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                className={styles.otpInput}
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                ref={el => setInputRef(el, index)}
                            />
                        ))}
                    </div>
                    {error && (
                        <div className={styles.error}>{error}</div>
                    )}
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button type="submit" className={button.loginButton}>Verify</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
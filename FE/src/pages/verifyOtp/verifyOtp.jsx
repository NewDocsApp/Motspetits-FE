import { useEffect } from 'react';
import styles from './verifyOtp.module.css';
import button from '../../components/button/button.module.css';
const VerifyOtp = () => {

    useEffect(() => {
    document.title = "Motspetits";
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div style={{ textAlign: 'center'}}>
                    <img src="/logo.png" className={styles.logo} alt="Logo" />
                    <div className={styles.title}>Please, enter your OTP Code</div>
                </div>
                <div className={styles.input}>
                    <input type="number" className={styles.otpInput} />
                    <input type="number" className={styles.otpInput} />
                    <input type="number" className={styles.otpInput} />   
                    <input type="number" className={styles.otpInput} />
                    <input type="number" className={styles.otpInput} />
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button className={button.loginButton}>Verify</button>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;
import { useEffect, useState } from 'react';
import styles from './login.module.css';
import logo from '../assets/logo.png';
import authApi from '../apis/auth';
//import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../../contexts/AuthContext';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [popUp, setPopUp] = useState({show: false, message: '', success: false})

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await authApi.login({email, password})
      localStorage.setItem("accessToken", res.accessToken)
      setPopUp({ show: true, message: "Đăng nhập thành công", success: true })
      
    } catch (error) {
      setPopUp({ show: true, message: `Đăng nhập thất bại`, success: false })
    }
    setTimeout(() => setPopUp({...popUp, show: false}), 2000)
  }
  useEffect(() => {
    document.title = "Login - Motspetits";
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.shadow}>
        <div className={styles.card}>
          <div className={styles.title}>Welcome to Motspetits!</div>
          <div className={styles.signup}>New member?
            <a href="/signup" className={styles.link}>Sign up</a>
          </div>
        </div>
        <div className={styles["card-login"]}>
          <img src={logo} style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '140px'
          }} />
          <div className={styles["title-login"]}>LOGIN</div>
          <input type="text" placeholder="Email" className={styles.logintextbox} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder="Password" className={styles.logintextbox} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <label>
              <input type="checkbox"/>
              <span className={styles.remember}>Remember me</span>
            </label>
            <label className={styles.forgot}>Forgot password?</label>
          </div>
          <div>
            <button className={styles.loginButton} onClick={handleLogin}>Login</button>
            {popUp.show && (
              <div className={`${styles.popup} ${popUp.success ? styles.success : styles.error}`}>
                {popUp.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
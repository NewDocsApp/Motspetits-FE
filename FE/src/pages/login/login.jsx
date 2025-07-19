import { useEffect, useState } from 'react';
import styles from './login.module.css';
import logo from '/logo.png';
import textbox from '../../components/textbox/textbox.module.css';
import button from '../../components/button/button.module.css';
import { motion } from 'framer-motion';
import authApi from '../../apis/auth';
import { useNavigate } from 'react-router-dom';

//import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [popUp, setPopUp] = useState({show: false, message: '', success: false})
  useEffect(() => {
    document.title = "Login - Motspetits";
  }, []);
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await authApi.login({email, password})
      localStorage.setItem("accessToken", res.accessToken)
      console.log(res.accessToken);
      
      setPopUp({show: true, message: "Đăng nhập thành công", success: true })
      setTimeout(() => {
        setPopUp({...popUp, show: false})
        navigate("/")
      }, 1200)
    } catch (error) {
      setPopUp({ show: true, message: `Đăng nhập thất bại + ${error}`, success: false })
    }
    setTimeout(() => setPopUp({...popUp, show: false}), 2000)
  } 
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className={styles.container}
    >
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
            <input type="text" placeholder="Email" className={textbox.logintextbox} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" className={textbox.logintextbox} onChange={(e) => setPassword(e.target.value)}/>
            <div>
              <label>
                <input type="checkbox"/>
                <span className={styles.remember}>Remember me</span>
              </label>
              <label className={styles.forgot}>Forgot password?</label>
            </div>
            <div>
              <button className={button.loginButton} onClick={handleLogin}>Login</button>
              {popUp.show && (
                <div className={`${styles.popup} ${popUp.success ? styles.success : styles.error}`}>
                  {popUp.message}
                </div>
              )}
            </div>
          </div>
        </div>
    </motion.div>
  );
};
export default Login;
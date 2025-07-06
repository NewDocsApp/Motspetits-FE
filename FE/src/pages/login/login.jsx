import { useEffect } from 'react';
import styles from './login.module.css';
import logo from '../../../public/logo.png';
import textbox from '../../components/textbox/textbox.module.css';
import button from '../../components/button/button.module.css';
import { motion } from 'framer-motion';

//import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  useEffect(() => {
    document.title = "Login - Motspetits";
  }, []);

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
            <input type="text" placeholder="Username" className={textbox.logintextbox} />
            <input type="password" placeholder="Password" className={textbox.logintextbox} />
            <div>
              <label>
                <input type="checkbox"/>
                <span className={styles.remember}>Remember me</span>
              </label>
              <label className={styles.forgot}>Forgot password?</label>
            </div>
            <div>
              <button className={button.loginButton}>Login</button>
            </div>
          </div>
        </div>
    </motion.div>
  );
};
export default Login;
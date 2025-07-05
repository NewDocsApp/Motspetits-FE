import { useState } from 'react';
import styles from './login.module.css';
import logo from '../assets/logo.png';
//import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../../contexts/AuthContext';

const Login = () => {

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
          <input type="text" placeholder="Username" className={styles.logintextbox} />
          <input type="password" placeholder="Password" className={styles.logintextbox} />
          <div>
            <label>
              <input type="checkbox"/>
              <span className={styles.remember}>Remember me</span>
            </label>
            <label className={styles.forgot}>Forgot password?</label>
          </div>
          <div>
            <button className={styles.loginButton}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
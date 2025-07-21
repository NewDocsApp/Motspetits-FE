import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import logo from '/logo.png';
import textbox from '../../components/textbox/textbox.module.css';
import button from '../../components/button/button.module.css';
import { motion } from 'framer-motion';
import { login } from '../../services/authServices';

const Login = () => {
  useEffect(() => {
    document.title = "Login - Motspetits";
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password);
      console.log('Login success:', data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

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
          <div className={styles.signup}>
            New member? <a href="/signup" className={styles.link}>Sign up</a>
          </div>
        </div>

        <div className={styles["card-login"]}>
          <img src={logo} alt="Logo" style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '140px'
          }} />
          <div className={styles["title-login"]}>LOGIN</div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={textbox.logintextbox}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={textbox.logintextbox}
            />

            <div className={styles.options}>
              <label>
                <input type="checkbox" />
                <span className={styles.remember}>Remember me</span>
              </label>
              <label className={styles.forgot}>Forgot password?</label>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div>
              <button type="submit" className={button.loginButton}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

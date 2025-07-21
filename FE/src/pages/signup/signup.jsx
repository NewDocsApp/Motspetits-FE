import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import logo from '/logo.png';
import textbox from '../../components/textbox/textbox.module.css';
import button from '../../components/button/button.module.css';
import { motion } from 'framer-motion';
import { register } from '../../services/authServices';

const Signup = () => {
  useEffect(() => {
    document.title = "Sign Up - Motspetits";
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [cfPassword, setcfPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== cfPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      const data = await register(email, username, password, fullname);
      console.log('Register');
      navigate("/verifyOtp")
    }
    catch(err) {
      setError(err.message);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className={styles.container}
    >
        <div className={styles.card}>
            <div className={styles.row}>
            <img src={logo} className={styles.logo}></img>
            <a className={styles.title}>SIGN UP</a>
            </div>
            <form onSubmit={handleSubmit}  style={{ display: 'flex', justifyContent: 'center', gap: '10px' , flexDirection: 'column', alignItems: 'center'}}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className={textbox.logintextbox} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={textbox.logintextbox} />
                <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required className={textbox.logintextbox} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={textbox.logintextbox} />
                <input type="password" placeholder="Confirm Password" value={cfPassword} onChange={(e) => setcfPassword(e.target.value)} required className={textbox.logintextbox}/>
            
            {error && <div className={styles.error}>{error}</div>}
              <button type="submit" className={button.loginButton}>Sign Up</button>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                <span className={styles.text}>Already have an account? 
                    <a href="/login" className={styles.link}>Login</a>
                </span>
            </div>
        </div>
   </motion.div>
  );
};

export default Signup;
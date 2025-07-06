import { useEffect } from 'react';
import styles from './signup.module.css';
import logo from '/logo.png';
import textbox from '../../components/textbox/textbox.module.css';
import button from '../../components/button/button.module.css';
import { motion } from 'framer-motion';

const Signup = () => {
  useEffect(() => {
    document.title = "Sign Up - Motspetits";
  }, []);

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
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' , flexDirection: 'column', alignItems: 'center'}}>
                <input type="text" placeholder="Username" className={textbox.logintextbox} />
                <input type="email" placeholder="Email" className={textbox.logintextbox} />
                <input type="password" placeholder="Password" className={textbox.logintextbox} />
                <input type="password" placeholder="Confirm Password" className={textbox.logintextbox}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <button className={button.loginButton}>Sign Up</button>
            </div>
        
            
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
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          © 2025 Студенческий форум. Все права защищены.
        </div>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Помощь</a>
          <a href="#" className={styles.link}>О проекте</a>
          <a href="#" className={styles.link}>Контакты</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import Icon from '../Icon/Icon';
import styles from './Footer.module.css';

const Footer = ({ onAboutClick, onHelpClick, onContactsClick }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          © 2025 Студенческий форум. Все права защищены.
        </div>
        <div className={styles.links}>
          <button 
            className={styles.link}
            onClick={onHelpClick}
          >
            <Icon name="HelpCircle" size={14} />
            Помощь
          </button>
          <button 
            className={styles.link}
            onClick={onAboutClick}
          >
            <Icon name="Info" size={14} />
            О проекте
          </button>
          <button 
            className={styles.link}
            onClick={onContactsClick}
          >
            <Icon name="Mail" size={14} />
            Контакты
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
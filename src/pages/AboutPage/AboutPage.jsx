import React from 'react';
import Logo from '../../components/common/Logo/Logo';
import Icon from '../../components/common/Icon/Icon';
import styles from './AboutPage.module.css';

const AboutPage = ({onBack}) => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        {onBack && (
          <button className={styles.backButton} onClick={onBack}>
            <Icon name="ArrowLeft" size={18} />
            Назад
          </button>
        )}

        <div className={styles.header}>
          <Logo size={60} withText={false} />
          <h1>О проекте</h1>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>
              <Icon name="Info" size={24} />
              О Студенческом форуме
            </h2>
            <p>
              Студенческий форум — это современная образовательная платформа, 
              разработанная для улучшения взаимодействия между студентами и преподавателями.
            </p>
            <p>
              Наша цель — создать удобное пространство для общения, обмена знаниями 
              и организации учебного процесса.
            </p>
          </section>

          <section className={styles.section}>
            <h2>
              <Icon name="HelpCircle" size={24} />
              Помощь
            </h2>
            <div className={styles.faq}>
              <h3>Как присоединиться к группе?</h3>
              <p>Перейдите в раздел "Все группы", выберите нужную группу и нажмите "Вступить"</p>
              
              <h3>Как создать объявление?</h3>
              <p>Объявления могут создавать только преподаватели и администраторы групп</p>
              
              <h3>Где найти учебные материалы?</h3>
              <p>В разделе "Файлы" каждой группы хранятся все учебные материалы</p>

              <h3>Как изменить свою роль?</h3>
              <p>Для изменения роли с "Гость" на "Студент" или "Преподаватель" обратитесь на почту техподдержки</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2>
              <Icon name="Mail" size={24} />
              Контакты
            </h2>
            <div className={styles.contacts}>
              <div className={styles.contactItem}>
                <Icon name="User" size={16} />
                <span>Техническая поддержка: support@studentforum.ru</span>
              </div>
              <div className={styles.contactItem}>
                <Icon name="Building" size={16} />
                <span>МАИ (Национальный исследовательский университет)</span>
              </div>
              <div className={styles.contactItem}>
                <Icon name="Wrench" size={16} />
                <span>Разработчики: М8О-305Б-23</span>
              </div>
              <div className={styles.contactItem}>
                <Icon name="Github" size={16} />
                <span>GitHub: github.com/maezz3/StudentForum</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
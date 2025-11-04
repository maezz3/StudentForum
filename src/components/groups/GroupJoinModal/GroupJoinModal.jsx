import React, { useState } from 'react';
import styles from './GroupJoinModal.module.css';

const GroupJoinModal = ({ isOpen, group, onJoin, onClose }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !group) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (group.type === 'private' && !inviteCode.trim()) {
      alert('Для приватной группы требуется код приглашения');
      return;
    }

    setLoading(true);
    try {
      await onJoin(group.id, inviteCode.trim() || null);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Вступление в группу</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.groupInfo}>
            <div className={styles.groupAvatar}>
              {group.avatar ? (
                <img src={group.avatar} alt={group.title} />
              ) : (
                <span>{group.title.charAt(0)}</span>
              )}
            </div>
            <div className={styles.groupDetails}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <span className={`${styles.groupType} ${styles[group.type]}`}>
                {group.type === 'open' ? '🔓 Открытая группа' : '🔒 Приватная группа'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.joinForm}>
            {group.type === 'private' && (
              <div className={styles.formGroup}>
                <label htmlFor="inviteCode">Код приглашения *</label>
                <input
                  type="text"
                  id="inviteCode"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Введите код приглашения..."
                  className={styles.input}
                  required
                />
                <small className={styles.helpText}>
                  Попросите код приглашения у администратора группы
                </small>
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
                disabled={loading}
              >
                Отмена
              </button>
              <button
                type="submit"
                className={styles.joinButton}
                disabled={loading || (group.type === 'private' && !inviteCode.trim())}
              >
                {loading ? 'Вступление...' : 'Вступить в группу'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupJoinModal;
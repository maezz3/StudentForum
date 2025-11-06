import React, { useState } from 'react';
import FileGrid from '../FileGrid/FileGrid';
import FileUploadModal from '../FileUploadModal/FileUploadModal';
import CreateFolderModal from '../CreateFolderModal/CreateFolderModal';
import Icon from '../../common/Icon/Icon';
import styles from './FileBrowser.module.css';

const FileBrowser = ({ group }) => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Лекция 1 - Введение в БД.pdf',
      type: 'pdf',
      size: 2457600,
      uploaded_by: {
        id: 2,
        fullname: 'Мария Петрова',
        role: 'teacher'
      },
      uploaded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      folder: 'lectures',
      download_url: '#'
    },
    {
      id: 2,
      name: 'ЛР1 - Проектирование БД.docx',
      type: 'docx',
      size: 512000,
      uploaded_by: {
        id: 2,
        fullname: 'Мария Петрова',
        role: 'teacher'
      },
      uploaded_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      folder: 'labs',
      download_url: '#'
    },
    {
      id: 3,
      name: 'Мое задание ЛР1.zip',
      type: 'zip',
      size: 1024000,
      uploaded_by: {
        id: 1,
        fullname: 'Иван Иванов',
        role: 'student'
      },
      uploaded_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      folder: 'submissions',
      download_url: '#'
    },
    {
      id: 4,
      name: 'SQL Cheat Sheet.pdf',
      type: 'pdf',
      size: 153600,
      uploaded_by: {
        id: 4,
        fullname: 'Анна Козлова',
        role: 'student'
      },
      uploaded_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      folder: 'materials',
      download_url: '#'
    },
    {
      id: 5,
      name: 'Презентация проекта.pptx',
      type: 'pptx',
      size: 3670016,
      uploaded_by: {
        id: 3,
        fullname: 'Алексей Смирнов',
        role: 'student'
      },
      uploaded_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      folder: 'projects',
      download_url: '#'
    }
  ]);

  const [currentFolder, setCurrentFolder] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Папки для организации файлов
  const folders = [
    { id: 'all', name: 'Все файлы', icon: '📁', count: files.length },
    { id: 'lectures', name: 'Лекции', icon: '📚', count: files.filter(f => f.folder === 'lectures').length },
    { id: 'labs', name: 'Лабораторные', icon: '🔬', count: files.filter(f => f.folder === 'labs').length },
    { id: 'submissions', name: 'Сданные работы', icon: '📤', count: files.filter(f => f.folder === 'submissions').length },
    { id: 'projects', name: 'Проекты', icon: '💼', count: files.filter(f => f.folder === 'projects').length },
    { id: 'materials', name: 'Материалы', icon: '📎', count: files.filter(f => f.folder === 'materials').length }
  ];

  // Текущий пользователь (может быть как студентом, так и преподавателем)
  const currentUser = {
    id: 1,
    fullname: 'Иван Иванов',
    role: 'student'
  };

  const filteredFiles = files.filter(file => {
    const matchesFolder = currentFolder === 'all' || file.folder === currentFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleUploadFile = (fileData) => {
    const newFile = {
      ...fileData,
      id: Date.now(),
      uploaded_by: currentUser,
      uploaded_at: new Date().toISOString(),
      folder: currentFolder === 'all' ? 'materials' : currentFolder
    };
    setFiles(prev => [newFile, ...prev]);
  };

  const handleDeleteFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleCreateFolder = (folderName) => {
    // В реальном приложении здесь будет API вызов
    console.log('Creating folder:', folderName);
  };

  const getFolderInfo = () => {
    return folders.find(f => f.id === currentFolder) || folders[0];
  };

  return (
    <div className={styles.fileBrowser}>
      {/* Панель инструментов */}
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Поиск файлов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.createFolderButton}
            onClick={() => setIsCreateFolderModalOpen(true)}
          >
            <Icon name="FolderPlus" size={16} />
            Новая папка
          </button>
          <button 
            className={styles.uploadButton}
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Icon name="Upload" size={16} />
            Загрузить файл
          </button>
        </div>
      </div>

      <div className={styles.browserContent}>
        {/* Боковая панель с папками */}
        <div className={styles.sidebar}>
          <div className={styles.folderList}>
            {folders.map(folder => (
              <button
                key={folder.id}
                className={`${styles.folderItem} ${
                  currentFolder === folder.id ? styles.folderItemActive : ''
                }`}
                onClick={() => setCurrentFolder(folder.id)}
              >
                <span className={styles.folderIcon}>{folder.icon}</span>
                <span className={styles.folderName}>{folder.name}</span>
                <span className={styles.fileCount}>{folder.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Основная область с файлами */}
        <div className={styles.mainArea}>
          <div className={styles.currentFolder}>
            <h3 className={styles.folderTitle}>
              {getFolderInfo().icon} {getFolderInfo().name}
            </h3>
            <span className={styles.folderStats}>
              {filteredFiles.length} файлов
            </span>
          </div>

          <FileGrid
            files={filteredFiles}
            currentUser={currentUser}
            onDeleteFile={handleDeleteFile}
            onDownloadFile={(file) => console.log('Download:', file.name)}
          />

          {/* Пустое состояние */}
          {filteredFiles.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📁</div>
              <h3>Файлов нет</h3>
              <p>
                {searchQuery 
                  ? 'По вашему запросу файлов не найдено'
                  : `В папке "${getFolderInfo().name}" пока нет файлов`
                }
              </p>
              <button 
                className={styles.uploadFirstButton}
                onClick={() => setIsUploadModalOpen(true)}
              >
                Загрузить первый файл
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Модальные окна */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadFile}
        currentFolder={currentFolder}
      />

      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onCreate={handleCreateFolder}
      />
    </div>
  );
};

export default FileBrowser;
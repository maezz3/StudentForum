export const useFileUpload = (chatId) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file) => {
    setUploading(true);
    setProgress(0);
    
    try {
      // Загружаем файл
      const fileData = await fileService.uploadFile(file, chatId);
      
      // Создаем сообщение с файлом
      const message = await fileService.sendFileMessage(fileData, chatId);
      
      setUploading(false);
      return message;
      
    } catch (error) {
      setUploading(false);
      throw error;
    }
  };

  return { uploadFile, uploading, progress };
};

export const fileService = {
  async uploadFile(file, chatId) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('chat_id', chatId);
    
    const response = await fetch('/api/files/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error('Upload failed');
    return await response.json();
  },

  async sendFileMessage(fileData, chatId, messageText = '') {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        file_id: fileData.id,
        type: 'file'
      })
    });
    
    return await response.json();
  }
};
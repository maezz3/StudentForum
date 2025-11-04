import { useState, useEffect, useCallback } from 'react';
import { chatService } from '../services/chatService';

export const useChat = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMessages = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const response = await chatService.getMessages(chatId, currentPage);
      
      setMessages(prev => reset ? response.messages : [...prev, ...response.messages]);
      setHasMore(response.has_more);
      setPage(currentPage + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [chatId, page]);

  const sendMessage = useCallback(async (text, fileId = null) => {
    try {
      const newMessage = await chatService.sendMessage(chatId, text, fileId);
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [chatId]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadMessages();
    }
  }, [loading, hasMore, loadMessages]);

  useEffect(() => {
    if (chatId) {
      loadMessages(true);
    }
  }, [chatId]);

  return {
    messages,
    loading,
    error,
    hasMore,
    sendMessage,
    loadMore,
    refresh: () => loadMessages(true)
  };
};
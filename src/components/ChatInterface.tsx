import React, { useState } from 'react';
import { Message, Model } from '../types';
import { generateId, generateAIResponse, availableModels } from '../utils';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ImageUploader from './ImageUploader';
import ModelSelector from './ModelSelector';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>(availableModels[0]);
  
  const handleImageUpload = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    
    const userMessage: Message = {
      id: generateId(),
      sender: 'user',
      type: 'image',
      content: 'Analyze this medical image',
      timestamp: new Date(),
      image: imageUrl,
      modelUsed: selectedModel.name
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      const aiResponse = await generateAIResponse(imageUrl, selectedModel.id);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error processing image:', error);
      
      setMessages(prev => [
        ...prev, 
        {
          id: generateId(),
          sender: 'ai',
          type: 'text',
          content: 'Sorry, there was an error processing your image. Please try again.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900">
      <ChatHeader />
      <MessageList messages={messages} />
      <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="px-4 pt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Select Analysis Model
            </label>
            <ModelSelector 
              models={availableModels}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
            />
          </div>
        </div>
        <ImageUploader onUpload={handleImageUpload} isLoading={isProcessing} />
      </div>
    </div>
  );
};

export default ChatInterface;
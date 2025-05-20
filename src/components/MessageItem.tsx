import React from 'react';
import { Message } from '../types';
import { formatTimestamp } from '../utils';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const getClassificationDetails = () => {
    if (!message.classification) return null;
    
    switch (message.classification) {
      case 'Malignant':
        return {
          color: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200',
          icon: <AlertCircle className="h-4 w-4 mr-1 text-red-600 dark:text-red-400" />,
          border: 'border-red-200 dark:border-red-800'
        };
      case 'Benign':
        return {
          color: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200',
          icon: <AlertTriangle className="h-4 w-4 mr-1 text-yellow-600 dark:text-yellow-400" />,
          border: 'border-yellow-200 dark:border-yellow-800'
        };
      case 'Normal':
        return {
          color: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200',
          icon: <CheckCircle className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />,
          border: 'border-green-200 dark:border-green-800'
        };
      default:
        return null;
    }
  };

  const classificationDetails = getClassificationDetails();

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
      style={{
        animationDuration: '0.3s',
        animationFillMode: 'both'
      }}
    >
      <div 
        className={`max-w-[80%] lg:max-w-[70%] rounded-lg p-3 ${
          isUser 
            ? 'bg-indigo-600 text-white rounded-tr-none' 
            : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none'
        }`}
      >
        {message.type === 'image' && (
          <div className="mb-2 overflow-hidden rounded-md">
            <img 
              src={message.image} 
              alt="Uploaded medical image" 
              className="w-full object-contain max-h-64"
            />
            {message.modelUsed && (
              <div className="mt-1 text-xs opacity-80">
                Model used: {message.modelUsed}
              </div>
            )}
          </div>
        )}
        
        <div className="text-sm md:text-base">
          {message.content}
        </div>
        
        {message.classification && (
          <div className={`mt-2 rounded-md p-2 ${classificationDetails?.color} ${classificationDetails?.border} border flex items-center text-sm`}>
            {classificationDetails?.icon}
            <span className="font-semibold">{message.classification}</span>
            {message.confidence && (
              <span className="ml-1">— {message.confidence}% confidence</span>
            )}
          </div>
        )}
        
        <div className={`text-xs mt-1 ${isUser ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'}`}>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
import React from 'react';
import { ActivitySquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const ChatHeader: React.FC = () => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ActivitySquare className="h-7 w-7 text-cyan-600 dark:text-cyan-400 mr-3" />
          <div>
            <h1 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Medical Image Analyzer</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Powered by AI medical imaging models
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ChatHeader;
import React, { useState } from 'react';
import { Model } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ModelSelectorProps {
  models: Model[];
  selectedModel: Model;
  onSelectModel: (model: Model) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  models, 
  selectedModel, 
  onSelectModel 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm border rounded-md bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
      >
        <span>{selectedModel.name}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 ml-2" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-2" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-700 border rounded-md shadow-lg border-slate-200 dark:border-slate-600 max-h-60 overflow-auto">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                onSelectModel(model);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-600 ${
                model.id === selectedModel.id ? 'bg-slate-100 dark:bg-slate-600 font-medium' : ''
              }`}
            >
              <div className="text-slate-800 dark:text-slate-100">{model.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{model.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
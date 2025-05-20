import { Classification, Message, Model } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Format timestamp to readable string
export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

// Sample models for the dropdown
export const availableModels: Model[] = [
  { 
    id: 'model-a', 
    name: 'Model A', 
    description: 'General purpose breast cancer detection model' 
  },
  { 
    id: 'model-b', 
    name: 'Model B', 
    description: 'Specialized for mammography images' 
  },
  { 
    id: 'model-c', 
    name: 'Model C', 
    description: 'Advanced model with higher accuracy for ultrasound images' 
  },
];

// Function to simulate AI response (placeholder for backend)
export const generateAIResponse = (imageUrl: string, modelId: string): Promise<Message> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Randomly generate classification for demo purposes
      const classifications: Classification[] = ['Malignant', 'Benign', 'Normal'];
      const classification = classifications[Math.floor(Math.random() * 3)];
      
      // Generate random confidence between 70% and 99%
      const confidence = Math.floor(Math.random() * 30) + 70;
      
      // Get model used
      const model = availableModels.find(m => m.id === modelId)?.name || 'Unknown Model';
      
      // Create response message
      const responseMessage: Message = {
        id: generateId(),
        sender: 'ai',
        type: 'text',
        content: `Based on the analyzed image, the classification is: ${classification}`,
        timestamp: new Date(),
        classification,
        confidence,
        modelUsed: model
      };
      
      resolve(responseMessage);
    }, 2000); // 2 second delay to simulate processing
  });
};
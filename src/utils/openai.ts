import { Message } from './types';

export const generateChatResponse = async (messages: Message[]) => {
    try {
        const latestMessage = messages[messages.length - 1];

        const requestBody = {
            message: latestMessage.content,
        };

        const response = await fetch('http://localhost:5045/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('API Error Details:', errorData);
            throw new Error(`Server responded with status ${response.status}. Please try again.`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); 
        
        if (data) {
            if (typeof data === 'string') {
                return { message: data };
            }
            if (data.message) {
                return data;
            }
            
            if (data.response) {
                return { message: data.response };
            }
            
            console.error('Unexpected response format:', data);
            return { message: JSON.stringify(data) };
        }
        
        throw new Error('No data received from server');
    } catch (error) {
        console.error('Chat error:', error);
        throw error;
    }
};

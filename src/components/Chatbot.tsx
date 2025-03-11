import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from 'react-markdown'; // Import Markdown Renderer

const supabaseUrl = 'https://tczryxvhrludrvfibycz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjenJ5eHZocmx1ZHJ2ZmlieWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMjg1NzEsImV4cCI6MjA1NjgwNDU3MX0.1760NTK2_B2SPk8INt_1pYbuvIby_2CnJkmQbY4gWF4';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Property {
  property_name: string;
  id: string;
}

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  
  const chatContainerRef = useRef<HTMLDivElement>(null); // Reference for auto-scrolling

  // Fetch properties from Supabase when chatbot opens
  useEffect(() => {
    if (isOpen) {
      const fetchProperties = async () => {
        const { data, error } = await supabase.from('properties').select('id, property_name');
        if (error) {
          console.error('Error fetching properties:', error.message);
        } else {
          setProperties(data);
        }
      };

      fetchProperties();
      let storedSessionId = localStorage.getItem("session_id");
    if (!storedSessionId) {
      storedSessionId = uuidv4(); // Generate a new session ID
      localStorage.setItem("session_id", storedSessionId);
    }
    setSessionId(storedSessionId);
    }
  }, [isOpen]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePropertyToggle = (propertyId: string) => {
    setSelectedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message; // Keep original message for UI display
    setMessage('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]); // Show original message in UI
    setIsLoading(true);

    // Modify message only for webhook request
    let webhookMessage = userMessage;

    if (selectedProperties.length > 0) {
      const selectedPropertyNames = properties
        .filter(prop => selectedProperties.includes(prop.id))
        .map(prop => prop.property_name)
        .join(', ');

      webhookMessage += ` Find information in the context of [${selectedPropertyNames}].`;
    }

    try {
      const response = await axios.post(
        'https://novanexus.app.n8n.cloud/webhook/8d108450-d072-472d-81d2-3979e0817e05',
        {
          session_id: sessionId,
          message: webhookMessage, // Send the modified message only to webhook
          selectedProperties: selectedProperties.length > 0 ? selectedProperties : null,
        }
      );

      setMessages(prev => [...prev, { text: response.data.output || 'No response from server', isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Sorry, there was an error processing your request.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
};



  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 max-h-[600px] flex flex-col">
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat with Us</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 border-b">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Select Properties:</h4>
            <div className="space-y-2">
              {properties.map(property => (
                <label key={property.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedProperties.includes(property.id)}
                    onChange={() => handlePropertyToggle(property.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{property.property_name}</span>
                </label>
              ))}
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3">Typing...</div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

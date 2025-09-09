import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Brain } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses = {
  greeting: [
    "Hello! I'm here to listen and support you. How are you feeling today?",
    "Hi there! It's great that you're taking time to check in with yourself. What's on your mind?",
    "Welcome! I'm here to provide a safe space for you to share. How can I support you today?"
  ],
  
  anxiety: [
    "I understand that anxiety can feel overwhelming. Remember, these feelings are temporary. Try taking three deep breaths with me. What specifically is making you feel anxious?",
    "Anxiety is your mind trying to protect you, even when there's no real danger. You're safe right now. Can you tell me more about what's worrying you?",
    "It's completely normal to feel anxious sometimes. You're being so brave by reaching out. What usually helps you feel calmer?"
  ],
  
  depression: [
    "I hear that you're going through a difficult time. Your feelings are valid, and it's okay to not be okay. You're not alone in this. What's been the hardest part lately?",
    "Depression can make everything feel heavy, but reaching out shows incredible strength. Small steps count too. Have you been able to do anything today that made you feel even a little better?",
    "Thank you for trusting me with your feelings. Even when it doesn't feel like it, you matter and your life has value. What's one small thing that used to bring you joy?"
  ],
  
  stress: [
    "Stress can really pile up and feel overwhelming. You're doing great by acknowledging it. What's been causing you the most stress lately?",
    "It sounds like you have a lot on your plate right now. Let's break it down together. What feels most urgent to you?",
    "Stress is your body's way of responding to challenges. It's okay to feel this way. Have you been able to take any breaks for yourself recently?"
  ],
  
  positive: [
    "That's wonderful to hear! It's so important to acknowledge the good moments. What's been going well for you?",
    "I'm so glad you're feeling positive! These moments are precious. What's bringing you joy today?",
    "It's beautiful that you're in a good place right now. Celebrating these feelings is just as important as working through difficult ones."
  ],
  
  support: [
    "Remember, seeking help is a sign of strength, not weakness. You deserve support and care.",
    "You're being incredibly brave by opening up. Your feelings matter, and so do you.",
    "It's okay to not have all the answers right now. Taking things one step at a time is perfectly fine.",
    "You're not alone in this journey. There are people who care about you and want to help.",
    "Be gentle with yourself. Healing isn't linear, and that's completely okay."
  ],
  
  default: [
    "I'm here to listen. Can you tell me more about what you're experiencing?",
    "Thank you for sharing with me. Your feelings are important. What would be most helpful for you right now?",
    "I want to understand better. Can you help me by describing what you're going through?",
    "Your wellbeing matters to me. What's been on your mind lately?"
  ]
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your mental health support companion. I'm here to listen, provide encouragement, and offer coping strategies. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Greeting patterns
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    
    // Anxiety patterns
    if (message.includes('anxiety') || message.includes('anxious') || message.includes('worried') || message.includes('nervous')) {
      return botResponses.anxiety[Math.floor(Math.random() * botResponses.anxiety.length)];
    }
    
    // Depression patterns
    if (message.includes('depression') || message.includes('depressed') || message.includes('sad') || message.includes('down') || message.includes('hopeless')) {
      return botResponses.depression[Math.floor(Math.random() * botResponses.depression.length)];
    }
    
    // Stress patterns
    if (message.includes('stress') || message.includes('stressed') || message.includes('overwhelmed') || message.includes('pressure')) {
      return botResponses.stress[Math.floor(Math.random() * botResponses.stress.length)];
    }
    
    // Positive patterns
    if (message.includes('good') || message.includes('happy') || message.includes('great') || message.includes('better') || message.includes('fine')) {
      return botResponses.positive[Math.floor(Math.random() * botResponses.positive.length)];
    }
    
    // Support messages
    if (message.includes('help') || message.includes('support') || message.includes('alone') || message.includes('scared')) {
      return botResponses.support[Math.floor(Math.random() * botResponses.support.length)];
    }
    
    // Default response
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">MindfulBot</h1>
              <p className="text-sm text-gray-600">Your supportive mental health companion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-120px)] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin scrollbar-thumb-indigo-200">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white ml-12'
                    : 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm border border-indigo-100 mr-12'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="flex-shrink-0 p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3 justify-start">
              <div className="flex-shrink-0 p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-sm border border-indigo-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 p-4">
          <div className="flex space-x-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... I'm here to listen and support you."
              className="flex-1 resize-none bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-sm leading-relaxed max-h-32"
              rows={1}
              style={{ minHeight: '24px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="flex-shrink-0 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
            <Brain className="w-3 h-3 inline mr-1" />
            This bot provides emotional support but isn't a replacement for professional mental health care.
            If you're in crisis, please contact a mental health professional or emergency services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
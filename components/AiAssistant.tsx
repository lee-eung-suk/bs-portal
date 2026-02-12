import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, Eraser } from 'lucide-react';
import { generateAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '안녕하세요, 선생님! 무엇을 도와드릴까요? 가정통신문 작성이나 문자 문구 추천 등을 도와드릴 수 있어요.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const responseText = await generateAssistantResponse(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '죄송합니다. 오류가 발생했습니다.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([{ role: 'model', text: '대화가 초기화되었습니다. 새로운 업무를 도와드릴까요?' }]);
  };

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-300" />
          <h3 className="font-semibold text-sm">AI 스마트 보조</h3>
        </div>
        <button 
          onClick={handleClear}
          className="rounded-full p-1.5 hover:bg-white/20 transition-colors text-xs flex items-center gap-1"
          title="대화 지우기"
        >
          <Eraser size={14} />
          <span>초기화</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-100 text-purple-600 border border-purple-200'
              }`}
            >
              {msg.role === 'user' ? <User size={14} /> : <Bot size={16} />}
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <Bot size={16} />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-white px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-3">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AI에게 업무 도움을 요청하세요..."
            className="flex-1 rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-4 pr-12 text-sm focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 rounded-full bg-purple-600 p-1.5 text-white transition-colors hover:bg-purple-700 disabled:bg-gray-300"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
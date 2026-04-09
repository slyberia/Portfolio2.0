import React, { useState, useRef, useEffect } from 'react';
import { sendMessageStream, ChatHistory } from '../geminiService';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatWidgetProps {
  onNavigate?: (path: string) => void;
  onAction?: (action: string) => void;
  onShowToast?: (message: string) => void;
}

const STORAGE_KEY = 'kyle_twin_history';
const SUGGESTED_QUESTIONS = [
  'Download Resume',
  'Show me the Aegis Protocol',
  'What is your Ops experience?',
  'How do you handle QA?',
];

const ChatWidget: React.FC<ChatWidgetProps> = ({ onNavigate, onAction, onShowToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(true);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          {
            role: 'model',
            text: "Hi! I'm Kyle's Digital Twin. I can answer questions about his work or navigate the site for you.\n\n*(Note: I'm an AI agent based on Kyle's documentation and may occasionally miss details.)*",
          },
        ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Engage user with pulse for 5 seconds, then stop
    const timer = setTimeout(() => setShouldPulse(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const parseAndExecuteCommands = (text: string) => {
    const navRegex = /<<NAVIGATE:(.*?)>>/;
    const actionRegex = /<<ACTION:(.*?)>>/;

    const navMatch = text.match(navRegex);
    const actionMatch = text.match(actionRegex);

    let cleanedText = text;

    if (navMatch && onNavigate) {
      const target = navMatch[1];
      if (onShowToast) onShowToast(`AI Twin: Navigating to ${target}...`);

      if (target.startsWith('case-study:')) {
        onNavigate(target);
      } else {
        onNavigate(target.startsWith('#') ? target : `#${target}`);
      }
      cleanedText = cleanedText.replace(navRegex, '');
    }

    if (actionMatch && onAction) {
      const actionType = actionMatch[1];
      if (onShowToast) {
        const msg =
          actionType === 'resume'
            ? 'AI Twin: Preparing Resume download...'
            : 'AI Twin: Opening contact portal...';
        onShowToast(msg);
      }
      onAction(actionType);
      cleanedText = cleanedText.replace(actionRegex, '');
    }

    return cleanedText;
  };

  const handleSend = async (textOverride?: string) => {
    const userMsg = textOverride || input.trim();
    if (!userMsg || isTyping) return;

    if (!isOpen) setIsOpen(true);
    setShouldPulse(false);

    // Build history from current messages before adding the new user message
    const history: ChatHistory = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      let fullResponse = '';
      setMessages((prev) => [...prev, { role: 'model', text: '' }]);

      const stream = sendMessageStream(userMsg, history);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages((prev) => {
          const newArr = [...prev];
          newArr[newArr.length - 1] = { role: 'model', text: fullResponse };
          return newArr;
        });
      }

      const cleanedText = parseAndExecuteCommands(fullResponse);
      setMessages((prev) => {
        const newArr = [...prev];
        newArr[newArr.length - 1] = { role: 'model', text: cleanedText };
        return newArr;
      });
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: "I'm currently unavailable. Please reach Kyle directly! <<ACTION:contact>>",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearHistory = () => {
    const initial = [
      { role: 'model', text: 'Conversation history reset. How can I help you today?' },
    ];
    setMessages(initial as Message[]);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end pointer-events-none transition-colors duration-500">
      <div
        className={`pointer-events-auto w-[90vw] md:w-[400px] bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right mb-4 flex flex-col ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 h-[550px]'
            : 'opacity-0 scale-95 translate-y-4 h-0 pointer-events-none'
        }`}
      >
        <div className="bg-indigo-600/5 dark:bg-indigo-600/20 p-4 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-500/20">
              AI
            </div>
            <div>
              <h3 className="text-navy-900 dark:text-white font-bold font-outfit text-sm">
                Kyle's Digital Twin
              </h3>
              <p className="text-[10px] text-indigo-600 dark:text-indigo-300 uppercase tracking-wider font-medium">
                Verified Ops Agent
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearHistory}
              className="p-1.5 text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors"
              title="Reset conversation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 18 18" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll bg-slate-50 dark:bg-slate-950/50"
          ref={scrollRef}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                    : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-black/5 dark:border-white/5 rounded-bl-none shadow-sm dark:shadow-none'
                }`}
              >
                {msg.role === 'model' ? (
                  <ReactMarkdown
                    components={{
                      p: ({ node: _node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                      ul: ({ node: _node, ...props }) => (
                        <ul {...props} className="list-disc pl-4 mb-2" />
                      ),
                      li: ({ node: _node, ...props }) => <li {...props} className="mb-1" />,
                      a: ({ node: _node, ...props }) => (
                        <a
                          {...props}
                          className="text-indigo-600 dark:text-indigo-300 underline"
                          target="_blank"
                        />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl rounded-bl-none p-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 pt-2 pb-0 flex gap-2 overflow-x-auto scrollbar-hide bg-slate-50 dark:bg-slate-950/50">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isTyping}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-indigo-600/5 dark:bg-indigo-500/10 border border-indigo-600/10 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs hover:bg-indigo-600/10 dark:hover:bg-indigo-500/20 hover:text-indigo-700 dark:hover:text-white transition-colors shrink-0 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="p-4 bg-white dark:bg-slate-900/50">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Kyle's AI Twin..."
              className="w-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:scale-110 transition-all duration-300 ${shouldPulse ? 'animate-chat-pulse' : ''}`}
        aria-label="Toggle AI Chat"
      >
        <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-20 duration-[2000ms]"></div>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 rotate-90 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        <div className="absolute -top-1 -right-1 bg-white text-indigo-600 rounded-full p-0.5 border-2 border-white dark:border-slate-950 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9.9 2.5C10.6 1.1 12.6 1.1 13.3 2.5L14.7 5.3C14.9 5.8 15.4 6.1 15.9 6.2L18.9 6.8C20.5 7.1 21.1 9 19.9 10.1L17.7 12.2C17.3 12.6 17.1 13.1 17.2 13.6L17.8 16.6C18.1 18.2 16.4 19.4 15 18.6L12.3 17.2C11.8 16.9 11.3 16.9 10.8 17.2L8.1 18.6C6.7 19.4 5 18.2 5.3 16.6L5.9 13.6C6 13.1 5.8 12.6 5.4 12.2L3.2 10.1C2 9 2.6 7.1 4.2 6.8L7.2 6.2C7.7 6.1 8.2 5.8 8.4 5.3L9.9 2.5Z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ChatWidget;

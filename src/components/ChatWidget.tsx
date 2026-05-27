import React, { useState, useRef, useEffect } from 'react';
import { sendMessageStream, ChatHistory } from '../geminiService';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  text: string;
}
type FeedbackStatus = 'helpful' | 'notHelpful' | 'handoffOffered' | 'handoffTriggered';
type DigitalTwinMode = 'general' | 'implementation' | 'qa' | 'gis';

interface ChatWidgetProps {
  onNavigate?: (path: string) => void;
  onAction?: (action: string) => void;
  onShowToast?: (message: string) => void;
}

const STORAGE_KEY = 'kyle_twin_history';

const ALLOWED_NAV_TARGETS = new Set([
  'home',
  'experience',
  'skills',
  'tracks/implementation',
  'tracks/ops-analytics',
  'tracks/gis',
  'project:prompter-hub',
  'project:project-aegis',
  'project:nba-systems-qa',
  'project:luxe-lofts',
  'project:ops-triage',
  'project:guynode',
  'project:digital-twin',
  'case-study:prompter-hub',
  'case-study:project-aegis',
  'case-study:nba-systems-qa',
  'case-study:luxe-lofts',
  'case-study:ops-triage',
  'case-study:digital-twin',
]);

const ALLOWED_ACTIONS = new Set(['contact', 'resume']);

const MODE_CONFIG: Record<
  DigitalTwinMode,
  { label: string; intro: string; suggestions: string[]; pillClassName: string }
> = {
  general: {
    label: 'General Recruiter Mode',
    intro:
      "Hi! I'm Kyle's Digital Twin. I can answer questions about his work or navigate the site for you.\n\n*(Note: I'm an AI agent based on Kyle's documentation and may occasionally miss details.)*",
    suggestions: [
      'Which role track fits Kyle best?',
      'Show implementation proof.',
      'Show QA proof.',
      'Show GIS proof.',
      'Explain Guynode.',
      'Explain the Digital Twin.',
    ],
    pillClassName: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  },
  implementation: {
    label: 'Implementation Track',
    intro:
      'You’re viewing Kyle’s Technical Implementation track. I can help you inspect proof around workflow delivery, implementation planning, documentation, Guynode, the Digital Twin, and customer-facing technical support.',
    suggestions: [
      'Show me Kyle’s implementation proof.',
      'How does Guynode support this track?',
      'Explain the Digital Twin as AI implementation proof.',
      'What experience supports technical implementation roles?',
    ],
    pillClassName: 'bg-tide-aqua/10 text-[#237f86] dark:bg-tide-aqua/20 dark:text-tide-sky',
  },
  qa: {
    label: 'QA Track',
    intro:
      'You’re viewing Kyle’s QA track. I can help you inspect proof around validation, issue triage, failure planning, QA scenarios, Ops Triage, NBA 2K Systems Analysis, and Digital Twin guardrails.',
    suggestions: [
      'Show me Kyle’s QA proof.',
      'Explain the Digital Twin failure planning.',
      'What does Ops Triage demonstrate?',
      'How does Kyle approach validation and edge cases?',
    ],
    pillClassName: 'bg-blue-100 text-blue-800 dark:bg-tide-blue/20 dark:text-blue-200',
  },
  gis: {
    label: 'GIS Track',
    intro:
      'You’re viewing Kyle’s GIS track. I can help you inspect proof around Guynode, spatial data workflows, metadata, dataset governance, map-based UX, and utility GIS operations.',
    suggestions: [
      'Show me Kyle’s GIS proof.',
      'What does Guynode demonstrate?',
      'How does Kyle’s utility GIS experience apply?',
      'Explain the spatial data workflow evidence.',
    ],
    pillClassName: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-200',
  },
};

const FALLBACK_PATTERNS = [
  /chat limit/i,
  /temporarily unavailable/i,
  /too long for the portfolio assistant/i,
  /unable to answer/i,
  /outside my portfolio scope/i,
];

const ChatWidget: React.FC<ChatWidgetProps> = ({ onNavigate, onAction, onShowToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(true);
  const [mode, setMode] = useState<DigitalTwinMode>('general');
  const [modeLabelOverride, setModeLabelOverride] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          {
            role: 'model',
            text: MODE_CONFIG.general.intro,
          },
        ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackByMessage, setFeedbackByMessage] = useState<Record<number, FeedbackStatus>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const buildHandoffSummary = (
    modelIndex: number,
    reason = 'User marked the answer as not helpful.',
  ) => {
    const userQuestion =
      messages
        .slice(0, modelIndex)
        .reverse()
        .find((m) => m.role === 'user')?.text ?? '';
    const assistantAnswer = messages[modelIndex]?.text ?? '';
    const path = window.location.hash || window.location.pathname || '/';
    const timestamp = new Date().toISOString();

    return `Digital Twin handoff:\nUser question: "${userQuestion}"\nAssistant answer: "${assistantAnswer}"\nReason: ${reason}\nPage: "${path}"\nTime: "${timestamp}"`;
  };

  const openContactWithContext = async (modelIndex: number, reason?: string) => {
    const handoffSummary = buildHandoffSummary(modelIndex, reason);
    try {
      await navigator.clipboard.writeText(handoffSummary);
      onShowToast?.('Context copied. Paste it into your message to Kyle.');
    } catch {
      onShowToast?.('Contact form opened. Mention what the Digital Twin missed.');
    }

    onAction?.('contact');
    setFeedbackByMessage((prev) => ({ ...prev, [modelIndex]: 'handoffTriggered' }));
  };

  useEffect(() => {
    const handleOpenDigitalTwin = (
      event: Event & {
        detail?: { source?: DigitalTwinMode; starterPrompt?: string; modeLabel?: string };
      },
    ) => {
      const source = event.detail?.source ?? 'general';
      const safeMode = MODE_CONFIG[source] ? source : 'general';
      setMode(safeMode);
      setModeLabelOverride(event.detail?.modeLabel?.trim() || null);
      setIsOpen(true);
      setShouldPulse(false);
      const nextIntro = event.detail?.starterPrompt?.trim() || MODE_CONFIG[safeMode].intro;
      setMessages((prev) => {
        if (!prev.length) return [{ role: 'model', text: nextIntro }];
        if (prev[0].role === 'model') {
          const updated = [...prev];
          updated[0] = { role: 'model', text: nextIntro };
          return updated;
        }
        return [{ role: 'model', text: nextIntro }, ...prev];
      });
    };

    window.addEventListener('open-digital-twin', handleOpenDigitalTwin as EventListener);
    return () =>
      window.removeEventListener('open-digital-twin', handleOpenDigitalTwin as EventListener);
  }, []);

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
      const target = navMatch[1].trim();
      if (ALLOWED_NAV_TARGETS.has(target)) {
        if (onShowToast) onShowToast(`AI Twin: Navigating to ${target}...`);
        if (target.startsWith('case-study:') || target.startsWith('project:')) {
          onNavigate(target);
        } else {
          onNavigate(`#${target}`);
        }
      }
      cleanedText = cleanedText.replace(navRegex, '');
    }

    if (actionMatch && onAction) {
      const actionType = actionMatch[1].trim();
      if (ALLOWED_ACTIONS.has(actionType)) {
        if (onShowToast) {
          const msg =
            actionType === 'resume'
              ? 'AI Twin: Preparing Resume download...'
              : 'AI Twin: Opening contact portal...';
          onShowToast(msg);
        }
        onAction(actionType);
      }
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
    setMode('general');
    setModeLabelOverride(null);
    const initial = [
      { role: 'model', text: 'Conversation history reset. How can I help you today?' },
    ];
    setMessages(initial as Message[]);
    setFeedbackByMessage({});
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const shouldShowFeedback = (msg: Message, idx: number) => {
    if (msg.role !== 'model' || isTyping || idx === 0 || !msg.text.trim()) return false;
    if (FALLBACK_PATTERNS.some((pattern) => pattern.test(msg.text))) return false;
    const status = feedbackByMessage[idx];
    return status !== 'helpful' && status !== 'handoffTriggered';
  };

  const shouldShowFailureActions = (msg: Message) => {
    if (msg.role !== 'model') return false;
    return FALLBACK_PATTERNS.some((pattern) => pattern.test(msg.text));
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[90] flex flex-col items-end pointer-events-none transition-colors duration-500">
      <div
        className={`pointer-events-auto w-[90vw] md:w-[400px] bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right mb-4 flex flex-col ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 h-[550px]'
            : 'opacity-0 scale-95 translate-y-4 h-0 pointer-events-none'
        }`}
      >
        <div className="bg-tide-aqua/5 dark:bg-tide-aqua/20 p-4 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-tide-aqua flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-tide-aqua/20">
              AI
            </div>
            <div>
              <h3 className="text-ink-navy dark:text-white font-bold font-outfit text-sm">
                Kyle's Digital Twin
              </h3>
              <p className="text-[10px] text-tide-aqua dark:text-tide-softBlue uppercase tracking-wider font-medium">
                Verified Ops Agent
              </p>
              {mode !== 'general' && (
                <span
                  className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${MODE_CONFIG[mode].pillClassName}`}
                >
                  {modeLabelOverride || MODE_CONFIG[mode].label}
                </span>
              )}
              <button
                type="button"
                onClick={() => onNavigate?.('case-study:digital-twin')}
                className="mt-1 text-[10px] text-slate-600 dark:text-slate-300 underline hover:text-tide-aqua dark:hover:text-tide-softBlue"
              >
                View how this works
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearHistory}
              className="p-1.5 text-slate-600 hover:text-ink-navy dark:hover:text-white transition-colors"
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
              className="p-1.5 text-slate-600 hover:text-ink-navy dark:hover:text-white transition-colors"
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
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-tide-aqua text-white rounded-br-none shadow-md'
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
                          className="text-tide-aqua dark:text-tide-softBlue underline"
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
              {msg.role === 'model' && shouldShowFeedback(msg, idx) && (
                <div className="mt-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-xs">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">Was this helpful?</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        setFeedbackByMessage((prev) => ({
                          ...prev,
                          [idx]: 'helpful',
                        }))
                      }
                      className="px-2.5 py-1 rounded-md border border-black/10 dark:border-white/20 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-tide-aqua/50"
                      aria-label="Mark response as helpful"
                    >
                      Helpful
                    </button>
                    <button
                      onClick={() =>
                        setFeedbackByMessage((prev) => ({
                          ...prev,
                          [idx]: 'handoffOffered',
                        }))
                      }
                      className="px-2.5 py-1 rounded-md border border-black/10 dark:border-white/20 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-tide-aqua/50"
                      aria-label="Mark response as not quite helpful"
                    >
                      Not quite
                    </button>
                    <button
                      onClick={() => openContactWithContext(idx, 'User requested a human handoff.')}
                      className="px-2.5 py-1 rounded-md border border-tide-aqua/30 text-tide-aqua dark:text-tide-softBlue hover:bg-tide-aqua/10 focus:outline-none focus:ring-2 focus:ring-tide-aqua/50"
                      aria-label="Contact Kyle from chat feedback"
                    >
                      Contact Kyle
                    </button>
                  </div>
                </div>
              )}
              {msg.role === 'model' && feedbackByMessage[idx] === 'handoffOffered' && (
                <div
                  className="mt-2 rounded-xl border border-tide-aqua/20 bg-tide-aqua/5 dark:bg-tide-aqua/10 p-3 text-xs text-slate-600 dark:text-slate-200"
                  role="status"
                  aria-live="polite"
                >
                  <p className="mb-2">
                    Sorry about that. I can help route this to Kyle with the question and context so
                    he can follow up directly.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openContactWithContext(idx)}
                      className="px-2.5 py-1 rounded-md bg-tide-aqua text-white hover:bg-tide-aqua focus:outline-none focus:ring-2 focus:ring-tide-aqua/60"
                      aria-label="Contact Kyle with context from this answer"
                    >
                      Contact Kyle with context
                    </button>
                    <button
                      onClick={() =>
                        setFeedbackByMessage((prev) => ({
                          ...prev,
                          [idx]: 'notHelpful',
                        }))
                      }
                      className="px-2.5 py-1 rounded-md border border-black/10 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-tide-aqua/50"
                      aria-label="Dismiss handoff panel and try another question"
                    >
                      Try another question
                    </button>
                  </div>
                </div>
              )}
              {msg.role === 'model' && shouldShowFailureActions(msg) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      openContactWithContext(idx, 'Digital Twin hit a fallback response.')
                    }
                    className="px-2.5 py-1 rounded-md text-xs border border-tide-aqua/30 text-tide-aqua dark:text-tide-softBlue hover:bg-tide-aqua/10 focus:outline-none focus:ring-2 focus:ring-tide-aqua/50"
                  >
                    Contact Kyle
                  </button>
                  <button
                    onClick={() => onAction?.('resume')}
                    className="px-2.5 py-1 rounded-md text-xs border border-black/10 dark:border-white/20 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-tide-aqua/50"
                  >
                    View Resume
                  </button>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl rounded-bl-none p-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-tide-aqua rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-tide-aqua rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-tide-aqua rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 pt-2 pb-0 flex gap-2 overflow-x-auto scrollbar-hide bg-slate-50 dark:bg-slate-950/50">
          {MODE_CONFIG[mode].suggestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isTyping}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-tide-aqua/5 dark:bg-tide-aqua/10 border border-tide-aqua/10 dark:border-tide-aqua/20 text-tide-aqua dark:text-tide-softBlue text-xs hover:bg-tide-aqua/10 dark:hover:bg-tide-aqua/20 hover:text-[#237f86] dark:hover:text-white transition-colors shrink-0 disabled:opacity-50"
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
              className="w-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-ink-navy dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-tide-aqua/50 transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-tide-aqua text-white rounded-lg hover:bg-tide-aqua disabled:opacity-50 transition-colors"
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
        className={`pointer-events-auto group relative flex items-center justify-center gap-2 h-12 w-12 md:h-14 md:w-auto md:px-4 rounded-full bg-tide-aqua text-white shadow-lg shadow-tide-aqua/30 hover:bg-tide-aqua hover:scale-[1.03] transition-all duration-300 ${shouldPulse ? 'animate-chat-pulse' : ''}`}
        aria-label="Ask the Digital Twin"
      >
        <div className="absolute inset-0 rounded-full bg-tide-sky animate-ping opacity-20 duration-[2000ms]"></div>
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
        {!isOpen && (
          <span className="hidden md:inline text-sm font-semibold whitespace-nowrap">
            Ask the Digital Twin
          </span>
        )}
        <div className="absolute -top-1 -right-1 bg-white text-tide-aqua rounded-full p-0.5 border-2 border-white dark:border-slate-950 shadow-sm">
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

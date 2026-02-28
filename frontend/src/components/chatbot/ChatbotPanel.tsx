import { motion } from "framer-motion";
import LottieWrapper from "@/components/common/LottieWrapper";
import chatbotAnimation from "@/public/animations/chatbot.json";
import ProjectCard from "@/components/projects/ProjectCard";
import ReactMarkdown from "react-markdown";
import { useChatbotPanel } from "@/lib/hooks/useChatbotPanel";

const cardGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

export default function ChatbotPanel() {
  const {
    messages,
    input,
    setInput,
    loading,
    offline,
    isMaximized,
    setIsMaximized,
    lastUpdatedAt,
    latestRecommendations,
    updatedLabel,
    handleSend,
    quickPrompts
  } = useChatbotPanel();

  return (
    <div
      className={`grid gap-4 md:gap-8 min-w-0 ${
        isMaximized ? "grid-cols-1" : "lg:grid-cols-[2fr_1fr]"
      }`}
    >
      <div
        className={`glass-card rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col min-w-0 ${
          isMaximized ? "h-[85vh]" : "h-[70vh] md:h-[72vh]"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-12 h-12">
            <LottieWrapper animationData={chatbotAnimation} className="w-12 h-12" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-display text-text-100 truncate">NovaFYP Advisor</h1>
            <p className="text-sm text-text-200">Your RAG-powered assistant</p>
          </div>
          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setIsMaximized((prev) => !prev)}
              aria-label={isMaximized ? "Minimize chat" : "Maximize chat"}
              title={isMaximized ? "Minimize" : "Maximize"}
              className="text-xs p-2 rounded-full text-text-200 hover:text-text-100 whitespace-nowrap inline-flex items-center justify-center"
            >
              {isMaximized ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <polyline points="9 3 9 9 3 9" />
                  <polyline points="15 3 15 9 21 9" />
                  <polyline points="9 21 9 15 3 15" />
                  <polyline points="15 21 15 15 21 15" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 3 3 3 3 9" />
                  <polyline points="15 21 21 21 21 15" />
                  <polyline points="9 21 3 21 3 15" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {offline ? (
          <div className="mt-4 text-xs text-accent-500">
            Backend is offline. Using demo mode until it reconnects.
          </div>
        ) : null}

        <div className="mt-4 md:mt-6 flex-1 overflow-y-auto overflow-x-hidden space-y-4 pr-1 sm:pr-2 min-w-0">
          {messages.length === 0 ? (
            <p className="text-text-200">
              Ask anything about final year projects. The advisor will guide you
              with data-backed insights.
            </p>
          ) : (
            messages.map((message, index) => (
              <div key={`${message.role}-${index}`}>
              <div
                className={`p-3 rounded-xl text-sm max-w-[92%] sm:max-w-[85%] lg:max-w-[80%] break-words overflow-hidden ${
                  message.role === "user"
                    ? "ml-auto bg-brand-500/20 text-text-100"
                    : "bg-white/5 text-text-200"
                }`}
              >
                {message.role === "assistant" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
              {message.role === "assistant" && message.recommendedProjects?.length ? (
                <div className="mt-4 min-w-0">
                  <p className="text-sm font-semibold text-text-100 mb-3">
                    Recommended Projects
                  </p>
                  <motion.div
                    className="grid gap-3 sm:gap-4 sm:grid-cols-2 min-w-0"
                    initial="hidden"
                    animate="visible"
                    variants={cardGridVariants}
                  >
                    {message.recommendedProjects.map((project) => (
                      <motion.div
                        key={String(project.id ?? project.title)}
                        variants={cardItemVariants}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ) : null}
              </div>
            ))
          )}
          {loading ? (
            <p className="text-text-200 text-sm">Thinking...</p>
          ) : null}
        </div>

        <div className="mt-4 min-w-0">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="text-xs px-3 py-1 rounded-full bg-white/5 text-text-200 hover:text-text-100"
                onClick={() => setInput(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="flex gap-2 min-w-0">
            <input
              type="text"
              className="flex-1 min-w-0 px-3 sm:px-4 py-3 rounded-xl input-surface text-text-100"
              placeholder="Type your question..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button
              type="button"
              onClick={handleSend}
              aria-label="Send message"
              title="Send"
              className="bg-accent-500 hover:bg-accent-400 text-white px-4 sm:px-5 rounded-xl transition whitespace-nowrap inline-flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`space-y-4 md:space-y-6 min-w-0 ${isMaximized ? "hidden" : "block"}`}>
        <div className="glass-card rounded-2xl p-4 md:p-6">
          <h2 className="text-lg font-semibold text-text-100">
            Current Context
          </h2>
          <p className="text-sm text-text-200 mt-2">
            Personalized recommendations based on your conversation.
          </p>
        </div>

        <motion.div
          key={lastUpdatedAt ?? "initial"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <h3 className="text-lg font-semibold text-text-100 mb-3">
            Latest Recommendations
          </h3>
          <p className="text-xs text-text-200 mb-4">{updatedLabel}</p>
          <div className="space-y-4">
            {latestRecommendations.slice(0, 3).map((project) => (
              <ProjectCard
                key={String(project.id ?? project.title)}
                project={project}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

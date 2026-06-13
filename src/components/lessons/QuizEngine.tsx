import { useState } from "react";
import { QuizQuestion } from "@/data/contentMap";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

export function QuizEngine({ 
  questions, 
  onComplete 
}: { 
  questions: QuizQuestion[], 
  onComplete: (passed: boolean, score: number) => void 
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return <div className="text-zinc-400">No questions available for this module yet.</div>;
  }

  const q = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === q.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const passed = (score + (selectedOpt === q.correctAnswer ? 1 : 0)) / questions.length >= 0.6; // 60% pass rate
      onComplete(passed, score + (selectedOpt === q.correctAnswer ? 1 : 0));
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const total = questions.length;
    const passed = score / total >= 0.6;

    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <div className="text-6xl mb-6">
          {passed ? "🏆" : "💔"}
        </div>
        <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-zinc-400 mb-8 text-lg">You scored {score} out of {total}.</p>
        
        {passed ? (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl mb-8">
            Excellent! You have passed this module's quiz and can now proceed.
          </div>
        ) : (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-8">
            You need at least 60% to pass. Please review the material and try again.
          </div>
        )}

        <div className="flex gap-4">
          {!passed && (
            <button 
              onClick={handleRetry}
              className="flex items-center px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-bold border border-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Retry Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="mb-8 flex justify-between items-center text-sm font-bold text-zinc-500">
        <span>Question {currentIdx + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/5 border border-white/10 p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-8 leading-relaxed">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === q.correctAnswer;
              
              let btnClass = "border-white/5 bg-black/50 hover:bg-white/5 text-zinc-300";
              if (isAnswered) {
                if (isCorrect) {
                  btnClass = "border-green-500 bg-green-500/10 text-green-300";
                } else if (isSelected && !isCorrect) {
                  btnClass = "border-red-500 bg-red-500/10 text-red-300";
                } else {
                  btnClass = "border-white/5 bg-black/50 text-zinc-600 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-5 rounded-xl border text-left font-mono text-sm sm:text-base transition-all flex justify-between items-center ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500 w-5 h-5 shrink-0" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm leading-relaxed"
            >
              <strong className="block mb-1 text-blue-400">Explanation:</strong>
              {q.explanation}
            </motion.div>
          )}

          {isAnswered && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                {currentIdx < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

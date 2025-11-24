import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ArgumentForm from './components/ArgumentForm';
import VerdictView from './components/VerdictView';
import { judgeCase } from './services/geminiService';
import { AppView, CaseData, Verdict } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setCurrentView('form');
  };

  const handleSubmit = async (data: CaseData) => {
    setCurrentView('loading');
    setError(null);
    try {
      const result = await judgeCase(data);
      setVerdict(result);
      setCurrentView('verdict');
    } catch (err) {
      console.error(err);
      setError("法官正在追自己的尾巴（出错了），请重试。");
      setCurrentView('form');
    }
  };

  const handleReset = () => {
    setVerdict(null);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {currentView === 'landing' && (
          <LandingPage onStart={handleStart} />
        )}

        {currentView === 'form' && (
          <div className="animate-fade-in">
             <button 
               onClick={() => setCurrentView('landing')}
               className="mb-6 text-slate-400 hover:text-slate-600 font-semibold flex items-center gap-2 text-sm"
             >
               ← 返回大厅
             </button>
            <ArgumentForm onSubmit={handleSubmit} />
            {error && (
              <div className="fixed bottom-4 right-4 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg animate-bounce">
                {error}
              </div>
            )}
          </div>
        )}

        {currentView === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">
                🐶
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2 font-cute">正在审查证据...</h2>
            <p className="text-slate-500">巴卡比法官正在嗅探真相。</p>
          </div>
        )}

        {currentView === 'verdict' && verdict && (
          <VerdictView verdict={verdict} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-slate-400 text-sm font-medium">
        <p>© {new Date().getFullYear()} 萌宠断案庭. 保留所有“汪”语权。</p>
      </footer>
    </div>
  );
};

export default App;
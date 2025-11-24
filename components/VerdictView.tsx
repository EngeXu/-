import React from 'react';
import { Verdict } from '../types';

interface VerdictViewProps {
  verdict: Verdict;
  onReset: () => void;
}

const VerdictView: React.FC<VerdictViewProps> = ({ verdict, onReset }) => {
  const isTie = verdict.winner === 'Tie';
  const winnerColor = verdict.winner === 'Party A' ? 'text-teal-600' : (isTie ? 'text-purple-600' : 'text-pink-600');
  const winnerBg = verdict.winner === 'Party A' ? 'bg-teal-50' : (isTie ? 'bg-purple-50' : 'bg-pink-50');
  
  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      
      {/* Header Result */}
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="inline-block bg-yellow-400 text-yellow-900 font-bold px-4 py-1 rounded-full text-sm mb-4 shadow-sm">
          判决已送达
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 font-cute">
          {isTie ? "平局！" : "胜诉方揭晓！"}
        </h2>
        <p className={`text-2xl font-bold ${winnerColor}`}>
          {isTie ? "你们都是好孩子，握手言和吧。" : `${verdict.winnerName} 赢得了肉骨头！`}
        </p>
      </div>

      {/* Score Cards */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        {/* Score A */}
        <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-teal-400"></div>
            <div className="flex justify-between items-end mb-2">
                <span className="text-slate-500 font-semibold uppercase text-xs tracking-wider">甲方得分</span>
                <span className="text-4xl font-black text-teal-500">{verdict.scoreA}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: `${verdict.scoreA}%` }}></div>
            </div>
        </div>

        {/* Score B */}
        <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-pink-400"></div>
            <div className="flex justify-between items-end mb-2">
                <span className="text-slate-500 font-semibold uppercase text-xs tracking-wider">乙方得分</span>
                <span className="text-4xl font-black text-pink-500">{verdict.scoreB}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: `${verdict.scoreB}%` }}></div>
            </div>
        </div>
      </div>

      {/* Judge's Analysis Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-slate-100">
        <div className="bg-[#FFF8E7] p-6 md:p-8 flex items-start gap-6 border-b border-orange-100">
          <img 
            src="https://picsum.photos/id/1025/150/150" 
            alt="Judge" 
            className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md flex-shrink-0"
          />
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">巴卡比法官说：</h3>
            <p className="text-slate-600 italic text-sm md:text-base">"{verdict.humorousComment}"</p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
            {/* Analysis */}
            <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">嗅探分析 (案情分析)</h4>
                <p className="text-slate-700 leading-relaxed text-lg text-justify">
                    {verdict.analysis}
                </p>
            </div>

            {/* Advice */}
            <div className={`p-6 rounded-2xl ${winnerBg} border border-opacity-50 border-slate-200`}>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${winnerColor}`}>
                    <span>💡</span> 法官建议
                </h4>
                <p className="text-slate-800 font-medium text-justify">
                    {verdict.advice}
                </p>
            </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onReset}
          className="text-slate-500 hover:text-slate-800 font-semibold py-3 px-6 rounded-xl transition flex items-center gap-2"
        >
          <span>🔄</span>
          <span>审理新案件</span>
        </button>
      </div>

    </div>
  );
};

export default VerdictView;
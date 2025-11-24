import React, { useState } from 'react';
import { CaseData, LitigantData } from '../types';

interface ArgumentFormProps {
  onSubmit: (data: CaseData) => void;
}

const ArgumentForm: React.FC<ArgumentFormProps> = ({ onSubmit }) => {
  const [partyA, setPartyA] = useState<LitigantData>({ name: '', statement: '', stance: '' });
  const [partyB, setPartyB] = useState<LitigantData>({ name: '', statement: '', stance: '' });

  const isFormValid = 
    partyA.name && partyA.statement && partyA.stance &&
    partyB.name && partyB.statement && partyB.stance;

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 lg:pb-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 font-cute">提交呈堂证供</h2>
        <p className="text-slate-500">请务必诚实，法官能闻出谎言的味道。</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Party A Side - Blue/Teal Theme */}
        <div className="flex-1 bg-white p-6 md:p-8 rounded-3xl shadow-lg border-t-8 border-teal-400">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">🫐</div>
            <h3 className="text-xl font-bold text-slate-700">甲方 (Blue Team)</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">你的名字/昵称</label>
              <input 
                type="text" 
                placeholder="例如：小明"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
                value={partyA.name}
                onChange={(e) => setPartyA({...partyA, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">发生了什么？(陈述)</label>
              <textarea 
                rows={5}
                placeholder="描述一下事情的经过... 比如：他把臭袜子扔得到处都是！"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none transition resize-none"
                value={partyA.statement}
                onChange={(e) => setPartyA({...partyA, statement: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">你认为你为什么是对的？(立场)</label>
              <textarea 
                rows={2}
                placeholder="我之前明明说过..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none transition resize-none"
                value={partyA.stance}
                onChange={(e) => setPartyA({...partyA, stance: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div className="hidden lg:flex flex-col justify-center items-center">
          <div className="bg-slate-800 text-white font-black text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10 font-cute">
            VS
          </div>
        </div>

        {/* Party B Side - Pink/Red Theme */}
        <div className="flex-1 bg-white p-6 md:p-8 rounded-3xl shadow-lg border-t-8 border-pink-400">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-xl">🍓</div>
            <h3 className="text-xl font-bold text-slate-700">乙方 (Red Team)</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">你的名字/昵称</label>
              <input 
                type="text" 
                placeholder="例如：小红"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                value={partyB.name}
                onChange={(e) => setPartyB({...partyB, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">发生了什么？(陈述)</label>
              <textarea 
                rows={5}
                placeholder="描述一下事情的经过... 我只是按她的要求做的啊！"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition resize-none"
                value={partyB.statement}
                onChange={(e) => setPartyB({...partyB, statement: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">你认为你为什么是对的？(立场)</label>
              <textarea 
                rows={2}
                placeholder="从技术上讲，她说的是..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none transition resize-none"
                value={partyB.stance}
                onChange={(e) => setPartyB({...partyB, stance: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Submit Button for Mobile / Fixed for Desktop */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 lg:static lg:bg-transparent lg:border-none lg:p-0 lg:mt-10 flex justify-center z-20">
        <button
          disabled={!isFormValid}
          onClick={() => onSubmit({ partyA, partyB })}
          className={`
            w-full md:w-auto py-4 px-12 rounded-2xl text-lg font-bold shadow-xl flex items-center justify-center gap-3 transition-all
            ${isFormValid 
              ? 'bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 hover:-translate-y-1 cursor-pointer' 
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'}
          `}
        >
          <span>⚖️</span>
          <span>请求巴卡比法官裁决</span>
        </button>
      </div>
    </div>
  );
};

export default ArgumentForm;
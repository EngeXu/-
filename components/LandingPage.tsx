import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      
      {/* Badge */}
      <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-6 shadow-sm">
        ⚖️ 现已开庭
      </div>

      {/* Main Title */}
      <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-2 drop-shadow-sm font-cute">
        巴卡比法官
      </h1>
      <h2 className="text-xl md:text-3xl font-bold text-orange-500 mb-8 font-cute">
        萌宠断案庭
      </h2>

      {/* Hero Image / Avatar */}
      <div className="relative mb-8 group cursor-pointer">
        <div className="absolute inset-0 bg-orange-200 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <img 
          src="https://picsum.photos/id/1025/400/400" 
          alt="Judge Dog" 
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 border-white shadow-2xl wiggle"
        />
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-orange-100">
           <span className="text-2xl">⚖️</span>
        </div>
      </div>

      {/* Description */}
      <p className="max-w-md text-slate-600 mb-10 text-lg leading-relaxed">
        吵架了？有误会？谁又不倒垃圾了？
        <br/>
        让公正又可爱的狗狗法官来决定谁该请谁喝奶茶。
      </p>

      {/* CTA Button */}
      <button 
        onClick={onStart}
        className="bg-slate-800 hover:bg-slate-700 text-white text-lg font-bold py-4 px-10 rounded-2xl shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center gap-3"
      >
        <span>🔨</span>
        <span>进入法庭</span>
      </button>

      <div className="mt-12 flex gap-4 text-slate-400 text-sm">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span> 公平
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span> 公正
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span> 超级乖
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
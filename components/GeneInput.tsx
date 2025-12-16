
import React, { useState } from 'react';

interface GeneInputProps {
  onAnalyze: (genes: string[]) => void;
  isLoading: boolean;
}

const GeneInput: React.FC<GeneInputProps> = ({ onAnalyze, isLoading }) => {
  const [inputText, setInputText] = useState('TP53\nKRAS\nEGFR\nBRAF\nPTEN\nCDK2\nRB1\nBRCA1\nBRCA2\nATM');

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    const genes = inputText
      .split(/[\n,;\s]+/)
      .map(g => g.trim())
      .filter(g => g.length > 0);
    onAnalyze(genes);
  };

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-8">
      <div className="flex justify-between items-end mb-4">
         <h2 className="text-xl font-semibold text-slate-800">Input Gene Set</h2>
         <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">Supported: Symbol, Ensembl, Entrez</span>
      </div>
      
      <div className="relative">
        <textarea
          className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none resize-y transition-all placeholder-slate-400"
          placeholder="Paste your gene list here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100">Ready</span>
            <span>{inputText.split('\n').filter(l => l.trim()).length} genes identified</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !inputText.trim()}
            className={`px-6 py-2.5 rounded-lg font-semibold text-white shadow-sm transition-all
              ${isLoading 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'
              }`}
          >
            {isLoading ? 'Running Analysis...' : 'Run EnrichRAG'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GeneInput;


import React, { useState, useRef, useEffect } from 'react';
import GeneInput from './components/GeneInput';
import EnrichmentSection from './components/EnrichmentSection';
import IntegratedView from './components/IntegratedView';
import Interpretation from './components/Interpretation';
import PaperSection from './components/PaperSection';
import { analyzeGeneSet } from './services/mockService';
import { EnrichmentData } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<EnrichmentData | null>(null);
  const [loading, setLoading] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (genes: string[]) => {
    setLoading(true);
    setData(null); // Reset previous results
    try {
      const result = await analyzeGeneSet(genes);
      setData(result);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("An unexpected error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && resultsRef.current) {
      // Small delay to ensure render is complete before scrolling
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm/50 backdrop-blur-sm bg-white/90">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">E</div>
             <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                  Enrich<span className="text-blue-600">RAG</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Research Edition</p>
             </div>
          </div>
          <nav className="hidden sm:flex gap-6">
             <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Methodology</a>
             <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">API</a>
             <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">GitHub</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Section 1: Input */}
        <GeneInput onAnalyze={handleAnalyze} isLoading={loading} />

        {/* Loading Indicator */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-b-blue-300 rounded-full animate-spin-reverse opacity-50"></div>
            </div>
            <p className="text-slate-600 font-medium mt-4 animate-pulse">Retrieving literature & integrating databases...</p>
          </div>
        )}

        {/* Results Container */}
        {data && (
          <div className="animate-fade-in space-y-10" ref={resultsRef}>
            
            {/* Section 2: Enrichment Results */}
            <EnrichmentSection data={data} />
            
            {/* Section 3: Integrated View */}
            <IntegratedView themes={data.integrated} />

            {/* Section 4: AI Interpretation */}
            <Interpretation summary={data.aiSummary} />

            {/* Section 5: Papers (RAG Evidence) */}
            <PaperSection papers={data.papers} />
            
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 text-center text-slate-400 text-sm py-8 border-t border-slate-200 mt-12">
        <p className="mb-2">&copy; 2024 EnrichRAG. For research purposes only.</p>
        <div className="flex justify-center gap-4 text-xs">
           <a href="#" className="hover:text-slate-600">Privacy</a>
           <a href="#" className="hover:text-slate-600">Terms</a>
           <a href="#" className="hover:text-slate-600">Citation</a>
        </div>
      </footer>
    </div>
  );
};

export default App;

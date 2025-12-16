
import React, { useState } from 'react';
import { Paper } from '../types';

interface PaperSectionProps {
  papers: Paper[];
}

const PaperSection: React.FC<PaperSectionProps> = ({ papers }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Literature Evidence</h2>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">RAG Retrieved</span>
      </div>
      
      <div className="divide-y divide-gray-100">
        {papers.map((paper) => (
          <div key={paper.id} className="p-6 hover:bg-slate-50 transition-colors">
            <div 
              className="cursor-pointer"
              onClick={() => toggleExpand(paper.id)}
            >
              <h3 className="text-md font-bold text-blue-800 hover:text-blue-600 leading-snug mb-1">
                {paper.title}
              </h3>
              <div className="text-sm text-gray-500 mb-2">
                {paper.authors} • <span className="italic">{paper.journal}</span> • {paper.year}
              </div>
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedId === paper.id ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
              <div className="bg-slate-50 p-4 rounded border border-slate-100 text-sm text-slate-700 leading-relaxed relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-400 rounded-l"></div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">Abstract</h4>
                {paper.abstract}
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); toggleExpand(paper.id); }}
              className="text-xs font-medium text-gray-400 mt-2 hover:text-gray-600 flex items-center"
            >
              {expandedId === paper.id ? 'Collapse abstract' : 'Show abstract'}
              <svg className={`w-3 h-3 ml-1 transform transition-transform ${expandedId === paper.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        ))}
        {papers.length === 0 && (
          <div className="p-8 text-center text-gray-500">No relevant literature found.</div>
        )}
      </div>
    </section>
  );
};

export default PaperSection;

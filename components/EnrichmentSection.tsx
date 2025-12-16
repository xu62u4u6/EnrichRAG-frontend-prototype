import React, { useState } from 'react';
import { EnrichmentData, DatabaseType } from '../types';
import ResultsTable from './ResultsTable';

interface EnrichmentSectionProps {
  data: EnrichmentData;
}

const EnrichmentSection: React.FC<EnrichmentSectionProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<DatabaseType>('GO');

  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8 overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Enrichment Results</h2>
        <div className="flex space-x-2 bg-gray-200/50 p-1 rounded-lg">
          {(['GO', 'KEGG'] as DatabaseType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all
                ${activeTab === tab 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="min-h-[300px]">
        {activeTab === 'GO' && <ResultsTable data={data.results.GO} />}
        {activeTab === 'KEGG' && <ResultsTable data={data.results.KEGG} />}
      </div>
    </section>
  );
};

export default EnrichmentSection;
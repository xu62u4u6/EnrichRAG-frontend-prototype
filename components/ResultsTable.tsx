import React, { useState } from 'react';
import { GeneResult } from '../types';

interface ResultsTableProps {
  data: GeneResult[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (data.length === 0) {
    return <div className="p-8 text-center text-gray-500 italic">No significant enrichment found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/2">Term</th>
            <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/4">Adj. p-value</th>
            <th className="py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/4">Coverage</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((row) => (
            <React.Fragment key={row.id}>
              <tr 
                className={`hover:bg-blue-50 cursor-pointer transition-colors ${expandedId === row.id ? 'bg-blue-50' : ''}`}
                onClick={() => toggleExpand(row.id)}
              >
                <td className="py-3 px-4 text-sm font-medium text-gray-800">
                  <div className="flex items-center">
                     <span className={`mr-2 transform transition-transform text-gray-400 text-xs ${expandedId === row.id ? 'rotate-90' : ''}`}>
                       ▶
                     </span>
                     {row.term}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 font-mono">
                  {row.adjP.toExponential(2)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {row.genes.length} / {row.totalGenesInSet}
                </td>
              </tr>
              {expandedId === row.id && (
                <tr className="bg-gray-50/50">
                  <td colSpan={3} className="py-3 px-8 text-xs text-gray-500">
                    <div className="mb-1 font-semibold text-gray-600">Genes:</div>
                    <div className="flex flex-wrap gap-1">
                      {row.genes.map(gene => (
                        <span key={gene} className="bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-700">
                          {gene}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
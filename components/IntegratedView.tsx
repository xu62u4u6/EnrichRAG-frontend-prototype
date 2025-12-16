import React from 'react';
import { IntegratedTheme } from '../types';

interface IntegratedViewProps {
  themes: IntegratedTheme[];
}

const IntegratedView: React.FC<IntegratedViewProps> = ({ themes }) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
       <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">Integrated View</h2>
        <p className="text-sm text-gray-500 mt-1">Consensus themes identified across multiple databases</p>
      </div>

      <div className="p-6 grid gap-4">
        {themes.map((theme) => (
          <div key={theme.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{theme.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-xs font-semibold text-gray-500 uppercase">Sources:</span>
                   {theme.sources.map(src => (
                     <span key={src} className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">{src}</span>
                   ))}
                </div>
              </div>
              <div className="text-right">
                <span className="block text-sm font-semibold text-blue-600">Coverage</span>
                <span className="block text-sm text-gray-600">{theme.coverage}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {theme.details.GO && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">GO Terms</h4>
                  <ul className="space-y-1">
                    {theme.details.GO.map(t => (
                      <li key={t} className="text-sm text-gray-700 flex items-start">
                        <span className="text-blue-400 mr-2">•</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
               {theme.details.KEGG && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">KEGG Pathways</h4>
                  <ul className="space-y-1">
                    {theme.details.KEGG.map(t => (
                      <li key={t} className="text-sm text-gray-700 flex items-start">
                        <span className="text-green-500 mr-2">•</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {themes.length === 0 && (
           <div className="text-center text-gray-500 py-4">No consensus themes found.</div>
        )}
      </div>
    </section>
  );
};

export default IntegratedView;

export interface GeneResult {
  id: string;
  term: string;
  adjP: number;
  genes: string[];
  totalGenesInSet: number;
}

export interface IntegratedTheme {
  id: string;
  name: string;
  sources: ('GO' | 'KEGG')[];
  coverage: string;
  details: {
    GO?: string[];
    KEGG?: string[];
  };
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract: string;
  url?: string;
}

export interface EnrichmentData {
  input_genes: string[];
  results: {
    GO: GeneResult[];
    KEGG: GeneResult[];
  };
  integrated: IntegratedTheme[];
  aiSummary: string;
  papers: Paper[];
}

export type DatabaseType = 'GO' | 'KEGG';

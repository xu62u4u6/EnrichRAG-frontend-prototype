
import { EnrichmentData } from '../types';

export const analyzeGeneSet = async (genes: string[]): Promise<EnrichmentData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response regardless of input for this demo
  return {
    input_genes: genes.length > 0 ? genes : ['TP53', 'KRAS', 'EGFR', 'BRAF'],
    results: {
      GO: [
        {
          id: 'GO:0006915',
          term: 'apoptotic process',
          adjP: 1.2e-4,
          genes: ['TP53', 'KRAS', 'EGFR', 'BAX', 'CASP3'],
          totalGenesInSet: 20
        },
        {
          id: 'GO:0007049',
          term: 'cell cycle',
          adjP: 3.5e-4,
          genes: ['TP53', 'CDK2', 'CCNE1', 'RB1'],
          totalGenesInSet: 20
        },
        {
          id: 'GO:0008283',
          term: 'cell proliferation',
          adjP: 4.1e-3,
          genes: ['EGFR', 'BRAF', 'KRAS', 'MAPK1'],
          totalGenesInSet: 20
        },
        {
          id: 'GO:0043066',
          term: 'negative regulation of apoptotic process',
          adjP: 0.012,
          genes: ['BCL2', 'MCL1'],
          totalGenesInSet: 20
        },
        {
          id: 'GO:0006281',
          term: 'DNA repair',
          adjP: 0.045,
          genes: ['BRCA1', 'BRCA2', 'ATM'],
          totalGenesInSet: 20
        }
      ],
      KEGG: [
        {
          id: 'hsa04115',
          term: 'p53 signaling pathway',
          adjP: 2.1e-5,
          genes: ['TP53', 'CDK2', 'BAX', 'MDM2'],
          totalGenesInSet: 20
        },
        {
          id: 'hsa05200',
          term: 'Pathways in cancer',
          adjP: 5.6e-5,
          genes: ['TP53', 'KRAS', 'EGFR', 'BRAF', 'STAT3'],
          totalGenesInSet: 20
        },
        {
          id: 'hsa04110',
          term: 'Cell cycle',
          adjP: 1.1e-3,
          genes: ['CDK2', 'CCNE1', 'RB1', 'TP53'],
          totalGenesInSet: 20
        }
      ]
    },
    integrated: [
      {
        id: 'theme-1',
        name: 'Cell Cycle Regulation',
        sources: ['GO', 'KEGG'],
        coverage: '6 / 20',
        details: {
          GO: ['cell cycle', 'cell proliferation'],
          KEGG: ['Cell cycle', 'p53 signaling pathway']
        }
      },
      {
        id: 'theme-2',
        name: 'Apoptosis / Cell Death',
        sources: ['GO', 'KEGG'],
        coverage: '5 / 20',
        details: {
          GO: ['apoptotic process', 'negative regulation of apoptotic process'],
          KEGG: ['p53 signaling pathway']
        }
      }
    ],
    aiSummary: "The input gene set demonstrates a robust enrichment in cell cycle regulation and apoptotic pathways across multiple databases. This suggests a systemic dysregulation of proliferative control mechanisms, characteristic of oncogenic transformation. Specifically, the convergence of TP53, KRAS, and EGFR on 'Pathways in cancer' (KEGG) and 'negative regulation of apoptotic process' (GO) indicates a dual mechanism of uncontrolled growth and evasion of cell death. The presence of DNA repair genes (BRCA1, BRCA2) further points towards genomic instability as a potential driving factor.",
    papers: [
      {
        id: 'pmid-3456789',
        title: 'Mutant p53 and KRAS: Partners in crime in pancreatic cancer',
        authors: 'Smith A, Jones B, et al.',
        journal: 'Nature Reviews Cancer',
        year: 2023,
        abstract: 'This review highlights the synergistic effects of p53 and KRAS mutations in driving pancreatic tumorigenesis. We discuss how these oncogenes cooperate to rewire metabolic pathways and suppress immune surveillance, providing new targets for therapeutic intervention.'
      },
      {
        id: 'pmid-9876543',
        title: 'EGFR signaling in cell cycle control and apoptosis',
        authors: 'Chen L, Wang X.',
        journal: 'Cell Signaling',
        year: 2022,
        abstract: 'Epidermal growth factor receptor (EGFR) signaling is pivotal in regulating cell survival and proliferation. This study demonstrates that aberrant EGFR activation leads to the upregulation of anti-apoptotic proteins BCL2 and MCL1, thereby conferring resistance to chemotherapy-induced apoptosis.'
      },
      {
        id: 'pmid-1234567',
        title: 'Targeting the MAPK pathway in BRAF-mutant cancers',
        authors: 'Doe J, Miller R.',
        journal: 'Journal of Clinical Oncology',
        year: 2021,
        abstract: 'BRAF mutations constitutively activate the MAPK signaling cascade, promoting cell proliferation. This paper summarizes clinical trial data on next-generation BRAF inhibitors and explores resistance mechanisms involving feedback activation of EGFR.'
      }
    ]
  };
};

export interface LitigantData {
  name: string;
  statement: string;
  stance: string;
}

export interface CaseData {
  partyA: LitigantData;
  partyB: LitigantData;
}

export interface Verdict {
  winner: 'Party A' | 'Party B' | 'Tie';
  winnerName: string;
  scoreA: number;
  scoreB: number;
  summary: string;
  analysis: string;
  advice: string;
  humorousComment: string; // A dog pun or joke
}

export type AppView = 'landing' | 'form' | 'loading' | 'verdict';
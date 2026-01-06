
export enum ProposalStep {
  START = 'START',
  OPENING = 'OPENING',
  MAIN_MESSAGE = 'MAIN_MESSAGE',
  PROMISES = 'PROMISES',
  PROPOSAL = 'PROPOSAL',
  ACCEPTED = 'ACCEPTED',
  FINALE = 'FINALE'
}

export interface FloatingItem {
  id: number;
  type: 'heart' | 'star' | 'petal';
  left: string;
  duration: string;
  size: string;
  delay: string;
  color: string;
}

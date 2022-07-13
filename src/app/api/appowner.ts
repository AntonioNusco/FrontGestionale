import { Applicazione } from './applicazione';
export interface AppOwner {
  idAppOwner?: number;
  nome?: string;
  cognome?: string;
  email?: string;
  cell?: string;
  dsUnit?: string;
  applicazioni?: Applicazione;
  nomeCognomeOwner?: string;
}

import { Rescan } from './rescan';
import { AppOwner } from './appowner';
import { Time } from '@angular/common';
export interface Applicazione {
  idApplicazione?: number;
  nome_App?: string;
  apmCode?: string;
  ownerOnboarding?: string;
  ownerAFP?: string;
  gdsUnit?: string;
  tecnologia?: string;
  serverManager?: string;
  soloCMS?: string;
  nodoConsole?: number;
  macchina?: string;
  noteOnboarding?: string;
  fase?: string;
  afpStatus?: string;
  pubblicatoDashboard?: string;
  noteAppOwner?: string;
  avgAnalysisTime?: number;
  jiraautomationActivation?: string;
  repoAvailability?: string;
  automationStatus?: string;
  automationEnablingDate?: Date;
  automationNotes?: string;
  greenItIndex?: string;
  insertedInCastProgram?: string;
  stakeholderEngagement?: string;
  launchingMeetingDataGatheringStarting?: Time;
  stakeholderBrief?: string;
  onBoardingKitDelivery?: string;
  onboardingKitClosing?: string
  sourceCodeFinalDelivery?: string;
  primaRestitution?: string;
  done?: boolean;
  linkConfluence?: string;
  businessCriticality?: string;
  devMethodology?: string;
  provider?: string;
  exist?: boolean;
  owners?: AppOwner;
  idRescans?: number;
}

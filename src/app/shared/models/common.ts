import {TableData} from '../../Components/table/table.component';

export interface DanceTantraSection {
  id: string;
  icon: string;
  label: string;
  eyebrow: string;
  title: string;
  markdownCsPath: string;
  markdownEnPath: string;
  pricingData?: TableData;
}

export const DefaultDanceTantraSections: DanceTantraSection[] = [
  {
    id: 'default',
    icon: 'bi-link-45deg',
    label: 'DefaultLabel',
    eyebrow: 'Default Eyebrow',
    title: 'Default Title',
    markdownCsPath: '/markdown/services/default.cs.md',
    markdownEnPath: '/markdown/services/default.en.md'
  }
]

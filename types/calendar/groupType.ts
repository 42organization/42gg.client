export interface ScheduleGroup {
  id?: number;
  classification?: string;
  title: string;
  backgroundColor: string;
  checked?: boolean;
}

export const groupColorTypes = {
  purple: '#9C57BC',
  green: '#7DC163',
  red: '#E6634F',
  yellow: '#FFDD47',
  orange: '#FFA646',
  blue: '#357BE5',
};

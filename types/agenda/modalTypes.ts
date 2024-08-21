type AgendaModalType = 'notice' | 'proceedCheck' | 'modify';
export interface agendaModal {
  type: AgendaModalType;
  title?: string;
  description: string;
  // 체크할 필요가 있는 내용 있을 때 (예시:폼 제출시 값 확인)
  contentsToCheck?: { [key: string]: string };
  onProceed?: () => void;
  onCancel?: () => void;
  proceedText?: string;
  cancelText?: string;
  // 추가 버튼이 필요할 때
  extraButtons?: { text: string; callback: (e: React.MouseEvent) => void }[];

  FormComponent?: React.FC<any>;
  data?: any;
  stringKey?: string;
  isAdmin?: boolean;
}

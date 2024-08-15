export interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  discription?: string;
  max?: number;
  min?: number;
  checked?: boolean; // 체크박스
  className?: string;
  rest?: Record<string, unknown> | undefined;
  defaultValue?: string;
}

export interface SelectInputProps {
  options: string[];
  message?: string;
  selected?: string;
  label?: string;
  name: string;
  onChange?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    selected: boolean
  ) => void;
}

export interface CheckboxProps {
  name: string;
  label: string;
  options?: string[];
  discription?: string;
  checked?: boolean;
  rest?: Record<string, unknown> | undefined;
}

export interface CountInputProps {
  name: string;
  label: string;
  min: number;
  max: number;
  value?: number; // 초기값
  step?: number; // 숫자 사이 간격
  placeholder?: string;
  rest?: Record<string, unknown> | undefined;
}

export interface DescriptionProps {
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  rest?: Record<string, unknown> | undefined;
}

export interface ImageProps {
  name: string;
  label: string;
  discription?: string;
  rest?: Record<string, unknown> | undefined;
}

export interface DateInputProps {
  name: string;
  label: string;
  min?: string;
  max?: string;
  defaultValue?: string;
  rest?: Record<string, unknown> | undefined;
}

export interface TitleInputProps {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  rest?: Record<string, unknown> | undefined;
}

import { InputHTMLAttributes } from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  iconName?: string;
  onIconClick?: () => void;
}

const InputField = ({
  onChange,
  iconName,
  onIconClick,
  ...props
}: InputFieldProps) => {
  return (
    <div className={styles.inputField}>
      <input {...props} onChange={onChange} />
      {iconName && <i className={iconName} onClick={onIconClick}></i>}
    </div>
  );
};

export default InputField;

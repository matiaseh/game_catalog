import styles from './Checkbox.module.scss';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled,
  id,
}: CheckboxProps) => {
  return (
    <div className={styles.container}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkbox}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`${styles.label} ${disabled ? styles.disabled : ''}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

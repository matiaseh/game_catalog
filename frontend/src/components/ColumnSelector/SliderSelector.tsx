import styles from './SliderSelector.module.scss';

interface SliderSelectorProps {
  value: number;
  options: number[];
  handleChange: (option: number) => void;
}

const SliderSelector = ({
  options,
  value,
  handleChange,
}: SliderSelectorProps) => {
  const getFillClass = () => {
    if (value === 2) return styles.fill2;
    if (value === 3) return styles.fill3;
    return styles.fill4;
  };
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.fillBackground} />
      <div className={`${styles.fill} ${getFillClass()}`} />
      <div className={styles.bubbles}>
        {options.map((option) => (
          <div
            key={option}
            className={`${styles.bubble} ${value >= option ? styles.active : ''}`}
            role="button"
            onClick={() => handleChange(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderSelector;

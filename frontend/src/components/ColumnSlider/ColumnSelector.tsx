import sliderStyles from './ColumnSelector.module.scss';

interface ColumnSliderProps {
  value: number;
  options: number[];
  handleChange: (option: number) => void;
}

const ColumnSelector = ({
  options,
  value,
  handleChange,
}: ColumnSliderProps) => {
  const getFillClass = () => {
    if (value === 2) return sliderStyles.fill2;
    if (value === 3) return sliderStyles.fill3;
    return sliderStyles.fill4;
  };
  return (
    <div className={sliderStyles.sliderContainer}>
      <div className={sliderStyles.fillBackground} />
      <div className={`${sliderStyles.fill} ${getFillClass()}`} />
      <div className={sliderStyles.bubbles}>
        {options.map((option) => (
          <div
            key={option}
            className={`${sliderStyles.bubble} ${value >= option ? sliderStyles.active : ''}`}
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

export default ColumnSelector;

import React, { useEffect, useState } from "react";
import styles from "./options.module.css";

interface optionsType {
  label: String;
  value: any;
}

interface selectedProps {
  isMultiple?: Boolean;
  selectedArray?: optionsType[] | undefined;
  clearSelectedArr: () => void;
  options: optionsType[];
  value: optionsType | undefined;
  onChange: (o: optionsType | undefined) => void;
}

const Option = ({
  isMultiple,
  selectedArray,
  clearSelectedArr,
  options,
  value,
  onChange,
}: selectedProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [HighlitedIndex, setHighlitedIndex] = useState(0);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setHighlitedIndex(0);
  }, [isOpen]);

  return (
    <div
      className={styles.container}
      tabIndex={1}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(true)}
    >
      {isMultiple ? (
        <div className={styles.valuearr}>
          {selectedArray?.map((item) => (
            <h3
              key={item.value}
              className={styles.valuearritem}
              onClick={(e) => {
                e.stopPropagation();
                const index = selectedArray?.indexOf(item) || -9;
                selectedArray = selectedArray?.splice(index, 1);

                setRender(!render);
              }}
            >
              {item.label} <span>X</span>
            </h3>
          ))}
        </div>
      ) : (
        <h3 className={styles.value}>{value?.label}</h3>
      )}

      <p
        className={styles.clearBTN}
        onClick={(e) => {
          //   e.stopPropagation();
          setIsOpen(false);
          onChange(undefined);
          setRender(!render);
          clearSelectedArr();
          selectedArray = [];
        }}
      >
        x
      </p>
      <p
        className={styles.openBTN}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? "-" : "+"}
      </p>

      <ul className={`${styles.myOptions}  ${isOpen || styles.hided}`}>
        {options.map((option, i) => {
          return (
            <li
              className={`
              ${styles.option}  
                ${
                  !isMultiple &&
                  option.value === value?.value &&
                  styles.selectedOption
                }
              ${i === HighlitedIndex && styles.optionHover}
              ${selectedArray?.includes(option) && styles.selectedOption}
              
              `}
              key={option.value}
              onMouseEnter={() => setHighlitedIndex(i)}
              onClick={(e) => {
                e.stopPropagation();

                if (isMultiple) {
                  if (selectedArray?.indexOf(option) === -1) {
                    selectedArray?.push(option);
                  } else {
                    const index = selectedArray?.indexOf(option) || -9;
                    selectedArray?.splice(index, 1);
                  }
                } else {
                  onChange(option);
                }

                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Option;

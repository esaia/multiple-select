import { useState } from "react";
import Option from "./Option";
import style from "./main.module.css";
function App() {
  interface optionsType {
    label: String;
    value: any;
  }

  const options: optionsType[] = [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
    { label: "Fourth", value: 4 },
    { label: "Fifth", value: 5 },
  ];

  const [value, setValue] = useState<optionsType | undefined>(options[0]);

  const [selectedArray, setSelectedArray] = useState<optionsType[] | undefined>(
    []
  );
  return (
    <div className={style.mainContainer}>
      <Option
        options={options}
        value={value}
        onChange={(v) => setValue(v)}
        isMultiple={true}
        selectedArray={selectedArray}
        clearSelectedArr={() => setSelectedArray([])}
      />
    </div>
  );
}

export default App;

import React from "react";
import type { DatasetKey } from "../types";

type Selection = DatasetKey | "None";

interface RadioGroupProps {
  datasets: Record<DatasetKey, unknown>;
  selected: Selection;
  onChange: (key: Selection) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  datasets,
  selected,
  onChange,
}) => {
  const datasetKeys = Object.keys(datasets) as DatasetKey[];

  return (
    <div className="radio-group">
      {datasetKeys.map((key) => (
        <RadioOption
          key={key}
          value={key}
          label={key.toUpperCase()}
          checked={selected === key}
          onChange={onChange}
        />
      ))}
      <RadioOption
        value="None"
        label="Clear"
        checked={selected === "None"}
        onChange={onChange}
      />
    </div>
  );
};

export default RadioGroup;

interface RadioOptionProps {
  value: Selection;
  label: string;
  checked: boolean;
  onChange: (key: Selection) => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  value,
  label,
  checked,
  onChange,
}) => (
  <label className={`radio-option ${checked ? "selected" : ""}`}>
    <input
      type="radio"
      name="dataset"
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
    />
    <span className="label-text">{label}</span>
  </label>
);

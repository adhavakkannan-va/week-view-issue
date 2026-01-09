import { useMemo, useState } from "react";
import type { FirstDayOfWeek } from "devextreme/common";

import { datasets } from "./data";
import type { DatasetKey } from "./types";
import GanttView from "./components/GanttView";
import RadioGroup from "./components/RadioGroup";

type Selection = DatasetKey | "None";

const App: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<Selection>("None");

  const current = useMemo(() => {
    if (selectedDataset === "None") return null;
    return datasets[selectedDataset] ?? null;
  }, [selectedDataset]);

  const handleChange = (key: Selection) => setSelectedDataset(key);

  const renderContent = () => {
    if (!current) {
      return (
        <div className="no-data gantt-wrapper">Select a week to continue</div>
      );
    }

    return (
      <div className="gantt-wrapper">
        <GanttView
          height={350}
          data={current.tasks}
          toDate={new Date(current.toDate)}
          fromDate={new Date(current.fromDate)}
          firstDayOfWeek={current.firstDayOfWeek as FirstDayOfWeek}
        />
      </div>
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>📊 Gantt Week Alignment Demo</h1>
        <p>
          Select a dataset to reproduce the week misalignment issue. Hover on
          Scale to see Tooltip.
        </p>
      </header>

      <h2>
        First Day of Week :{" "}
        {selectedDataset === "None" ? "NONE" : selectedDataset.toUpperCase()}
      </h2>

      <RadioGroup
        datasets={datasets}
        onChange={handleChange}
        selected={selectedDataset}
      />

      {renderContent()}
    </div>
  );
};

export default App;

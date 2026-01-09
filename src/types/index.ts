import type { FirstDayOfWeek } from "devextreme/common";
import type { datasets } from "../data";

export type Task = {
  id: number;
  title: string;
  progress: number;
  end: string | Date;
  start: string | Date;
};

export type GanttViewProps = {
  data: Task[];
  toDate: Date;
  fromDate: Date;
  height?: number;
  taskListWidth?: number;
  firstDayOfWeek?: FirstDayOfWeek;
};

export interface HeaderTooltip {
  x: number;
  y: number;
  text: string;
}

export type DatasetKey = keyof typeof datasets;

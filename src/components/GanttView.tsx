import dayjs from "dayjs";
import { useCallback, useState } from "react";
import Gantt, { Tasks, Column } from "devextreme-react/gantt";

import { TooltipPortal } from "./Tooltip";
import { getMonthLabel, getWeekLabel } from "../utils";
import type { GanttViewProps, HeaderTooltip } from "../types";

const GanttView = ({
  data,
  toDate,
  fromDate,
  height = 400,
  firstDayOfWeek = 0,
  taskListWidth = 500,
}: GanttViewProps) => {
  const [headerTooltip, setHeaderTooltip] = useState<HeaderTooltip | null>(
    null
  );

  const handleHeaderMouseEnter = useCallback(
    (event: MouseEvent, tooltipText: string) => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setHeaderTooltip({
        text: tooltipText,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    },
    []
  );

  const handleHeaderMouseLeave = useCallback(() => {
    setHeaderTooltip(null);
  }, []);
  const handleScaleCellPrepared = useCallback(
    (e: {
      endDate: Date;
      startDate: Date;
      scaleType: string;
      scaleIndex: number;
      scaleElement: HTMLElement;
    }) => {
      const { endDate, scaleType, startDate, scaleIndex, scaleElement } = e;

      scaleElement.removeAttribute("title");
      scaleElement.innerText = "";
      scaleElement.style.backgroundColor = "";

      if (scaleIndex === 1) {
        const data = getMonthLabel(startDate);
        scaleElement.innerText = data;
        scaleElement.style.textAlign = "left";
        scaleElement.onmouseenter = (ev) => handleHeaderMouseEnter(ev, data);
        scaleElement.onmouseleave = handleHeaderMouseLeave;
      }

      if (scaleIndex === 0) {
        if (scaleType === "weeks") {
          const weekLabel = getWeekLabel(startDate, endDate);
          scaleElement.innerText = weekLabel;
          scaleElement.onmouseenter = (ev) =>
            handleHeaderMouseEnter(ev, weekLabel);
          scaleElement.onmouseleave = handleHeaderMouseLeave;
        }
      }
    },
    [handleHeaderMouseEnter, handleHeaderMouseLeave]
  );

  return (
    <div>
      <Gantt
        height={height}
        scaleType={"weeks"}
        taskListWidth={taskListWidth}
        firstDayOfWeek={firstDayOfWeek}
        onScaleCellPrepared={handleScaleCellPrepared}
        endDateRange={dayjs(toDate).endOf("day").toDate()}
        startDateRange={dayjs(fromDate).startOf("day").toDate()}
      >
        <Tasks
          keyExpr="id"
          endExpr="end"
          dataSource={data}
          titleExpr="title"
          startExpr="start"
          progressExpr="progress"
          parentIdExpr="parentId"
        />

        <Column dataField="title" caption="Subject" width={200} />
        <Column dataField="start" caption="Start Date" />
        <Column dataField="end" caption="End Date" />
      </Gantt>
      <TooltipPortal tooltip={headerTooltip} />
    </div>
  );
};

export default GanttView;

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export const Tab1Content = () => {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: 100000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: `55vh`,
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <h1 className="bg-white p-1">Row {virtualItem.index}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

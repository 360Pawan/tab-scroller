"use client";

import { useEffect, useRef, useState } from "react";
import { Tab1Content } from "./Tab1Content";

export const ScrollableTabs = () => {
  const [tabs, setTabs] = useState([
    { name: "tab1", isActive: true },
    { name: "tab2", isActive: false },
    { name: "tab3", isActive: false },
  ]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");

            if (entry.intersectionRatio > 0.4) {
              setTabs((prevTabs) =>
                prevTabs.map((tab) =>
                  tab.name.toLowerCase().replace(/\s/g, "") === id
                    ? { ...tab, isActive: true }
                    : { ...tab, isActive: false }
                )
              );
            }
          });
        },
        { threshold: 0.4 }
      );

      const currentObserver = observer.current;
      document.querySelectorAll("[datatype='observe']").forEach((section) => {
        currentObserver.observe(section);
      });

      return () => {
        currentObserver.disconnect();
      };
    }
  }, []);

  const handleTabClick = (name: string) => {
    const updatedTabs = tabs.map((tab) =>
      tab.name.toLowerCase() === name.toLowerCase()
        ? { ...tab, isActive: true }
        : { ...tab, isActive: false }
    );

    setTabs(updatedTabs);

    const flexNode = sectionRef.current as HTMLElement | null;

    if (flexNode) {
      const activeTab = updatedTabs.find((tab) => tab.isActive);

      if (activeTab) {
        const index = updatedTabs.indexOf(activeTab);
        const tabContent = flexNode.children[index];
        if (tabContent) {
          tabContent.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
  };

  return (
    <div className="h-[70vh] w-[70vw] border rounded-md">
      <div className="flex p-5 items-center gap-5 border-b">
        {tabs.map((tab, i) => {
          return (
            <button
              key={i}
              onClick={() => handleTabClick(tab.name)}
              className={`p-3 border rounded-md ${
                tab.isActive ? "bg-blue-400" : ""
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
      <div className="h-[60vh] overflow-y-auto" ref={sectionRef}>
        <div id="tab1" datatype="observe" className="p-5 w-2/3 bg-red-100">
          <Tab1Content />
          {/* {Array.from({ length: 500 }).map((_, i) => (
            <h1 key={i}>test</h1>
          ))} */}
        </div>
        <div id="tab2" datatype="observe" className="p-5  w-2/3 bg-yellow-100">
          <Tab1Content />
          {/* {Array.from({ length: 500 }).map((_, i) => (
            <h1 key={i}>test</h1>
          ))} */}
        </div>
        <div id="tab3" datatype="observe" className="p-5  w-2/3 bg-green-100">
          <Tab1Content />
          {/* {Array.from({ length: 50000 }).map((_, i) => (
            <h1 key={i}>test</h1>
          ))} */}
        </div>
      </div>
    </div>
  );
};

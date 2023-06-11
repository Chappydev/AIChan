import { useCallback, useEffect, useRef, useState } from "react";

const useChips = (options) => {
  const [firstHiddenInd, setFirstHiddenInd] = useState(options.length);
  const containerRef = useRef();

  // function triggers its own recreation if the chips overflow
  // and the useEffect retriggers it when the function changes
  // thus causing a loop until we have the max number of chips
  // without overflow
  const updateChips = useCallback(() => {
    if (
      containerRef?.current?.scrollWidth > containerRef?.current?.offsetWidth && firstHiddenInd >= 0
    ) {
      setFirstHiddenInd(firstHiddenInd - 1);
    }
  }, [containerRef, firstHiddenInd]);

  useEffect(() => {
    updateChips();
  }, [updateChips]);

  useEffect(() => {
    let timeout;

    // reset otherwise an increase in space won't increase # of visible chips
    const resetAndUpdateChips = () => {
      clearTimeout(timeout);

      // reset options and resize from there
      timeout = setTimeout(() => {
        setFirstHiddenInd(options.length);
        updateChips();
      }, 300);
    };

    window.addEventListener("resize", resetAndUpdateChips);
    return () => window.removeEventListener("resize", resetAndUpdateChips);
  }, [updateChips, options]);

  return [
    options.slice(0, firstHiddenInd) || [],
    options.slice(firstHiddenInd) || [],
    containerRef,
  ];
};

export default useChips;

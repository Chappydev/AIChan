import { useCallback, useEffect, useRef, useState } from "react";

const useChips = (options) => {
  const [visibleOptions, setVisibleOptions] = useState(options);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const containerRef = useRef();

  // function triggers its own recreation if the chips overflow
  // and the useEffect retriggers it when the function changes
  // thus causing a loop until we have the max number of chips
  // without overflow
  const updateChips = useCallback(() => {
    if (
      containerRef?.current?.scrollWidth > containerRef?.current?.offsetWidth
    ) {
      console.log(
        [visibleOptions[visibleOptions.length - 1], ...hiddenOptions],
        visibleOptions.slice(0, visibleOptions.length)
      );
      setHiddenOptions([
        visibleOptions[visibleOptions.length - 1],
        ...hiddenOptions,
      ]);
      setVisibleOptions(visibleOptions.slice(0, visibleOptions.length - 1));
    }
  }, [containerRef, visibleOptions, hiddenOptions]);

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
        setVisibleOptions(options);
        setHiddenOptions([]);
        updateChips();
      }, 300);
    };

    window.addEventListener("resize", resetAndUpdateChips);
    return () => window.removeEventListener("resize", resetAndUpdateChips);
  }, [updateChips, options]);

  return [visibleOptions, hiddenOptions, containerRef];
};

export default useChips;

import React, { useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const Tour = ({ tourState, dispatch, refLines, setRefLines }) => {
  useEffect(() => {
    if (!localStorage.getItem("tour")) {
      dispatch({ type: "START" });
    }
  }, [dispatch]);

  const callback = ({ action, index, type, status }) => {
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      const nextIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      if (refLines.length >= 1 && index === 1) {
        dispatch({
          type: "NEXT_OR_PREV",
          payload: {
            run: false,
            stepIndex: nextIndex,
          },
        });

        setTimeout(() => {
          dispatch({ type: "START" });
        }, 100);
      } else if (
        index === 2 &&
        action === ACTIONS.PREV &&
        refLines[0].startsWith("オスタニア")
      ) {
        dispatch({
          type: "NEXT_OR_PREV",
          payload: {
            stepIndex: nextIndex,
          },
        });
      }
      dispatch({
        type: "NEXT_OR_PREV",
        payload: {
          stepIndex: nextIndex,
        },
      });
    }
    console.groupCollapsed("Tour callback " + type);
    console.log(action);
    console.log(index);
    console.log(type);
    console.log(status);
    console.groupEnd();
  };
  return (
    <>
      <JoyRide
        {...tourState}
        showSkipButton={true}
        disableOverlayClose={true}
        hideCloseButton={true}
        callback={callback}
        locale={{
          last: "Finish",
        }}
      />
    </>
  );
};

export default Tour;

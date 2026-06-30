import { useEffect, useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimeWorkerManager } from "../../workers/TImeWorkerManager";
import { TaskActionTypes } from "./taskActions";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const worker = TimeWorkerManager.getInstance();

  worker.onmessage((e) => {
    console.log(e.data);
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      dispatch({type: TaskActionTypes.COMPLETE_TASK});
      worker.terminate();
    } else
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
  });
  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  useEffect(() => {
    if (!state.activeTask) worker.terminate();
    worker.postMessage(state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

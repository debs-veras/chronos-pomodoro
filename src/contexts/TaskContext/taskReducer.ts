import { TaskActionTypes, type TaskActionModel } from "./taskActions";
import { type TaskStateModel } from "./../../types/taskStateModel.d";
import { getNextCycle } from "../../util/getNextCycle";
import { formatSecondsToMinutes } from "../../util/formatSecondsToMinutes";

export function taskReducer(state: TaskStateModel, action: TaskActionModel) {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const secondsRemaining = newTask.durationInMinutes * 60;
      const nextCycle = getNextCycle(state.currentCycle);
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id)
            return { ...task, interruptedDate: Date.now() };
          return task;
        }),
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id)
            return { ...task, completeDate: Date.now() };
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE:
      return state;
  }
}

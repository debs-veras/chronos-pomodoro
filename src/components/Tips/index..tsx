import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../util/getNextCycle";
import { getNextCycleType } from "../../util/gettNextCycleType";

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  //Tips
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por <strong>{state.config.workTime}</strong></span>,
    shortBreakTime: <span>Descanse por <strong>{state.config.shortBreakTime}</strong></span>,
    longBreakTime: <span>Descanso é longo</span>,
  };

  const tipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de <strong>{state.config.workTime}</strong></span>,
    shortBreakTime: <span>Próximo descanso é de <strong>{state.config.shortBreakTime}</strong></span>,
    longBreakTime: <span>Próximo descanso é longo</span>,
  };
  
  return (
    <p>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </p>
   )
}

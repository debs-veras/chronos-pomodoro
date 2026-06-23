import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useState } from "react";
import type { TaskModel } from "../../types/taskModel.d";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../util/getNextCycle";
import { getNextCycleType } from "../../util/gettNextCycleType";
import { formatSecondsToMinutes } from "../../util/formatSecondsToMinutes";

export function MainForm() {
  const [taskName, setTaskName] = useState("");
  const { state, setState } = useTaskContext();

  //Ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(state.currentCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('entrar')
    if (taskName === null || !taskName.trim()) return;

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      durationInMinutes: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.durationInMinutes * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleInterruptTask() {
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
      };
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} action="" className="form">
      <div className="formRow">
        <DefaultInput
          id="meuInput"
          type="text"
          labelText="Task"
          placeholder="Digite o nome da tarefa..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          disabled={!!state.activeTask}
        />
      </div>

      <div className="formRow">
        <p>Próximo intervalo é de 25min</p>
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            type="submit"
            icon={<PlayCircleIcon />}
          />
        )}
        {!!state.activeTask && (
          <DefaultButton
            aria-label="Interromper tarefa atual"
            title="Interromper tarefa atual"
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}

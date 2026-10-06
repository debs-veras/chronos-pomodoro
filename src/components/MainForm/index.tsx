import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useState } from "react";
import type { TaskModel } from "../../types/taskModel.d";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/gettNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips/index.";
import { showMessage } from "../../adapters/showMessage";

export function MainForm() {
  const [taskName, setTaskName] = useState("");
  const { state, dispatch } = useTaskContext();

  //Ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskName === null || !taskName.trim()) {
      showMessage.warn("Por favor, insira o nome da tarefa antes de iniciar.");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      durationInMinutes: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.success(`Tarefa "${taskName}" iniciada com sucesso!`);
  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
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
        <Tips />
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

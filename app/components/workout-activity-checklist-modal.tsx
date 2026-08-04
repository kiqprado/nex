import { type WorkOutActivityState } from "../page"

interface IWorkOutActivityCheckListModal {
  HandleToggleWorkoutStatsModal: () => void
  setWorkoutState: React.Dispatch<React.SetStateAction<WorkOutActivityState>>
  setElapsedTimer: React.Dispatch<React.SetStateAction<number>>
}

export function WorkOutActivityCheckListModal({
  HandleToggleWorkoutStatsModal, 
  setWorkoutState,
  setElapsedTimer
}: IWorkOutActivityCheckListModal) {

  function HandleWorkoutBackToRunning() {
    HandleToggleWorkoutStatsModal()
    setWorkoutState('running')
  }

  function HandleDeleteWorkout() {
    HandleToggleWorkoutStatsModal()
    setElapsedTimer(0)
  }
  return(
    <div className="h-svh w-full inset-0 absolute flex bg-zinc-950/50">
      <div className="m-auto w-[88%] bg-zinc-800">
        <div>
        </div>
        <div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            className="w-full"
            onClick={HandleToggleWorkoutStatsModal}
          >Salvar atividade</button>
          <div className="w-full flex justify-evenly">
            <button
              onClick={HandleWorkoutBackToRunning}
            >
              Voltar
            </button>
          <button
            onClick={HandleDeleteWorkout}
          >
            Deletar
          </button>
          </div>
         
        </div>
      </div>
    </div>
  )
}
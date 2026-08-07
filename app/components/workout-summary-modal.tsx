import { useWorkout } from "../hooks/use-Workout"

interface IWorkoutSummaryModal {
  onCloseSummaryModal: () => void
}

export function WorkoutSummaryModal({onCloseSummaryModal}: IWorkoutSummaryModal) {
  const {ResetWorkout, FinishWorkout} = useWorkout()

  function HandleSaveWorkout() {
    FinishWorkout()
    onCloseSummaryModal()
  }

  function HandleBackToWorkout() {
    onCloseSummaryModal()
  }

  function HandleDeleteWorkout() {
    ResetWorkout()
    onCloseSummaryModal()
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
            onClick={HandleSaveWorkout}
          >
            Salvar atividade
          </button>
          
          <div className="w-full flex justify-evenly">
            <button
              onClick={HandleBackToWorkout}
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
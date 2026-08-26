import { ThumbsUpIcon, ExportIcon } from "@phosphor-icons/react"


export function Activity() {
  return(
    <div className="w-full flex flex-col gap-6 px-6">
      <div
        className="flex items-center gap-3"
      >
        <div className="h-12 w-12 rounded-full bg-red-500"/>
        <div
          className="flex flex-col justify-center"
        >
          <h4>User Name</h4>
          <span className="text-xs tracking-widest">01 de Setembro ás 14:30hrs</span>
          <span className="text-xs tracking-widest">São Paulo - SP</span>
        </div>
      </div>

      <h2 className="tracking-wider">Título da Atividade</h2>

      <div className="flex items-center justify-evenly">
        <div
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <span className="text-sm tracking-wide">Distância</span>
          <span className="font-bold tracking-wider">5.05 km</span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <span className="text-sm tracking-wide">Ritmo</span>
          <span className="font-bold tracking-wider">4.44 /km</span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <span className="text-sm tracking-wide">Tempo</span>
          <span className="font-bold tracking-wider">22m 58s</span>
        </div>
      </div>

      <div
        className="flex items-center justify-evenly"
      >
        <button>
          <ThumbsUpIcon size={26}/>
        </button>
        <button>
          <ExportIcon size={26}/>
        </button>
      </div>
    </div>
  )
}
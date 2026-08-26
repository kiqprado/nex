'use client'

import { Menu } from "../components/menu"

export default function Profile() {
  return(
    <div className="w-full">
      <header className="px-6 py-3 flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <div
            className="h-22 w-22 rounded-full bg-cyan-500"
          />
          <div className="flex flex-col gap-1">
            <h2 className="tracking-wider">Kaique Prado</h2>
            <span className="text-sm">São Paulo - SP, Brasil</span>
          </div>
        </div>
        <p>Bio do usuário</p>
        <div className="flex items-center justify-evenly">
          <div
            className="flex flex-col items-center"
          >
            <span className="text-sm tracking-wider">Atividades</span>
            <span>N° Total</span>
          </div>
          <div
            className="flex flex-col items-center"
          >
            <span className="text-sm tracking-wider">Semanas ativo</span>
            <span>N° Total</span>
          </div>
        </div>
        
        <div className="flex items-center justify-evenly">
          <button>QR Code</button>
          <button>Editar</button>
        </div>
      </header>

      <Menu/>
    </div>  
  )
}

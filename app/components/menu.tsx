import { LinkButton } from '@/app/elements/link-btn'

import { HouseIcon, UserCheckIcon, RecordIcon} from '@phosphor-icons/react'

export function Menu() {
  return(
    <div
      className='absolute z-100 bottom-[5%] inset-x-0
      px-6 flex justify-between items-center'
    >
      <LinkButton
        href={'/feed'}
      >
        <HouseIcon/>
        <span>Início</span>
      </LinkButton>
      <LinkButton
        href={'/workout'}
      >
        <RecordIcon/>
        <span>Atividade</span>
      </LinkButton>
      <LinkButton
        href={'/profile'}
      >
        <UserCheckIcon/>
        <span>Perfil</span>
      </LinkButton>
    </div>
  )
}
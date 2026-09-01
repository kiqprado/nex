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
        <HouseIcon size={26}/>
        <span>Início</span>
      </LinkButton>
      <LinkButton
        href={'/workout'}
      >
        <RecordIcon size={26}/>
        <span>Atividade</span>
      </LinkButton>
      <LinkButton
        href={'/profile'}
      >
        <UserCheckIcon size={26}/>
        <span>Perfil</span>
      </LinkButton>
    </div>
  )
}
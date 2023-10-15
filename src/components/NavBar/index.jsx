import './index.css'
import logoDeposit from '../../assets/images/safe-box.png'

import { NavLink } from 'react-router-dom'

import { useAuth0 } from "@auth0/auth0-react"
import { Avatar } from '@chakra-ui/react'



import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'




export default function NavBar({ children }) {

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const { isOpen, onOpen, onClose } = useDisclosure()


  const ModalPerfil = () => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent padding={'20px'}>
            <div className="text-2xl mb-3">Meu Perfil</div>
            <ModalCloseButton />
            <div className="flex flex-col gap-3">
              <div>
                <Avatar onClick={onOpen} name={user.given_name} src={user.picture} />
              </div>
              <section className="flex flex-col gap-3">
                <ul className="flex flex-wrap gap-3">
                  <li className="flex flex-wrap"><span className="font-extrabold mr-1">Nome:</span>{user.given_name}</li>
                  <li className="flex flex-wrap"><span className="font-extrabold mr-1">Sobrenome:</span>{user.family_name}</li>
                  <li><span className="font-extrabold mr-1">E-mail:</span>{user.email}</li>
                  <li><span className="font-extrabold mr-1">Usuário:</span>{user.nickname}</li>
                </ul>
              </section>
            </div>

          </ModalContent>
        </Modal>
      </>
    )
  }


  return (
    <div className="flex h-screen">
      <aside className="flex flex-1 flex-col max-w-[180px] gap-3 bg-indigo-500 p-3 mobile:max-w-[70px]">
        <div className="flex flex-col gap-3 items-center">
          <img className="w-[80px] h-[80px] mobile:w-[30px] mobile:h-[30px]" src={logoDeposit} />
          <h1 className="uppercase font-extrabold text-center text-2xl mobile:text-xs">Deposit</h1>
        </div>
        <nav className="flex flex-col h-full w-full items-center gap-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
          >
            <img src="/home.svg" className="desktop:hidden" />
            <button className="mobile:hidden">Dashboard</button>
          </NavLink>

          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
          >
            <img src="/produto.svg" className="desktop:hidden" />
            <button className="mobile:hidden">Produtos</button>
          </NavLink>
        </nav>
        <section className="flex flex-col gap-8 mobile:text-xs">
          <div className="flex flex-col justify-end items-center gap-4 my-3 ">
            <Avatar name={user.nickname} src={user.picture} />
            <h3 className="text-white text-center">{user.given_name}</h3>
            <img src="info.svg" className="desktop:hidden" onClick={onOpen} />
            <button className="navlink mobile:hidden" onClick={onOpen}>Meu Perfil</button>
          </div>

          <button className="navlink" onClick={() => logout()}>Sair</button>
        </section>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
        <ModalPerfil />
      </main>
    </div>
  )
}
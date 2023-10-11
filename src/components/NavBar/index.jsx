import './index.css'
import logoDeposit from '../../assets/images/safe-box.png'

import { NavLink } from 'react-router-dom'

import { useAuth0 } from "@auth0/auth0-react"
import { Avatar } from '@chakra-ui/react'


export default function NavBar({ children }) {

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <div className="flex h-screen ">
      <aside className="flex flex-1 flex-col max-w-[180px] gap-3 bg-indigo-500 p-3 ">
        <div className="flex flex-col gap-3 items-center">
          <img className="w-[80px] h-[80px]" src={logoDeposit} />
          <h1 className="uppercase font-extrabold text-center text-2xl">Deposit</h1>
        </div>
        <nav className="flex flex-col h-full w-full items-center gap-2">

          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
          >
            <button>Início</button>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
          >
            <button>Dashboard</button>
          </NavLink>
        </nav>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col justify-end items-center gap-4 my-3 mx-4 ">
            <Avatar name={user.nickname} src={user.picture} />
            <h3 className="text-white">{user.nickname}</h3>
          </div>
          <button className="navlink" onClick={() => logout()}>Sair</button>
        </section>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
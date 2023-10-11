import logoDeposit from '../../assets/images/safe-box.png'
import 'react-toastify/dist/ReactToastify.css';

import { Stack, Button } from '@chakra-ui/react'


import { useAuth0 } from "@auth0/auth0-react"


export default function Login() {

  /* 
  TOASTER DE NOTIFICACAO

  import { ToastContainer, toast } from 'react-toastify';
  const notify = (boolean) => boolean ? toast("True") : toast("False");

  <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */

  const { loginWithRedirect } = useAuth0();

  return (
    <main className="h-screen flex flex-wrap">
      <section className="flex flex-col justify-center items-center flex-1 max-w-[650px] bg-indigo-500 mobile:hidden">
        <h1 className="font-sans font-extrabold uppercase text-black text-6xl mb-3">Deposit</h1>
        <h3 className="font-sans font-bold  text-black text-3xl p-6 text-center">Gerencia, controle e agilidade!</h3>
        <img className="w-[300px]" src={logoDeposit} alt="Logo Deposit" />
      </section>
      <section className="flex-1 flex flex-col gap-5 justify-center items-center ">
        <h3 className="uppercase font-bold text-5xl mb-8 text-center">Tela de Login</h3>
        <Stack>
          <Button colorScheme='bg-indigo-500' width="100px" className="bg-indigo-500" variant='solid' onClick={() => loginWithRedirect()}>
            Entrar
          </Button>
        </Stack>
      </section>

    </main>
  )
}
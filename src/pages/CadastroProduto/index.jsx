import { withAuthenticationRequired } from '@auth0/auth0-react'
import { MagnifyingGlass } from 'react-loader-spinner'
import NavBar from '../../components/NavBar'

function CadastroProduto() {
  return (
    <NavBar>
      <h1>Página de cadastro do produto.</h1>
    </NavBar>
  )
}

export default withAuthenticationRequired(CadastroProduto, {
  onRedirecting: () =>
    <div className="flex justify-center items-center h-screen w-full">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor='#c0efff'
        color='rgb(99,102,241)'
      />
    </div>

})
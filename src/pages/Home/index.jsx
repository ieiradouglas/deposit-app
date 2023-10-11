import './index.css'
import NavBar from '../../components/NavBar'
import { Bars } from 'react-loader-spinner'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"


const Card = ({ img, alt, titulo, quantidade }) => {
  return (
    <div className=" flex-1 background-card flex flex-col items-center justify-center text-center text-white max-w-[280px] p-3 rounded-sm hover:scale-[1.02] duration-150">
      <img src={img} alt={alt} className="max-w-[60px]" />
      <h1 className="font-bold tracking-wide">{titulo}</h1>
      <h3 className="font-bold tracking-wide">{quantidade}</h3>
    </div>
  )
}

function Home() {

  const { user } = useAuth0()

  console.log(user)


  return (
    <NavBar>

      <main className="flex flex-wrap gap-4 justify-center p-3 mt-8 mobile:mt-2">
        <Card
          img="/box.svg"
          alt="Ícone de caixa"
          titulo="Produtos"
          quantidade="52"
        />
        <Card
          img="/avatar.svg"
          alt="Ícone de caixa"
          titulo="Usuários"
          quantidade="32"
        />
        <Card
          img="/categoria.svg"
          alt="Ícone de caixa"
          titulo="Categoria"
          quantidade="76"
        />
        <Card
          img="/fornecedor.svg"
          alt="Ícone de caixa"
          titulo="Fornecedor"
          quantidade="32"
        />
      </main >
    </NavBar>
  )

}

export default withAuthenticationRequired(Home, {
  onRedirecting: () =>
    <div className="flex justify-center items-center h-screen w-full">
      <Bars
        height="80"
        width="80"
        color="rgb(99 102 241)"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>

})
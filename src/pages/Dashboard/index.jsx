import './index.css'
import NavBar from '../../components/NavBar'
import { MagnifyingGlass } from 'react-loader-spinner'
import { supabase } from "../../database/supabase"
import { useState, useEffect } from 'react'

import { withAuthenticationRequired } from "@auth0/auth0-react"

import { toast } from 'react-toastify'

const Card = ({ img, alt, titulo, quantidade }) => {
  return (
    <div className=" flex-1 background-card flex flex-col items-center justify-center text-center text-white max-w-[280px] p-3 rounded-sm hover:scale-[1.02] duration-150">
      <img src={img} alt={alt} className="max-w-[60px]" />
      <h1 className="font-bold tracking-wide">{titulo}</h1>
      <h3 className="font-bold tracking-wide">{quantidade}</h3>
    </div>
  )
}



function Dashboard() {

  const [loading, setLoading] = useState(true)

  const [produtos, setProdutos] = useState('')
  const [usuarios, setUsuarios] = useState('')
  const [categorias, setCategorias] = useState('')
  const [fornecedores, setFornecedores] = useState('')

  const notify = (text) => { toast(text) };

  useEffect(() => { //Verificar uso deste hook, pois ele é executado mais de uma vez. 
    getNumberRows('produtos', setProdutos)
    getNumberRows('usuarios', setUsuarios)
    getNumberRows('categorias', setCategorias)
    getNumberRows('fornecedores', setFornecedores)
  }, [])

  async function getNumberRows(tableName, setName) {
    const { data, error } = await supabase
      .from(`${tableName}`)
      .select('*')
    setName(data.length)
    setLoading(false)

  }

  return (
    <NavBar>
      <main className="flex flex-wrap gap-4 justify-center p-3 mt-8 mobile:mt-2">
        {loading ? <MagnifyingGlass /> :
          <>
            <Card
              img="/box.svg"
              alt="Ícone de caixa"
              titulo="Produtos"
              quantidade={produtos}
            />
            <Card
              img="/avatar.svg"
              alt="Ícone de caixa"
              titulo="Usuários"
              quantidade={usuarios}
            />
            <Card
              img="/categoria.svg"
              alt="Ícone de caixa"
              titulo="Categorias"
              quantidade={categorias}
            />
            <Card
              img="/fornecedor.svg"
              alt="Ícone de caixa"
              titulo="Fornecedores"
              quantidade={fornecedores}
            />
          </>}
      </main >

    </NavBar>
  )

}

export default withAuthenticationRequired(Dashboard, {
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
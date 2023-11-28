import { withAuthenticationRequired } from '@auth0/auth0-react'
import { MagnifyingGlass } from 'react-loader-spinner'
import NavBar from '../../components/NavBar'
import Input from '../../components/Input'
import Select from '../../components/Select'
import './index.css'

import { supabase } from '../../database/supabase'

import { useState } from 'react'

/* 
  Nome do produto
  descricao do produto
  preco do produto
  quantidad em estoque inicial
  fornecedor
  data que foi inserido
  categoria
*/



function CadastroProduto() {

  const [categorias, setCategorias] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [produto, setProduto] = useState({})


  async function getOptions(tabela) {
    const { data } = await supabase
      .from(`${tabela}`)
      .select('*')

    if (tabela == 'categorias') {
      setCategorias(data)
    }
    if (tabela == 'fornecedores') {
      setFornecedores(data)
    }

  }

  async function inserirProduto() {
    const { data, error } = await supabase
      .from('produtos')
      .insert([
        { nome: 'Sapatenis', descricao: 'Sapato para brincar', preco: 300, estoque: 20, fornecedor_id: 1, data_adicao: Date.now(), categoria_id: 4 }
      ])
      .select()

    if (error) {
      console.log(error.message)
    }
  }

  return (
    <NavBar>
      <form className="background w-full flex flex-wrap">

        <div className="flex flex-wrap m-5 w-full justify-center gap-10">
          <fieldset>
            <legend>Nome do Produto</legend>
            <Input type="text" placeholder="Nome do Produto" className="border border-black p-2 rounded-sm" />
          </fieldset>
          <fieldset>
            <legend>Descrição</legend>
            <Input type="text" placeholder="Descrição" className="border border-black p-2 rounded-sm" />
          </fieldset>
          <fieldset>
            <legend>Categoria do Produto</legend>
            <Select onClick={() => getOptions('categorias')}>
              {categorias.map((cat) => {
                return <option key={cat.categoria_id} value={cat.nome_categoria}>{cat.nome_categoria}</option>
              })}
            </Select>
          </fieldset>
        </div>

        <div className="flex flex-wrap  m-5 w-full justify-center gap-10">
          <fieldset>
            <legend>Valor do Produto</legend>
            <Input type="number" placeholder="Valor do produto" className="border border-black p-2 rounded-sm" />
          </fieldset>
          <fieldset>
            <legend>Quantidade</legend>
            <Input type="number" placeholder="Quantidade" className="border border-black p-2 rounded-sm" />
          </fieldset>
          <fieldset>
            <legend>Fornecedor</legend>
            <Select onClick={() => getOptions('fornecedores')}>
              {fornecedores.map((forne) => {
                return <option key={forne.fornecedor_id} value={forne.nome_fornecedor}>{forne.nome_fornecedor}</option>
              })}
            </Select>
          </fieldset>
          <fieldset>
            <legend>Data de Entrada</legend>
            <Input type="date" placeholder="Data de Cadastro" className="border border-black p-2 rounded-sm w-[199px]" />
          </fieldset>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button className="w-[200px] bg-roxo rounded-sm p-3" onClick={(e) => {
            e.preventDefault()
            inserirProduto()
          }} >Cadastrar Produto</button>
        </div>
      </form>
    </NavBar >
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
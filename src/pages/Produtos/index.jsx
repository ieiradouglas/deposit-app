import NavBar from '../../components/NavBar'
import { Bars } from 'react-loader-spinner'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import './index.css'

import { useState, useEffect } from 'react'

import { supabase } from '../../database/supabase'

function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProdutos()
  }, [])

  async function getProdutos() {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
    setProdutos(data)
    setLoading(false)
  }




  return (
    <NavBar>
      <section className="flex w-full">
        {loading ? <div className="w-full h-screen flex justify-center items-center"><Bars /></div> :
          <table className="table-content">
            <thead className="table-header">
              <tr className="row-header">
                <th className="cell-header">Produto</th>
                <th className="cell-header">Quantidade</th>
                <th className="cell-header">Valor</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {produtos.map((prod) => {
                return (
                  <tr className="row-body">
                    <td className="cell-body">{prod.nome}</td>
                    <td className="cell-body">{prod.estoque}</td>
                    <td className="cell-body">R$ {prod.preco}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>}
      </section>
    </NavBar >
  )
}

export default withAuthenticationRequired(Produtos, {
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
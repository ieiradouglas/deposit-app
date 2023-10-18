import NavBar from '../../components/NavBar'
import { Bars } from 'react-loader-spinner'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import './index.css'

import { useState, useEffect, createContext } from 'react'

import { supabase } from '../../database/supabase'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  ModalFooter,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

import {
  HamburgerIcon,
} from '@chakra-ui/icons'

const ProdutoContext = createContext({})

function Produtos() {

  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [teste, setTeste] = useState({})

  const ModalPerfil = ({ prod_id }) => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxWidth={'700px'} maxHeight={'500px'} padding={'30px'} margin={'10px'} className="flex flex-col text-sm gap-2">
            <ModalCloseButton />
            <div className="flex absolute top-2 left-2 font-bold"><h3>ID:</h3><span>{prod_id.produto_id}</span></div>
            <div className="flex mt-2 items-start"><h3 className="text-sm font-bold">Nome:</h3><span>{prod_id.nome}</span></div>
            <div className="flex"><h3 className="text-sm font-bold">Descrição:</h3><span>{prod_id.descricao}</span></div>
            <div className="flex"><h3 className="text-sm font-bold">Valor:</h3><span>R$ {prod_id.preco}</span></div>
            <div className="flex"><h3 className="text-sm font-bold">Quantidade:</h3><span>{prod_id.estoque}</span></div>
            <div className="flex"><h3 className="text-sm font-bold">Categoria:</h3><span>{prod_id.categoria_id}</span></div>
            <div className="flex"><h3 className="text-sm font-bold">Fornecedor:</h3><span>{prod_id.fornecedor_id}</span></div>
            <div className="flex"><h3 className="text-sm font-bold">Data do Cadastro:</h3><span>{prod_id.data_adicao}</span></div>
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={""}>
                Excluir+
              </Button>
            </ModalFooter>
          </ModalContent>

        </Modal>
      </>
    )
  }

  function ActionButton({ click }) {
    return (
      <Menu isLazy>
        <MenuButton><HamburgerIcon height={'20px'} width={'20px'} /></MenuButton>
        <MenuList>
          <MenuItem onClick={click}>Abrir</MenuItem>
        </MenuList>
      </Menu>
    )
  }


  useEffect(() => {
    getProdutos()
  }, [])

  async function getProdutos() {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
    setProdutos(data)
    setLoading(false)

    error ? console.log(error.message) : ""
  }


  return (
    <NavBar>
      <ProdutoContext.Provider value={teste}>
        <section className="flex w-full">
          {loading ? <div className="w-full h-screen flex justify-center items-center"><Bars /></div> :
            <table className="table-content">
              <thead className="table-header mobile:text-xs">
                <tr className="row-header">
                  <th className="cell-header">ID</th>
                  <th className="cell-header">Produto</th>
                  <th className="cell-header mobile:max-w-[70px]">Quantidade</th>
                  <th className="cell-header">Valor</th>
                  <th className="cell-header">Ações</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {produtos.map((prod) => {
                  return (
                    <tr className="row-body" key={prod.produto_id}>
                      <td className="cell-body w-[10px] underline">{prod.produto_id}</td>
                      <td className="cell-body">{prod.nome}</td>
                      <td className="cell-body">{prod.estoque}</td>
                      <td className="cell-body w-[100px]">R$ {prod.preco}</td>
                      <td className="cell-body w-[10px] text-center">{<ActionButton click={() => {
                        setTeste(prod)
                        onOpen()
                      }} />}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>}
        </section>
        <ModalPerfil prod_id={teste} />
      </ProdutoContext.Provider>
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


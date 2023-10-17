import NavBar from '../../components/NavBar'
import { Bars } from 'react-loader-spinner'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { useState, useEffect } from 'react'

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

import {
  HamburgerIcon,
} from '@chakra-ui/icons'




function Fornecedores() {

  const [fornecedores, setFornecedores] = useState([])
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
            <div className="flex absolute top-2 left-2 font-bold"><h3>ID:</h3><span>{prod_id.fornecedor_id}</span></div>
            <div className="flex mt-2 items-start"><h3 className="text-sm font-bold">Nome:</h3><span>{prod_id.nome_fornecedor}</span></div>
            <div className="flex mt-2 items-start"><h3 className="text-sm font-bold">Endereço:</h3><span>{prod_id.endereco}</span></div>
            <div className="flex mt-2 items-start"><h3 className="text-sm font-bold">Bairro:</h3><span>{prod_id.bairro}</span></div>
            <div className="flex mt-2 items-start"><h3 className="text-sm font-bold">Cidade:</h3><span>{prod_id.cidade}</span></div>
            <div className="flex mt-2 items-start"><h3 className="text-sm font-bold">Estado:</h3><span>{prod_id.estado}</span></div>
            <div className="flex mt-2 items-start"><h3 className="text-sm font-bold">Telefone:</h3><span>{prod_id.telefone}</span></div>
            <div className="flex mt-2 items-start"><h3 className="text-sm font-bold">E-mail:</h3><span>{prod_id.email}</span></div>
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
    getFornecedores()
  }, [])

  async function getFornecedores() {
    const { data, error } = await supabase
      .from('fornecedores')
      .select('*')
    setFornecedores(data)
    setLoading(false)

    error ? console.log(error.message) : ""
  }

  return (
    <NavBar>
      <section className="flex w-full">
        {loading ? <div className="w-full h-screen flex justify-center items-center"><Bars /></div> :
          <table className="table-content">
            <thead className="table-header mobile:text-xs">
              <tr className="row-header">
                <th className="cell-header">ID</th>
                <th className="cell-header">Fornecedor</th>
                <th className="cell-header">Estado</th>
                <th className="cell-header">Cidade</th>
                <th className="cell-header">Bairro</th>
                <th className="cell-header">Ações</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {fornecedores.map((prod) => {
                return (
                  <tr className="row-body" key={prod.fornecedor_id}>
                    <td className="cell-body w-[10px] underline">{prod.fornecedor_id}</td>
                    <td className="cell-body">{prod.nome_fornecedor}</td>
                    <td className="cell-body">{prod.estado}</td>
                    <td className="cell-body">{prod.cidade}</td>
                    <td className="cell-body">{prod.bairro}</td>
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
    </NavBar >
  )

}

export default withAuthenticationRequired(Fornecedores, {
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


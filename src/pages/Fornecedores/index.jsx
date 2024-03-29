import NavBar from "../../components/NavBar";
import { MagnifyingGlass } from "react-loader-spinner";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import { supabase } from "../../database/supabase";

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
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teste, setTeste] = useState({});
  const [campoBuscaFornecedor, setCampoBuscaFornecedor] = useState("");

  const ModalPerfil = ({ prod_id }) => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            maxWidth={"700px"}
            maxHeight={"500px"}
            padding={"30px"}
            margin={"10px"}
            className="flex flex-col text-sm gap-2"
          >
            <ModalCloseButton />
            <div className="flex absolute top-2 left-2 font-bold">
              <h3>ID:</h3>
              <span>{prod_id.fornecedor_id}</span>
            </div>
            <div className="flex mt-2 items-start">
              <h3 className="text-sm font-bold">Nome:</h3>
              <span>{prod_id.nome_fornecedor}</span>
            </div>
            <div className="flex mt-2 items-start">
              <h3 className="text-sm font-bold">Endereço:</h3>
              <span>{prod_id.endereco}</span>
            </div>
            <div className="flex mt-2 items-start">
              <h3 className="text-sm font-bold">Bairro:</h3>
              <span>{prod_id.bairro}</span>
            </div>
            <div className="flex mt-2 items-start">
              <h3 className="text-sm font-bold">Cidade:</h3>
              <span>{prod_id.cidade}</span>
            </div>
            <div className="flex mt-2 items-start">
              <h3 className="text-sm font-bold">Estado:</h3>
              <span>{prod_id.estado}</span>
            </div>
            <div className="flex mt-2 items-start">
              <h3 className="text-sm font-bold">Telefone:</h3>
              <span>{prod_id.telefone}</span>
            </div>
            <div className="flex mt-2 items-start">
              <h3 className="text-sm font-bold">E-mail:</h3>
              <span>{prod_id.email}</span>
            </div>
          </ModalContent>
        </Modal>
      </>
    );
  };

  function ActionButton({ click }) {
    return (
      <Menu isLazy>
        <MenuButton>
          <HamburgerIcon height={"20px"} width={"20px"} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={click}>Abrir</MenuItem>
        </MenuList>
      </Menu>
    );
  }

  useEffect(() => {
    getFornecedores("");
  }, []);

  async function getFornecedores(text) {
    if (campoBuscaFornecedor == false) {
      const { data, error } = await supabase.from("fornecedores").select("*");
      setFornecedores(data);
      setLoading(false);
    } else {
      const { data, error } = await supabase
        .from("fornecedores")
        .select("*")
        .ilike("nome_fornecedor", `%${text}%`);
      setFornecedores(data);
      setLoading(false);
    }
    /* if (campoBuscaProduto != "" || campoBuscaProduto != " ") {
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .ilike("nome_categoria", `%${text}%`);
      setCategorias(data);
      setLoading(false);

      error ? console.log(error.message) : "teste";
    } else {
      const { data, error } = await supabase.from("categorias").select("*");
      setProdutos(data);
      setLoading(false);

      error ? console.log(error.message) : "teste";
    } */
  }

  return (
    <NavBar>
      <section className="flex flex-col">
        <div className="mb-3 flex flex-wrap gap-3">
          <NavLink to="/cadastro-fornecedores">
            <button className=" p-2 rounded-md cursor-pointer text-black bg-verde max-w-[180px]">
              Novo fornecedor
            </button>
          </NavLink>
          <div>
            <input
              onChange={(e) => {
                setCampoBuscaFornecedor(e.target.value);
              }}
              onKeyUp={() => getFornecedores(campoBuscaFornecedor)}
              placeholder="Buscar fornecedor..."
              className=" p-2 rounded-md border border-gray-950 text-black"
            />
          </div>
        </div>
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <MagnifyingGlass />
          </div>
        ) : (
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
                    <td className="cell-body w-[10px] underline">
                      {prod.fornecedor_id}
                    </td>
                    <td className="cell-body">{prod.nome_fornecedor}</td>
                    <td className="cell-body">{prod.estado}</td>
                    <td className="cell-body">{prod.cidade}</td>
                    <td className="cell-body">{prod.bairro}</td>
                    <td className="cell-body w-[10px] text-center">
                      {
                        <ActionButton
                          click={() => {
                            setTeste(prod);
                            onOpen();
                          }}
                        />
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
      <ModalPerfil prod_id={teste} />
    </NavBar>
  );
}

export default withAuthenticationRequired(Fornecedores, {
  onRedirecting: () => (
    <div className="flex justify-center items-center h-screen w-full">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="rgb(99,102,241)"
      />
    </div>
  ),
});

import NavBar from "../../components/NavBar";
import { MagnifyingGlass } from "react-loader-spinner";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import "./index.css";

import { useState, useEffect, createContext } from "react";
import { supabase } from "../../database/supabase";

import { NavLink } from "react-router-dom";

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
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

import { toast } from "react-toastify";
import { get } from "lodash";

const ProdutoContext = createContext({});

function Produtos() {
  const [produto, setProduto] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpenn, onOpenn, onClosen } = useDisclosure();
  const [campoBuscaProduto, setCampoBuscaProduto] = useState("");

  const toastify = () => toast("Excluído com sucesso!");

  const ModalPerfil = ({ prod }) => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            maxWidth={"700px"}
            maxHeight={"500px"}
            padding={"30px 0px 0px 30px"}
            margin={"10px"}
            className="flex flex-col text-sm gap-2"
          >
            <ModalCloseButton />
            <div className="flex absolute top-2 left-2 font-bold">
              <h3>ID:</h3>
              <span>{prod.prod_id}</span>
            </div>
            <div className="flex mt-2 items-start">
              <h3 className="text-sm font-bold">Nome:</h3>
              <span>{prod.nome}</span>
            </div>
            <div className="flex">
              <h3 className="text-sm font-bold">Descrição:</h3>
              <span>{prod.descricao}</span>
            </div>
            <div className="flex">
              <h3 className="text-sm font-bold">Valor:</h3>
              <span>R$ {prod.preco}</span>
            </div>
            <div className="flex">
              <h3 className="text-sm font-bold">Quantidade:</h3>
              <span>{prod.estoque}</span>
            </div>
            <div className="flex">
              <h3 className="text-sm font-bold">Categoria:</h3>
              <span>{prod.categoria_id}</span>
            </div>
            <div className="flex">
              <h3 className="text-sm font-bold">Fornecedor:</h3>
              <span>{prod.fornecedor_id}</span>
            </div>
            <div className="flex">
              <h3 className="text-sm font-bold">Data do Cadastro:</h3>
              <span>{prod.data_adicao}</span>
            </div>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={1}
                onClick={() => deleteProdutos(prod.produto_id)}
              >
                Excluir
              </Button>
            </ModalFooter>
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
    getProdutos();
  }, []);

  async function getProdutos(text) {
    if (campoBuscaProduto == false) {
      const { data, error } = await supabase.from("produtos").select("*");
      setProdutos(data);
      setLoading(false);
    } else {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .ilike("nome", `%${text}%`);
      setProdutos(data);
      setLoading(false);
    }

    /* if (campoBuscaProduto != "" || campoBuscaProduto != " ") {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .ilike("nome", `${text}%`);
      setProdutos(data);
      setLoading(false);

      error ? console.log(error.message) : "teste";
    } else {
      const { data, error } = await supabase.from("produtos").select("*");
      setProdutos(data);
      setLoading(false);

      error ? console.log(error.message) : "teste";
    } */
  }

  async function deleteProdutos(campo) {
    const { data, error } = await supabase
      .from("produtos")
      .delete()
      .eq("produto_id", campo);
    onClose();
    setLoading(true);
    handleReset();
    getProdutos("");
    toastify();

    error ? console.log(error.message) : "";
  }

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setCampoBuscaProduto("");
  };

  return (
    <NavBar>
      <ProdutoContext.Provider value={produto}>
        <section className="flex flex-col">
          <div className="mb-3 flex flex-wrap gap-3">
            <NavLink to="/cadastro-produtos">
              <button
                onClick={() => console.log(...campoBuscaProduto)}
                className=" p-2 rounded-md cursor-pointer text-black bg-verde max-w-[140px]"
              >
                Novo produto
              </button>
            </NavLink>
            <div>
              {campoBuscaProduto ? console.log("true") : console.log("false")}
              <input
                onChange={(e) => {
                  setCampoBuscaProduto(e.target.value);
                }}
                onKeyUp={() => getProdutos(campoBuscaProduto)}
                placeholder="Buscar produto..."
                className=" p-2 rounded-md border border-gray-950 text-black"
              />
            </div>
          </div>
          {loading ? (
            <div className="w-full h-screen flex justify-center items-center">
              <MagnifyingGlass />
            </div>
          ) : (
            <>
              <span className="mb-3">Quantidade: {produtos.length}</span>
              <table className="table-content ">
                <thead className="table-header mobile:text-xs">
                  <tr className="row-header">
                    <th className="cell-header">ID</th>
                    <th className="cell-header">Produto</th>
                    <th className="cell-header mobile:max-w-[70px]">
                      Quantidade
                    </th>
                    <th className="cell-header">Valor</th>
                    <th className="cell-header">Ações</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {produtos.map((prod) => {
                    return (
                      <tr className="row-body" key={prod.produto_id}>
                        <td className="cell-body w-[10px] underline">
                          {prod.produto_id}
                        </td>
                        <td className="cell-body">{prod.nome}</td>
                        <td className="cell-body">{prod.estoque}</td>
                        <td className="cell-body w-[100px]">R$ {prod.preco}</td>
                        <td className="cell-body w-[10px] text-center">
                          {
                            <ActionButton
                              click={() => {
                                setProduto(prod);
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
            </>
          )}
        </section>
        <ModalPerfil prod={produto} />
      </ProdutoContext.Provider>
    </NavBar>
  );
}

export default withAuthenticationRequired(Produtos, {
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

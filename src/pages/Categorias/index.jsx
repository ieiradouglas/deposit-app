import NavBar from "../../components/NavBar";
import { MagnifyingGlass } from "react-loader-spinner";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import { useState, useEffect } from "react";

import { supabase } from "../../database/supabase";

import { NavLink } from "react-router-dom";

import {
  Button,
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
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

import { toast } from "react-toastify";
import { get } from "lodash";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teste, setTeste] = useState({});
  const [campoBuscaProduto, setCampoBuscaProduto] = useState("");

  const toastify = () => toast("Excluído com sucesso!");

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
              <span>{prod_id.categoria_id}</span>
            </div>
            <div className="flex mt-2 items-start">
              <h3 className="text-sm font-bold">Nome:</h3>
              <span>{prod_id.nome_categoria}</span>
            </div>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={1}
                onClick={() => deleteProdutos(prod_id.categoria_id)}
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
    getCategorias("");
  }, []);

  async function getCategorias(text) {
    if (campoBuscaProduto == false) {
      const { data, error } = await supabase.from("categorias").select("*");
      setCategorias(data);
      setLoading(false);
    } else {
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .ilike("nome_categoria", `%${text}%`);
      setCategorias(data);
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

  async function deleteProdutos(campo) {
    const { data, error } = await supabase
      .from("categorias")
      .delete()
      .eq("categoria_id", campo);
    onClose();
    setLoading(true);
    handleReset();
    getCategorias("");
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
      <section className="flex flex-col">
        <div className="mb-3 flex flex-wrap gap-3">
          <NavLink to="/cadastro-categorias">
            <button className=" p-2 rounded-md cursor-pointer text-black bg-verde max-w-[180px]">
              Nova categoria
            </button>
          </NavLink>
          <div>
            <input
              onChange={(e) => {
                setCampoBuscaProduto(e.target.value);
              }}
              onKeyUp={() => getCategorias(campoBuscaProduto)}
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
            <span className="mb-3">Quantidade: {categorias.length}</span>
            <table className="table-content">
              <thead className="table-header mobile:text-xs">
                <tr className="row-header">
                  <th className="cell-header">ID</th>
                  <th className="cell-header">Categoria</th>
                  <th className="cell-header">Ações</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {categorias.map((prod) => {
                  return (
                    <tr className="row-body" key={prod.categoria_id}>
                      <td className="cell-body w-[10px] underline">
                        {prod.categoria_id}
                      </td>
                      <td className="cell-body">{prod.nome_categoria}</td>
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
          </>
        )}
      </section>
      <ModalPerfil prod_id={teste} />
    </NavBar>
  );
}

export default withAuthenticationRequired(Categorias, {
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

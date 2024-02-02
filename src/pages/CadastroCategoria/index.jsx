import { withAuthenticationRequired } from "@auth0/auth0-react";
import { MagnifyingGlass } from "react-loader-spinner";
import NavBar from "../../components/NavBar";
import Input from "../../components/Input";

import { supabase } from "../../database/supabase";

import { useState } from "react";

function CadastroProduto() {
  const [categoria, setCategoria] = useState({});

  const handleChange = (e) => {
    // cria um objeto com o nome do campo "INPUT" com o valor do INPUT.
    setCategoria((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function inserirCategoria() {
    const { data, error } = await supabase
      .from("categorias")
      .insert([
        {
          nome_categoria: categoria.nome_categoria,
        },
      ])
      .select();

    if (error) {
      console.log(error.message);
    }
    console.log(categoria);
  }

  return (
    <NavBar>
      <form className="background w-full flex flex-wrap">
        <div className="flex flex-wrap m-5 w-full justify-center gap-10">
          <fieldset>
            <legend>Nome da Categoria</legend>
            <Input
              type="text"
              placeholder="Nome da Categoria"
              className="border border-black p-2 rounded-sm"
              name="nome_categoria"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
        </div>

        <div className="w-full flex justify-center mt-4">
          <button
            className="w-[200px] bg-roxo rounded-sm p-3"
            onClick={(e) => {
              e.preventDefault();
              inserirCategoria();
            }}
          >
            Cadastrar Categoria
          </button>
        </div>
      </form>
    </NavBar>
  );
}

export default withAuthenticationRequired(CadastroProduto, {
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

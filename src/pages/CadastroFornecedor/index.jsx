import { withAuthenticationRequired } from "@auth0/auth0-react";
import { MagnifyingGlass } from "react-loader-spinner";
import NavBar from "../../components/NavBar";
import Input from "../../components/Input";
import Select from "../../components/Select";

import { supabase } from "../../database/supabase";

import { useState } from "react";

function CadastroFornecedor() {
  const [fornecedor, setFornecedor] = useState({});

  const handleChange = (e) => {
    // cria um objeto com o nome do campo "INPUT" com o valor do INPUT.
    setFornecedor((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function inserirFornecedor() {
    const { data, error } = await supabase
      .from("fornecedores")
      .insert([
        {
          nome_fornecedor: fornecedor.nome_fornecedor,
          endereco: fornecedor.endereco,
          bairro: fornecedor.bairro,
          cidade: fornecedor.cidade,
          estado: fornecedor.estado,
          telefone: fornecedor.telefone,
          email: fornecedor.email,
        },
      ])
      .select();

    if (error) {
      console.log(error.message);
    }
  }

  return (
    <NavBar>
      {console.log(fornecedor)}
      <form className="background w-full flex flex-wrap">
        <div className="flex flex-wrap m-5 w-full justify-center gap-10">
          <fieldset>
            <legend>Nome do Fornecedor</legend>
            <Input
              type="text"
              placeholder="Nome do Produto"
              className="border border-black p-2 rounded-sm"
              name="fornecedor_nome"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
          <fieldset className="w-full max-w-[450px]">
            <legend>Endereço</legend>
            <Input
              type="text"
              placeholder="Endereço"
              className="border border-black p-2 rounded-sm w-full max-w-[450px]"
              name="fornecedor_endereco"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
        </div>

        <div className="flex flex-wrap  m-5 w-full justify-center gap-10">
          <fieldset>
            <legend>Bairro</legend>
            <Input
              type="text"
              placeholder="Bairro"
              className="border border-black p-2 rounded-sm"
              name="fornecedor_bairro"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Estado</legend>
            <Input
              type="text"
              placeholder="Estado"
              className="border border-black p-2 rounded-sm"
              name="fornecedor_estado"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Telefone</legend>
            <Input
              type="tel"
              placeholder="Telefone"
              className="border border-black p-2 rounded-sm w-[199px]"
              name="fornecedor_telefone"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>E-mail</legend>
            <Input
              type="email"
              placeholder="E-mail"
              className="border border-black p-2 rounded-sm w-[199px]"
              name="fornecedor_email"
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
              inserirFornecedor();
            }}
          >
            Cadastrar Fornecedor
          </button>
        </div>
      </form>
    </NavBar>
  );
}

export default withAuthenticationRequired(CadastroFornecedor, {
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

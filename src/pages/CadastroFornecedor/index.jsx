import { withAuthenticationRequired } from "@auth0/auth0-react";
import { MagnifyingGlass } from "react-loader-spinner";
import NavBar from "../../components/NavBar";
import Input from "../../components/Input";
import Select from "../../components/Select";

import { IMaskInput } from "react-imask";

import { supabase } from "../../database/supabase";

import { useState } from "react";

function CadastroFornecedor() {
  const [fornecedor, setFornecedor] = useState({});
  const [estado, setEstado] = useState();
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

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
          estado: fornecedor.fornecedor_estado,
          telefone: fornecedor.telefone,
          email: fornecedor.email,
        },
      ])
      .select();

    if (error) {
      console.log(error.message);
    }
  }

  async function buscaEstado() {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => response.json())
      .then((data) => {
        setEstados(data);
      });
  }

  async function buscaCidade(uf) {
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    )
      .then((response) => response.json())
      .then((data) => setCidades(data));
  }

  return (
    <NavBar>
      <h1 className="text-center font-extrabold text-3xl uppercase font-sans">
        Cadastro de fornecedor
      </h1>
      <IMaskInput mask="000.000.000-00" placeholder="Digite o seu CPF" />
      <form className="background w-full flex flex-wrap">
        <div className="flex flex-col flex-wrap m-5 w-full justify-center items-center gap-10">
          <fieldset className="w-full max-w-[450px]">
            <legend>Nome do Fornecedor</legend>
            <Input
              type="text"
              placeholder="Castro Distribuidora"
              className="border border-black p-2 rounded-sm w-full max-w-[450px]"
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
              placeholder="Rua das flores..."
              className="border border-black p-2 rounded-sm w-full max-w-[450px]"
              name="fornecedor_endereco"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
          <fieldset className="w-full max-w-[450px]">
            <legend>E-mail</legend>
            <Input
              type="email"
              placeholder="exemplo@email.com"
              className="border border-black p-2 rounded-sm w-full max-w-[450px]"
              name="fornecedor_email"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>

          <div className="flex flex-wrap gap-10 w-full max-w-[450px]">
            <fieldset>
              <legend>Estado</legend>
              <Select
                name="fornecedor_estado"
                onClick={() => {
                  buscaEstado();
                }}
                onChange={(e) => {
                  setFornecedor((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.selectedIndex + 1,
                  }));
                  buscaCidade(e.target.value);
                }}
              >
                {estados.map((uf) => {
                  return (
                    <option key={uf.id} value={uf.id}>
                      {uf.nome}
                    </option>
                  );
                })}
              </Select>
            </fieldset>
            <fieldset>
              <legend>Cidade</legend>
              <Select
                name="fornecedor_cidade"
                onClick={() => {}}
                onChange={(e) => {
                  setFornecedor((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.selectedIndex + 1,
                  }));
                }}
              >
                {cidades.map((cd) => {
                  return (
                    <option key={cd.id} value={cd.nome}>
                      {cd.nome}
                    </option>
                  );
                })}
              </Select>
            </fieldset>
          </div>
          <fieldset>
            <legend>Telefone</legend>
            {/* <Input
              type="tel"
              placeholder="(99) 9 9999-9999"
              className="border border-black p-2 rounded-sm "
              name="fornecedor_telefone"
              onChange={(e) => {
                handleChange(e);
              }}
            /> */}
            <IMaskInput
              mask="(00) 0 0000-0000"
              placeholder="Digite o seu telefone..."
              className="border border-black p-2 rounded-sm "
              name="fornecedor_telefone"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button
            className="w-[200px] bg-roxo rounded-sm p-3 text-white"
            onClick={(e) => {
              e.preventDefault();
              /* inserirFornecedor(); */
              console.log(fornecedor);
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

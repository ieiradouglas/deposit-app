import { withAuthenticationRequired } from "@auth0/auth0-react";
import { MagnifyingGlass } from "react-loader-spinner";
import NavBar from "../../components/NavBar";
import Input from "../../components/Input";
import Select from "../../components/Select";

import { supabase } from "../../database/supabase";

import { useState } from "react";

function CadastroProduto() {
  const [categorias, setCategorias] = useState([]);
  const [produto, setProduto] = useState({});

  const handleChange = (e) => {
    // cria um objeto com o nome do campo "INPUT" com o valor do INPUT.
    setProduto((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function getOptions(tabela) {
    const { data } = await supabase.from(`${tabela}`).select("*");

    if (tabela == "categorias") {
      setCategorias(data);
    }
    if (tabela == "fornecedores") {
      setFornecedores(data);
    }
  }

  async function inserirProduto() {
    const { data, error } = await supabase
      .from("produtos")
      .insert([
        {
          nome: produto.nome_produto,
          descricao: produto.descricao,
          preco: produto.valor_produto,
          estoque: produto.quantidade,
          fornecedor_id: produto.fornecedor,
          data_adicao: produto.data_entrada,
          categoria_id: produto.categoria_produto,
        },
      ])
      .select();

    if (error) {
      console.log(error.message);
    }
    console.log(produto);
  }

  return (
    <NavBar>
      <form className="background w-full flex flex-wrap">
        <div className="flex flex-wrap m-5 w-full justify-center gap-10">
          <fieldset>
            <legend>Nome do Produto</legend>
            <Input
              type="text"
              placeholder="Nome do Produto"
              className="border border-black p-2 rounded-sm"
              name="nome_produto"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Descrição</legend>
            <Input
              type="text"
              placeholder="Descrição"
              className="border border-black p-2 rounded-sm"
              name="descricao"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Categoria do Produto</legend>
            <Select
              name="categoria_produto"
              onClick={() => getOptions("categorias")}
              onChange={(e) => {
                setProduto((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.selectedIndex + 1,
                }));
              }}
            >
              {categorias.map((cat) => {
                return (
                  <option key={cat.categoria_id} value={cat.nome_categoria}>
                    {cat.nome_categoria}
                  </option>
                );
              })}
            </Select>
          </fieldset>
        </div>

        <div className="flex flex-wrap  m-5 w-full justify-center gap-10">
          <fieldset>
            <legend>Valor do Produto</legend>
            <Input
              type="number"
              placeholder="Valor do produto"
              className="border border-black p-2 rounded-sm"
              name="valor_produto"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Quantidade</legend>
            <Input
              type="number"
              placeholder="Quantidade"
              className="border border-black p-2 rounded-sm"
              name="quantidade"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Fornecedor</legend>
            <Select
              name="fornecedor"
              onClick={() => getOptions("fornecedores")}
              onChange={(e) => {
                setProduto((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.selectedIndex + 1,
                }));
              }}
            >
              {fornecedores.map((forne) => {
                return (
                  <option
                    key={forne.fornecedor_id}
                    value={forne.nome_fornecedor}
                  >
                    {forne.nome_fornecedor}
                  </option>
                );
              })}
            </Select>
          </fieldset>
          <fieldset>
            <legend>Data de Entrada</legend>
            <Input
              type="date"
              placeholder="Data de Cadastro"
              className="border border-black p-2 rounded-sm w-[199px]"
              name="data_entrada"
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
              inserirProduto();
            }}
          >
            Cadastrar Produto
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

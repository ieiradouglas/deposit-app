//@ts-nocheck
import { useState, useEffect } from "react"
import supabase from "../../database/supabase"
import { useNavigate, NavLink } from "react-router-dom"
//@ts-ignore
import shortid from "shortid"
import "../Login/style.css"

import toast from "react-hot-toast"

interface petInfo {
  nome: string
  especie: string
  raca: string
  porte: string
  idade: string
  sexo: string
  foto: string
  descricao: string
  status: string
  vacinas: string
  vermifugado: string
  castrado: string
  necessidades_especiais: string
  contato: string
}

export default function Cadastro() {
  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [base64File, setBase64File] = useState()

  const [petData, setPetData] = useState<petInfo>({
    nome: null,
    especie: null,
    raca: null,
    porte: null,
    idade: null,
    sexo: null,
    foto: null,
    descricao: null,
    status: null,
    vacinas: null,
    vermifugado: null,
    castrado: null,
    necessidades_especiais: null,
    contato: null,
  })

  const handleChange = (e: any) => {
    // cria um objeto com o nome do campo "INPUT" com o valor do INPUT.
    setPetData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (event: any) => {
    const newFile = event.target.files[0]
    setFile(newFile)

    const reader = new FileReader()
    reader.onload = () => {
      //@ts-ignore
      setBase64File(reader.result)
    }
    reader.readAsDataURL(newFile)
  }

  async function handleFileUpload() {
    try {
      if (base64File == null) {
        throw new Error("Uma imagem deve ser selecionada!")
      } else if (petData.nome == null) {
        throw new Error("Campo 'Nome' deve ser preenchido.")
      } else if (petData.especie == null) {
        throw new Error("Campo 'Espécie' deve ser preenchido.")
      } else if (petData.raca == null) {
        throw new Error("Campo 'Raça' deve ser preenchido.")
      } else if (petData.porte == null) {
        throw new Error("Campo 'Porte' deve ser preenchido.")
      } else if (petData.sexo == null) {
        throw new Error("Campo 'Sexo' deve ser preenchido.")
      } else if (petData.status == null) {
        throw new Error("Campo 'Status' deve ser preenchido.")
      } /* else if (petData.contato == null) {
        throw new Error("Campo 'Contato' deve ser preenchido.")
      } */ else {
        const nomeImagem = shortid.generate()

        registrarPet(nomeImagem)
        const { data, error } = await supabase.storage
          .from("pets")
          //@ts-ignore
          .upload(nomeImagem, file)

        navigate("/inicio")
      }
    } catch (error) {
      toast.error(`${error.message}`)
    } finally {
    }
  }

  async function getUser() {
    //@ts-ignore
    const { data, error } = await supabase.auth.getUser()
    if (data.user == null) {
      toast.error("Faça o login para cadastrar um pet.")
      navigate("/login")
    }
  }

  async function registrarPet(idFoto) {
    const { data, error } = await supabase.from("animal").insert([
      {
        nome: petData.nome,
        especie: petData.especie,
        raca: petData.raca,
        porte: petData.porte,
        idade: petData.idade,
        sexo: petData.sexo,
        foto: idFoto,
        descricao: petData.descricao,
        status: petData.status,
        vacinas: petData.vacinas,
        vermifugado: petData.vermifugado,
        castrado: petData.castrado,
        necessidades_especiais: petData.necessidades_especiais,
        contato: petData.contato,
      },
    ])
    console.log(petData)
    if (!error) {
      toast.success("Cadastrado com sucesso!")
    }
    if (error) {
      toast.error(`Erro: ${error.message}`)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <main>
      <section className="h-screen flex justify-center items-center">
        <form className="flex flex-col justify-center items-center gap-6 p-11 glassmorf text-center">
          <h2 className="font-extrabold text-4xl">
            <span className="text-[#FFBD59]">Adote</span> Pet
          </h2>
          <h3 className="font-semibold border-solid border-b-2 pb-2">
            Preencha corretamente as informações sobre os animais
          </h3>

          <div className="flex items-center w-full max-w-[97%]">
            <label className="font-bold">Status do Pet:</label>
            <select
              name="status"
              defaultValue=""
              className="border-solid border-2 border-black rounded-sm p-2 m-2 disabled:font-semibold"
              onChange={(e) => handleChange(e)}
            >
              <option value="" disabled>
                Escolha uma opção...
              </option>
              <option value="adoção">Adoção</option>
            </select>
          </div>

          <div className="flex flex-col justify-center items-center">
            {base64File != null ? (
              <img
                className="m-2 w-full max-w-40"
                src={base64File}
                alt="Imagem selecionada"
              />
            ) : (
              false
            )}
            <input
              type="file"
              id="file_input"
              name="foto"
              accept="image/png, image/jpeg"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className="flex flex-wrap">
            <div className="flex flex-col items-start">
              <label>Nome:</label>
              <input
                name="nome"
                type="text"
                placeholder="Ex: Scooby"
                className="border-solid border-2 border-black rounded-sm p-2 duration-150 m-2 "
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label>Espécie:</label>
              <input
                name="especie"
                type="text"
                placeholder="Ex: Cachorro, Gato..."
                className="border-solid border-2 border-black rounded-sm p-2 duration-150 m-2 "
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="flex flex-col items-start">
              <label>Raça:</label>
              <input
                name="raca"
                type="text"
                placeholder="Ex: Vira-lata, Pug..."
                className="border-solid border-2 border-black rounded-sm p-2 duration-150 m-2 "
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label>Porte:</label>
              <input
                name="porte"
                type="text"
                placeholder="Ex: Grande, Pequeno..."
                className="border-solid border-2 border-black rounded-sm p-2 duration-150 m-2 "
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center">
            <div className="flex flex-col items-start">
              <label>Sexo:</label>
              <input
                name="sexo"
                type="text"
                placeholder="Ex: Fêmea..."
                className="border-solid border-2 border-black rounded-sm p-2 duration-150 m-2  max-w-[183px]"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label>Descrição:</label>
              <input
                name="descricao"
                type="text"
                placeholder="Ex: Muito dócil..."
                className="border-solid border-2 border-black rounded-sm p-2 duration-150 m-2  max-w-[183px]"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label>Idade:</label>
              <input
                name="idade"
                type="number"
                placeholder="Ex: 5..."
                className="border-solid border-2 border-black rounded-sm p-2 duration-150 m-2  max-w-[90px]"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="flex flex-col items-start w-full">
            <label>Vacinas:</label>
            <input
              name="vacinas"
              type="text"
              placeholder="Digite as vacinas, separadas por vírgula, caso possua..."
              className="border-solid border-2 border-black rounded-sm p-2 duration-150 m-2  w-full max-w-[97%]"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex w-full">
            <div className="flex flex-col items-start w-full">
              <label>Vermifugado:</label>
              <select
                name="vermifugado"
                defaultValue=""
                className="border-solid border-2 border-black rounded-sm p-2 m-2 max-w-[97%]"
                onChange={(e) => handleChange(e)}
              >
                <option value="" disabled>
                  Escolha uma opção...
                </option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
                <option value="Não sei">Não sei</option>
              </select>
            </div>

            <div className="flex flex-col items-start w-full">
              <label>Castrado:</label>
              <select
                name="castrado"
                defaultValue=""
                className="border-solid border-2 border-black rounded-sm p-2 m-2 max-w-[97%]"
                onChange={(e) => handleChange(e)}
              >
                <option value="" disabled>
                  Escolha uma opção...
                </option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
                <option value="Não sei">Não sei</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col items-start w-full">
            <label>Necessidade especial:</label>
            <input
              name="necessidades_especiais"
              type="text"
              placeholder="Descreva as necessidades especiais, caso ele(a) possua..."
              className="border-solid border-2 border-black rounded-sm p-2 duration-150 m-2 placeholder:text-black w-full max-w-[97%]"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-row gap-2">
            <button
              className="border rounded-lg p-3 font-bold hover:scale-110 duration-150 min-w-32 bg-[#FFBD59] max-w-28"
              onClick={(e) => {
                e.preventDefault()
                /* registrarPet() */
                handleFileUpload()
                console.log(petData)
              }}
            >
              Cadastrar
            </button>
            <input
              value="Limpar"
              type="reset"
              className="border rounded-lg p-3 font-bold hover:scale-110 duration-150 min-w-32 bg-black text-white"
              onClick={() => {
                //@ts-ignore
                setBase64File(null)
              }}
            />
          </div>

          <NavLink to="/inicio" className="w-full">
            <button className="border rounded-lg p-3 font-bold hover:scale-110 duration-150 min-w-32">
              Voltar
            </button>
          </NavLink>
        </form>
      </section>
    </main>
  )
}

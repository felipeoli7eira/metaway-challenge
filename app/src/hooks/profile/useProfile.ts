import { ref } from "vue"
import { toast } from "@steveyuowo/vue-hot-toast"
import { Form, Field, ErrorMessage } from "vee-validate"
import { updateProfileFormSchema } from "./../../schemas/profile/update"
import useAuthToken from "../auth/useAuthToken"
import http from "../../services/http"
import { type GetUserDataHttpResponse, type UserObject } from "./types"

const ENDPOINT_GET = "/api/usuario/buscar/"
const ENDPOINT_PUT = "/api/usuario/atualizar"

export type ResponseObject = {
  usuario: {
    id: number
    nome: string
    dataNascimento: string
    cpf: string
    email: string
    telefone: string
    username: string
    password: string
  }
  tipos: string[]
}

export default function useProfile() {
  // * props
  const requestIsRunning = ref<boolean>(false)
  const putRequestIsRunning = ref<boolean>(false)
  const showPasswordAsPlainText = ref<boolean>(false)

  const data = ref<ResponseObject>()
  const emptyInitialValues = {
    name: "",
    email: "",
    username: "",
    cpf: "",
    birthDate: "",
    phone: "",
    roles: [],
    password: "",
  }
  const initialValues = ref<{
    name: string,
    email: string,
    username: string,
    cpf: string,
    birthDate: string,
    phone: string,
    roles: string[],
    password: string
  }>(emptyInitialValues)

  // * configs
  const { getAuthTokenStateValue } = useAuthToken()
  const user = getAuthTokenStateValue()

  // * methods
  async function get(): Promise<void> {
    try {
      requestIsRunning.value = true
      const request = await http.get(ENDPOINT_GET.concat(user.id.toString()))

      if (request.status !== 200) {
        toast.error("Erro ao buscar seus dados de perfil")
        return
      }

      const response = request.data.object

      data.value = response
      setInitialFormValues(response)
    } catch {
      data.value = undefined
      initialValues.value = emptyInitialValues
      toast.error("Erro ao buscar seus dados de perfil")
    }
    finally {
      requestIsRunning.value = false
    }
  }

  async function submitUpdate(formDate: any) {
    try {
      const payload = {
        cpf: formDate.cpf,
        dataNascimento: formDate.birthDate,
        email: formDate.email,
        id: user.id,
        nome: formDate.name,
        telefone: formDate.phone,
        username: formDate.username,
        password: formDate.password
      }

      putRequestIsRunning.value = true
      const request = await http.put(ENDPOINT_PUT, payload)

      if (request.status !== 200) {
        toast.error("Erro ao atualizar seus dados de perfil")
        return
      }

      toast.success("Dados de perfil atualizados com sucesso")
    }
    catch (error) {
      console.log(error)
      toast.error("Erro ao atualizar seus dados de perfil")
    }
    finally {
      putRequestIsRunning.value = false
    }
  }

  function invalidSubmitUpdate(): void {
    toast.error("Verifique os campos e tente novamente")
  }

  function setInitialFormValues(data: UserObject) {
    initialValues.value = {
      name: data.usuario.nome,
      email: data.usuario.email,
      username: data.usuario.username,
      cpf: data.usuario.cpf,
      birthDate: data.usuario.dataNascimento,
      phone: data.usuario.telefone,
      roles: data.tipos,
      password: ""
    }
  }

  return {
    get,
    requestIsRunning,
    putRequestIsRunning,

    data,
    initialValues,
    Form,
    Field,
    ErrorMessage,
    submitUpdate,
    invalidSubmitUpdate,
    updateProfileFormSchema,
    showPasswordAsPlainText
  }
}

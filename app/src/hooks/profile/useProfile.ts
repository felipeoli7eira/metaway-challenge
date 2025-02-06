import { ref } from "vue"
import { toast } from "@steveyuowo/vue-hot-toast"
import { Form, Field, ErrorMessage } from "vee-validate"
import useAuthToken from "../auth/useAuthToken"
import http from "../../services/http"
import { updateProfileFormSchema } from "./../../schemas/profile/update"
const ENDPOINT = "/api/usuario/buscar/"

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
  const data = ref<ResponseObject>()
  const emptyInitialValues = {
    name: "",
  }
  const initialValues = ref<{
    name: string
  }>(emptyInitialValues)

  // * configs
  const { getAuthTokenStateValue } = useAuthToken()
  const user = getAuthTokenStateValue()

  // * methods
  async function get(): Promise<void> {
    try {
      requestIsRunning.value = true
      const request = await http.get(ENDPOINT.concat(user.id.toString()))

      if (request.status !== 200) {
        toast.error("Erro ao buscar os dados de perfil")
        return
      }

      const response = request.data.object

      data.value = response
      initialValues.value = {
        name: response.usuario.nome
      }
    } catch {
      data.value = undefined
      initialValues.value = emptyInitialValues
      toast.error("Erro ao buscar os dados de perfil")
    }
    finally {
      requestIsRunning.value = false
    }
  }

  function submitUpdate() {
    console.log("submitUpdate")
  }

  function invalidSubmitUpdate() {
    console.log("invalidSubmitUpdate")
  }

  return {
    get,
    requestIsRunning,
    data,
    initialValues,
    Form,
    Field,
    ErrorMessage,
    submitUpdate,
    invalidSubmitUpdate,
    updateProfileFormSchema
  }
}

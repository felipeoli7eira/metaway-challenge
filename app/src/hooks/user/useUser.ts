const POST_URL = "/api/usuario/salvar"
const GET_URL = "/api/v1/Usuarios"

import {
  Form,
  Field,
  ErrorMessage
} from "vee-validate"

import { toast } from "@steveyuowo/vue-hot-toast"
import http from "../../services/http"
import PostUserSchema from "../../schemas/user/post"
import ckeckIfHasErrorInKey from "../../utils/layout/ckeckIfHasErrorInKey"
import { ref } from "vue"

type FormFields = {
  name: string,
  username: string,
  password: string,
  email: string,
  phone: string,
  role: string,
  birthDate: string,
  cpf: string
}

export default function useUser() {
  const showPasswordAsPlainText = ref<boolean>(false)
  const postRequestIsRunning = ref<boolean>(false)

  async function getUsers() {
  }

  async function postUser(formData: FormFields, {resetForm}): Promise<void> {
    try {
      postRequestIsRunning.value = true
      const request = await http.post(POST_URL, {
        tipos: [
          formData.role
        ],
        usuario: {
          cpf: formData.cpf,
          dataNascimento: formData.birthDate,
          email: formData.email,
          nome: formData.name,
          password: formData.password,
          telefone: formData.phone,
          username: formData.username
        }
      })

      if (request.status !== 200) {
        toast.error("Erro ao cadastrar o usuario")
        return
      }

      toast.success("Usuario cadastrado com sucesso")
      resetForm()
      closeDialogCreateUser()
    }
    catch (error) {
      console.error(error)
      toast.error("Erro ao cadastrar o usuario")
    }
    finally {
      postRequestIsRunning.value = false
    }
  }

  function invalidPostSubmit() {
    toast.error("Verifique os campos e tente novamente")
  }

  function closeDialogCreateUser() {
    const dialog: HTMLDialogElement = document.getElementById("modalCreateUser") as HTMLDialogElement

    if (!dialog) {
      return
    }

    dialog.close()
  }

  return {
    Form,
    Field,
    ErrorMessage,
    PostUserSchema,
    ckeckIfHasErrorInKey,
    postUser,
    postRequestIsRunning,
    getUsers,
    invalidPostSubmit,
    showPasswordAsPlainText,
    closeDialogCreateUser
  }
}

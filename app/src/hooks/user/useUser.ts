const POST_URL = "/api/usuario/salvar"
const GET_URL = "/api/usuario/pesquisar"
const PUT_URL = "/api/usuario/atualizar"

import {
  Form,
  Field,
  ErrorMessage
} from "vee-validate"

import { toast } from "@steveyuowo/vue-hot-toast"
import http from "../../services/http"
import formSchema from "../../schemas/user/formSchema"
import ckeckIfHasErrorInKey from "../../utils/layout/ckeckIfHasErrorInKey"
import { ref } from "vue"
import type User from "../../types/User"

type FormFields = {
  name: string,
  username: string,
  password: string,
  email: string,
  phone: string,
  role: string,
  birthDate: string,
  cpf: string,
  id?: number
}

export default function useUser() {
  const showPasswordAsPlainText = ref<boolean>(false)
  const postRequestIsRunning = ref<boolean>(false)
  const getUsersRequestIsRunning = ref<boolean>(false)
  const putUsersRequestIsRunning = ref<boolean>(false)

  const users = ref<User[]>([])

  async function getUsers(termo: string = ""): Promise<void> {
    try {
      getUsersRequestIsRunning.value = true
      const request = await http.post(GET_URL, {termo})

      if (request.status !== 200) {
        throw new Error(request.statusText)
      }

      users.value = request.data
    } catch (_) {
      toast.error("Erro ao buscar os usuarios")
    } finally {
      getUsersRequestIsRunning.value = false
    }
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
      getUsers()
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

  async function putUser(formData: any, {resetForm}): Promise<void> {
    try {
      putUsersRequestIsRunning.value = true

      let payload = {
        cpf: formData.cpf,
        dataNascimento: formData.birthDate,
        email: formData.email,
        nome: formData.name,
        telefone: formData.phone,
        username: formData.username,
        id: formData.id
      }

      if (formData.password.length) {
        payload.password = formData.password
      }

      const request = await http.put(PUT_URL, payload)

      if (request.status !== 200) {
        toast.error("Erro ao atualizar o usuario")
        return
      }

      toast.success("Usuario atualziado com sucesso")
      getUsers()
      resetForm()
      closeDialogCreateUser()
    }
    catch (error) {
      console.error(error)
      toast.error("Erro ao atualizar o usuario")
    }
    finally {
      putUsersRequestIsRunning.value = false
    }
  }

  function invalidPostSubmit() {
    toast.error("Verifique os campos e tente novamente")
  }

  function closeDialogCreateUser() {
    const dialog: HTMLDialogElement = document.getElementById("dialogCreateUser") as HTMLDialogElement

    if (!dialog) {
      return
    }

    dialog.close()
  }

  return {
    Form,
    Field,
    ErrorMessage,
    formSchema,

    ckeckIfHasErrorInKey,
    postUser,
    postRequestIsRunning,
    getUsers,
    invalidPostSubmit,
    showPasswordAsPlainText,
    closeDialogCreateUser,

    getUsersRequestIsRunning,
    users,
    putUser,
    putUsersRequestIsRunning
  }
}

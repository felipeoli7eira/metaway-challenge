import { ref } from "vue";
import http from "../../services/http";
import { toast } from "@steveyuowo/vue-hot-toast";
import {
  Form,
  Field,
  ErrorMessage,
  GenericObject,
  InvalidSubmissionHandler,
} from "vee-validate";

import {
  postSchema,
  initialValuesFormCreate,
} from "./../../schemas/customer";

export default function usePost() {
  const ENDPOINT = "/api/v1/Clientes";
  const requestIsRunning = ref<boolean>(false);

  const formErrors = ref<Partial<Record<string, string>>>();

  const whenPostFinish = ref<Function>(() => {})

  const invalidSubmit: InvalidSubmissionHandler<GenericObject, GenericObject> = ({ errors }) => {
    formErrors.value = errors;
  };

  async function submit(values: GenericObject, { resetForm }: GenericObject)
  {
    try
    {
      const payload = {
        name: values.name,
        email: values.email,
        cpf: values.document.replace(/\D/g, '')
      };

      requestIsRunning.value = true;
      const request = await http.post(ENDPOINT, payload);
      requestIsRunning.value = false;

      if (request.status !== 201) {
        toast.error("Cliente não cadastrado!");
        return
      }

      toast.success("Cadastro finalizado!");

      whenPostFinish.value()

      resetForm();
    }
    catch (error)
    {
      requestIsRunning.value = false;
      toast.error("Erro ao cadastrar o cliente");
    }
  }

  return {
    submit,
    requestIsRunning,

    postSchema,
    initialValuesFormCreate,

    Form,
    Field,
    ErrorMessage,

    invalidSubmit,
    whenPostFinish,
    formErrors,
  };
}

import { ref } from "vue";
import { Form, Field, ErrorMessage, GenericObject, InvalidSubmissionHandler } from "vee-validate";
import { toast } from "@steveyuowo/vue-hot-toast";
import { useRouter } from "vue-router";
import useAuthToken from "./../auth/useAuthToken";
import http from "./../../services/http";

import { validationSchema } from "./schema";

export type FormSignInFields = {
  username: string;
  password: string;
};

export default function useSignIn() {
  const ENDPOINT = "api/auth/login";

  const { setToken } = useAuthToken();

  const router = useRouter();
  const errors = ref<FormSignInFields>();
  const requestIsRunning = ref<boolean>(false);

  const initialValues: FormSignInFields = {
    username: "",
    password: "",
  };

  const invalidSubmit: InvalidSubmissionHandler<GenericObject, GenericObject> = ({errors}) => {
    errors.value = errors.errors;
  }

  async function submit(values: GenericObject, { resetForm }: GenericObject): Promise<void> {
    try {
      const payload: FormSignInFields = {
        username: values.username,
        password: values.password
      }

      requestIsRunning.value = true;
      const request = await http.post(ENDPOINT, payload);

      if (request.status !== 200) {
        toast.error("Não foi possível fazer login no momento...");
        return
      }

      const response = request.data;
      setToken(JSON.stringify(response));
      toast.success("Bem-vindo(a)");

      resetForm({
        values: initialValues,
      });

      router.push({ name: "app.index" });
    } catch (error) {
      toast.error("Erro ao tentar efetuar login");
    }
    finally {
      requestIsRunning.value = false;
    }
  }

  return {
    initialValues,
    invalidSubmit,
    submit,
    validationSchema,
    Form,
    Field,
    ErrorMessage,
    errors,
    requestIsRunning,
  };
}

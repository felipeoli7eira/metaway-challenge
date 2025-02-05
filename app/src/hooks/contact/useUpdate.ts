// import http from "../../services/http";

import { ref } from "vue";
import { toast } from "@steveyuowo/vue-hot-toast";
import { GenericObject, InvalidSubmissionHandler } from "vee-validate";

import { updateSchema, FormUpdateFiels, initialUpdateFormValues } from "../../schemas/contact";

// const ENDPOINT = "/api/v1/Clientes";

export default function useUpdate() {
  const requestIsRunning = ref<boolean>(false);

  const formErrors = ref<Partial<Record<string, string>>>();

  const updateData =  ref<FormUpdateFiels>(initialUpdateFormValues)

  const whenUpdateFinish = ref<Function>(() => {})

  const invalidSubmit: InvalidSubmissionHandler<GenericObject, GenericObject> = ({ errors }): void => {
    formErrors.value = errors;
  };

  async function submit(_: GenericObject, { resetForm }: GenericObject)
  {
    try
    {
      // const payload = {
      //   name: values.name,
      //   email: values.email,
      //   cpf: values.document.replace(/\D/g, '')
      // };

      // requestIsRunning.value = true;
      // const request = await http.post(ENDPOINT, payload);
      // requestIsRunning.value = false;

      // if (request.status !== 201) {
      //   toast.error("Cliente não cadastrado!");
      //   return
      // }

      // toast.success("Cadastro finalizado!");

      resetForm();
      whenUpdateFinish.value()
    }
    catch (error)
    {
      requestIsRunning.value = false;
      toast.error("Erro no procedimento");
    }
  }

  function openUpdateModal(data: FormUpdateFiels): void {
    updateData.value = data;

    const updateModal = document.getElementById('updateModal') as HTMLDialogElement
    updateModal.showModal()
  }

  function closeUpdateModal(): void {
    updateData.value = initialUpdateFormValues;

    const updateModal = document.getElementById('updateModal') as HTMLDialogElement
    updateModal.close()
  }

  return {
    updateSubmit: submit,
    updateRequestIsRunning: requestIsRunning,
    updateData,

    openUpdateModal,
    closeUpdateModal,

    updateSchema,

    invalidUpdateSubmit: invalidSubmit,
    whenUpdateFinish,
    updateFormErrors: formErrors
  };
}

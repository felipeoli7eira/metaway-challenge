import { ref } from "vue";
import http from "../../services/http";
import { toast } from "@steveyuowo/vue-hot-toast";
import Customer from "../../types/Customer";

const ENDPOINT = "/api/v1/Clientes";

export default function useDelete() {
  const requestIsRunning = ref<boolean>(false);
  const data = ref<Customer | undefined>();
  const whenDeleteFinish = ref<Function>(() => console.log("finished"));

  async function execDelete() {
    if (data.value === undefined) {
      toast.error("Selecione um cliente para prosseguir com a deleção.");
      return;
    }

    const toastId = toast.loading("Deletando...");

    try {
      requestIsRunning.value = true;
      await http.delete(ENDPOINT.concat("/", data.value.id));
      requestIsRunning.value = false;

      toast.update(toastId, {
        type: "success",
        message: "Deleção finalizada",
      });

      whenDeleteFinish.value();
    } catch (error) {
      requestIsRunning.value = false;
      toast.update(toastId, {
        type: "error",
        message: "Erro ao deletar",
      });
    } finally {
      closeModal();
    }
  }

  function openModal(): void {
    const modal = document.getElementById("modalDelete") as HTMLDialogElement;
    modal.showModal();
  }

  function closeModal(): void {
    const modal = document.getElementById("modalDelete") as HTMLDialogElement;
    data.value = undefined;
    modal.close();
  }

  function setToDelete(resource: Customer): void {
    data.value = resource;
    openModal();
  }

  return {
    execDelete,
    requestIsRunning,
    whenDeleteFinish,
    data,

    openModal,
    closeModal,
    setToDelete,
  };
}

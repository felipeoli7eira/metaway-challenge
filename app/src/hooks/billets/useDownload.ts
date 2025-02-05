import { ref } from "vue";
import { toast } from "@steveyuowo/vue-hot-toast";
import http from "../../services/http";

export default function useGet() {
  const ENDPOINT = "/api/v1/Boleto/download/:id";

  const requestIsRunning = ref<boolean>(false);
  const billetStateId = ref<string>("");

  async function download(billetId: string): Promise<void>
  {
    const toastId = toast.loading("Baixando...");

    try
    {
        billetStateId.value = billetId;

        requestIsRunning.value = true;
        const response = await http.get(ENDPOINT.replace(":id", billetStateId.value), {
            responseType: "blob"
        });
        requestIsRunning.value = false;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", 'boleto.pdf');
        document.body.appendChild(link);
        link.click();

        link.remove();

        toast.update(toastId, {
            type: "success",
            message: "Download finalizado"
        });
    }
    catch (error)
    {
        billetStateId.value = "";
        requestIsRunning.value = false;

        toast.update(toastId, {
            type: "error",
            message: "Erro no procedimento"
        });
    }
  }

  return {
    requestIsRunning,
    download,
    billetStateId
  };
}

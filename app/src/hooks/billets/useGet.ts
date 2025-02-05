import { ref } from "vue";
import http from "../../services/http";
import { toast } from "@steveyuowo/vue-hot-toast";
import Billet from "../../types/Billet";

export type Billets = {};

export default function useGet() {
  const ENDPOINT = "/api/v1/Boleto/listar";

  const data = ref<Billet[]>([]);
  const requestIsRunning = ref<boolean>(false);
  const pageNumber = ref<number>(1);
  const pageSize = ref<number>(5);

  async function get(): Promise<void> {
    try {
      requestIsRunning.value = true;
      const request = await http.get(ENDPOINT, {
        params: {
          pageNumber: pageNumber.value,
          pageSize: pageSize.value,
        },
      });
      requestIsRunning.value = false;

      if (request.status !== 200) {
        toast.error("Erro ao listar os dados");
        return;
      }

      data.value = request.data?.items;

      console.clear();
      console.log(request);
    } catch (error) {
      requestIsRunning.value = false;
      console.clear();
      console.log(error);
      toast.error("Erro ao listar os dados");
    }
  }

  return {
    data,
    get,
    requestIsRunning,
  };
}

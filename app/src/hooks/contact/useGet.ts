import { ref } from "vue";
import { toast } from "@steveyuowo/vue-hot-toast";

import http from "../../services/http";
import Customer from "../../types/Customer";

const ENDPOINT = "/api/v1/Clientes";

export default function useGet() {
  const requestIsRunning = ref<boolean>(false);
  const data = ref<Customer[]>([]);
  const pageNumber = ref<number>(1)
  const pageSize = ref<number>(10)
  const hasPreviousPage = ref<boolean>(false)
  const hasNextPage = ref<boolean>(false)

  async function get() {
    try {
      requestIsRunning.value = true;
      const request = await http.get(ENDPOINT, {
        params: {
          pageNumber: pageNumber.value,
          pageSize: pageSize.value
        }
      });
      requestIsRunning.value = false;

      if (request.status !== 200) {
        toast.error("Não foi possível obter os clientes...");
        return
      }

      hasNextPage.value = request.data?.hasNextPage ?? false;
      hasPreviousPage.value = request.data?.hasPreviousPage ?? false;
      pageNumber.value = request.data?.pageNumber ?? 1;

      data.value = request.data.items
    } catch (_) {
      requestIsRunning.value = false;
      data.value = []
      toast.error("Não foi possível obter os clientes...");
    }
  }

  function handlePageChange(page: number)
  {
    pageNumber.value = page;

    get();
  }

  return {
    get,
    requestIsRunning,
    data,
    pageNumber,
    pageSize,
    handlePageChange,
    hasNextPage,
    hasPreviousPage
  };
}

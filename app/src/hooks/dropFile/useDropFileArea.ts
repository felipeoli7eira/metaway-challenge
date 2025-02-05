import { ref } from "vue";
import { toast } from "@steveyuowo/vue-hot-toast";

import http from "../../services/http";

export default function useDropFileArea()
{
  const file = ref<File | null>();
  const isOver = ref<boolean>(false);
  const fileName = ref<string | undefined>();
  const base64File = ref<string>("");
  const requestIsRunning = ref<boolean>(false);

  function onDrop(event: DragEvent): void {
    event.preventDefault();

    if (event.dataTransfer && event.dataTransfer.files.length) {
      const droppedFile = event.dataTransfer.files[0];
      fileName.value = droppedFile.name;

      file.value = droppedFile;
    }

    isOver.value = false;
  }

  function onDragOver(_: DragEvent): void {
    isOver.value = true;
  }

  function onDragLeave(_: DragEvent): void {
    isOver.value = false;
  }

  function reset(): void {
    fileName.value = undefined;
    file.value = null;
    isOver.value = false;
  }

  function handleInputFileChangeEvent(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length) {
      const selectedFile = files[0];
      fileName.value = selectedFile.name;
      file.value = selectedFile;
    }
  }

  function upload(): void {
    if (file.value?.type !== "application/pdf") {
      toast.error("O arquivo não é um PDF");
      return;
    }

    try {
      requestIsRunning.value = true;
      convertToBase64(file.value);
    } catch (error) {
      requestIsRunning.value = false;
      toast.error("Erro ao fazer upload do boleto");
    }
  }

  function convertToBase64(fileToConvert: File) {
    const reader = new FileReader();
    reader.readAsDataURL(fileToConvert);

    reader.onload = () => {
      const base64 = reader.result as string;
      base64File.value = base64.split(",")[1];

      whenBase64IsReady()
    };

    reader.onerror = () => {
      toast.error("Erro ao converter o arquivo");
      base64File.value = "";
    };
  }

  async function whenBase64IsReady(): Promise<void> {
    if (requestIsRunning.value === false) {
      requestIsRunning.value = true;
    }

    try {
        const payload = {
          emailDestinatario: "me.felipeoliveira@gmail.com",
          boletoBase64: base64File.value
        };

        const request = await http.post("/AgendamentoCobranca/cobranca/enviar-cobrancas", payload);
        requestIsRunning.value = false;

        console.log(request);
      toast.success("Upload do boleto finalizado");
      reset();
    } catch (error) {
      requestIsRunning.value = false;
      toast.error("Erro ao fazer upload do boleto");
    }
  }

  return {
    isOver,
    onDrop,
    onDragOver,
    onDragLeave,
    fileName,
    file,
    reset,
    handleInputFileChangeEvent,
    upload,
    requestIsRunning
  };
}

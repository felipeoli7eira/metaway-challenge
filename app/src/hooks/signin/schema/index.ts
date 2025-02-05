import * as yup from "yup";

export const validationSchema = yup.object({
  username: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Este campo deve ter no mínimo 3 letras")
    .max(20, "Este campo deve ter no máximo 20 letras"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Senha fora dos padrões estabelecidos"),
});

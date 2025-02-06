import * as yup from "yup"

export const updateProfileFormSchema = yup.object({
    name: yup
        .string()
        .required("Campo obrigatório")
        .min(7, "Digite um nome com pelo menos 7 letras"),
})

import * as yup from "yup";

export type FormCreateFiels = {
    name: string;
    email: string;
    document: string;
};

export type FormUpdateFiels = {
    name: string;
    email: string;
};

export const initialValuesFormCreate: FormCreateFiels = {
    name: "",
    email: "",
    document: "",
};

export const initialUpdateFormValues: FormUpdateFiels = {
    name: "",
    email: "",
};

export const postSchema = yup.object({
    name: yup
        .string()
        .required("Campo obrigatório")
        .min(7, "Digite o nome completo"),
    email: yup
        .string()
        .required("Campo obrigatório")
        .email("E-mail fora dos padrões estabelecidos"),
    document: yup
        .string()
        .required("Campo obrigatório")

        // * Não valida por calculo, apenas pelo padrão da string
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
});

export const updateSchema = yup.object({
    name: yup
        .string()
        .required("Campo obrigatório")
        .min(7, "Digite o nome completo"),
    email: yup
        .string()
        .required("Campo obrigatório")
        .email("E-mail fora dos padrões estabelecidos")
});

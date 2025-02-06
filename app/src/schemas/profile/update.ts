import * as yup from "yup"
import validator from "validator"
import {
    validateCPF,
    validateBirthDate,
    validateMobilePhone
} from "./../../utils/validators"

export const updateProfileFormSchema = yup.object({
    username: yup
        .string()
        .required("Este campo não pode ficar vazio")
        .min(7, "Mínimo de 7 carecteres")
        .max(20, "Máximo de 20 carecteres"),
    name: yup
        .string()
        .required("Este campo não pode ficar vazio")
        .min(7, "Digite um nome com pelo menos 7 letras")
        .max(20, "Máximo de 20 carecteres"),
    email: yup
        .string()
        .required("Este campo não pode ficar vazio")
        .test("email", "E-mail inválido", value => validator.isEmail(value)),
    cpf: yup
        .string()
        .required("Este campo não pode ficar vazio")
        .test("cpf", "CPF inválido", value => validateCPF(value)),
    birthDate: yup
        .string()
        .required("Este campo não pode ficar vazio")
        .test("birthDate", "Você deve ter pelo menos 18 anos", value => validateBirthDate(value ?? "")),
    phone: yup
        .string()
        .required("Este campo não pode ficar vazio")
        .test("phone", "Telefone inválido", value => validateMobilePhone(value ?? "")),
    password: yup
        .string()
        .nullable()
        .trim()
        .notRequired() // Permite que o campo seja vazio
        .test("passwordLen", "A senha deve ter entre 6 e 20 caracteres", value => {
            if (!value?.trim().length) {
                return true // Se o campo estiver vazio, a validação passa
            }

            return value.length >= 6 && value.length <= 20
        }),
})

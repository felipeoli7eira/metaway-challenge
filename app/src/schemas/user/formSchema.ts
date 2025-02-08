import * as yup from "yup"
import validator from "validator"
import {
    validateCPF,
    validateBirthDate,
    validateMobilePhone
} from "../../utils/validators"

const role = yup
    .string()
    .required("Campo obrigatório")
    .oneOf(["ROLE_ADMIN", "ROLE_USER"], "Selecione um tipo de usuário")

const name = yup
    .string()
    .required("Campo obrigatório")
    .min(7, "Mínimo de 7 letras")
    .max(20, "Máximo de 20 carecteres")

const username = yup
    .string()
    .required("Este campo não pode ficar vazio")
    .min(7, "Mínimo de 7 carecteres")
    .max(20, "Máximo de 20 carecteres")

const email = yup
    .string()
    .required("Este campo não pode ficar vazio")
    .test("email", "E-mail inválido", value => validator.isEmail(value))

const cpf = yup
    .string()
    .required("Este campo não pode ficar vazio")
    .test("cpf", "CPF inválido", value => validateCPF(value))

const birthDate = yup
    .string()
    .required("Este campo não pode ficar vazio")
    .test("birthDate", "Você deve ter pelo menos 18 anos", value => validateBirthDate(value ?? ""))

const phone = yup
    .string()
    .required("Este campo não pode ficar vazio")
    .test("phone", "Telefone inválido", value => validateMobilePhone(value ?? ""))

const password = yup
    .string()
    .trim()
    .required("Este campo não pode ficar vazio")
    .test("passwordLen", "A senha deve ter entre 6 e 20 caracteres", v =>  v.trim().length >= 6 && v.trim().length <= 20)

export const updateSchema = {
    name,
    username,
    email,
    cpf,
    birthDate,
    phone,
    password: yup
        .string()
        .nullable()
        .trim()
        .notRequired()
        .test("passwordLen", "A senha deve ter entre 6 e 20 caracteres", v => {
            if (! v?.trim().length) {
                return true // Se o campo estiver vazio, a validação passa pois a atualização de senha é opcional
            }

            return v.length >= 6 && v.length <= 20
        }),
}

export const createSchema = {
    role,
    name,
    username,
    email,
    cpf,
    birthDate,
    phone,
    password
}


// const formSchema = yup.object({
//     role: yup
//         .string()
//         .required("Campo obrigatório")
//         .oneOf(["ROLE_ADMIN", "ROLE_USER"], "Selecione um tipo de usuário"),
//     name: yup
//         .string()
//         .required("Campo obrigatório")
//         .min(7, "Mínimo de 7 letras")
//         .max(20, "Máximo de 20 carecteres"),
//     username: yup
//         .string()
//         .required("Este campo não pode ficar vazio")
//         .min(7, "Mínimo de 7 carecteres")
//         .max(20, "Máximo de 20 carecteres"),
//     email: yup
//         .string()
//         .required("Este campo não pode ficar vazio")
//         .test("email", "E-mail inválido", value => validator.isEmail(value)),
//     cpf: yup
//         .string()
//         .required("Este campo não pode ficar vazio")
//         .test("cpf", "CPF inválido", value => validateCPF(value)),
//     birthDate: yup
//         .string()
//         .required("Este campo não pode ficar vazio")
//         .test("birthDate", "Você deve ter pelo menos 18 anos", value => validateBirthDate(value ?? "")),
//     phone: yup
//         .string()
//         .required("Este campo não pode ficar vazio")
//         .test("phone", "Telefone inválido", value => validateMobilePhone(value ?? "")),
//     password: yup
//         .string()
//         .trim()
//         .required("Este campo não pode ficar vazio")
//         .test("passwordLen", "A senha deve ter entre 6 e 20 caracteres", v =>  v.trim().length >= 6 && v.trim().length <= 20),
// })

export default {
    createSchema,
    updateSchema
}

import * as yup from "yup"
import validator from "validator"
import {
    validateCPF,
    validateBirthDate,
    validateMobilePhone
} from "./../../utils/validators"

const PostUserSchema = yup.object({
    role: yup
        .string()
        .required("Campo obrigatório")
        .oneOf(["ROLE_ADMIN", "ROLE_USER"], "Selecione um tipo de usuário"),
    name: yup
        .string()
        .required("Campo obrigatório")
        .min(7, "Mínimo de 7 letras")
        .max(20, "Máximo de 20 carecteres"),
    username: yup
        .string()
        .required("Este campo não pode ficar vazio")
        .min(7, "Mínimo de 7 carecteres")
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
            .trim()
            .required("Este campo não pode ficar vazio")
            .test("passwordLen", "A senha deve ter entre 6 e 20 caracteres", v =>  v.trim().length >= 6 && v.trim().length <= 20),
})

export default PostUserSchema

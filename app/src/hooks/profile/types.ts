export type GetUserDataHttpResponse = {
    object?: {
        usuario: {
            id: number
            nome: string
            dataNascimento: string
            cpf: string
            email: string
            telefone: string
            username: string
            password: string
        }
    },
    message: string
}

export type UserObject = {
    usuario: {
        id: number
        nome: string
        dataNascimento: string
        cpf: string
        email: string
        telefone: string
        username: string
        password: string
    },
    tipos: string[]
}

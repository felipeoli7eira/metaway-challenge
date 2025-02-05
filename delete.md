admin 12345678

RESPONSE FAZENDO LOGIN COM O USUARIO ADMIN PADRAO:

{
  "id": 1,
  "username": "admin",
  "tipos": [
    "ROLE_ADMIN"
  ],
  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczODc2MTc5NSwiZXhwIjoxNzM4ODQ4MTk1fQ.5xFe4zdtu-yMN77vnkWt1CxkwdOdfz4dbzWS_XVcJlST3Kn1hQdxyxcwbk2-o5T8O-YcNr_ayXm5UWPa26UVNQ",
  "tokenType": "Bearer"
}


RESPONSE QUANDO CRIEI MEU USUÁRIO:

{
  "object": {
    "usuario": {
      "id": 7,
      "nome": "Felipe A Oliveira",
      "dataNascimento": "1990-01-01",
      "cpf": "961.502.090-75",
      "email": "felipe.oliveira@metaway.com",
      "telefone": "11978276615",
      "username": "oli7eirafelipe",
      "password": "$2a$10$AhSeAk22M5lyV6buZYsVXOLseSru.DfsXnnVYxNbtxIr.GfEx9wbW"
    },
    "tipos": [
      "ROLE_ADMIN"
    ]
  },
  "message": "Operação realizada com sucesso."
}

RESPONSE QUANDO AUTENTICO COM MEU PROPIO USUÁRIO:

{
  "id": 7,
  "username": "oli7eirafelipe",
  "tipos": [
    "ROLE_ADMIN"
  ],
  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvbGk3ZWlyYWZlbGlwZSIsImlhdCI6MTczODc2MjM4MiwiZXhwIjoxNzM4ODQ4NzgyfQ.VbSZt_UlcHWBwBCk3kn9urb_Af3zq-HSKg_xIAOygkZsuUt-bhrpX7l7FJ_n6XDQ6a7REmg8_xnVRguUr6y6iQ",
  "tokenType": "Bearer"
}w

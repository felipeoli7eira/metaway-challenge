<p align="center">
    <img src="./app/public/logo.svg" />
</p>

# Setup
Para rodar esse projeto, basta ter o NodeJS instalado. Ele foi desenvolvido em cima do node v20.9.0, mas isso não significa que ele funciona apenas com essa versão+ do node e sim que não foram encontrados problemas  nem no desenvolvimento nem ao coloca-lo em produção usando essa versão. Em todo caso, é recomendado o setup em cima de uma versão LTS.


O projeto está "dockeirizado". Dentro do container tem o Node LTS, então caso o setup seja feito usando o Docker, tudo funcionará corretamente ao rodar o comando ```sh start.sh``` na raiz do projeto.

Caso o setup seja feito sem Docker, as etapas a seguir provavelmente deixarão o projeto de pé:
- entrar na pasta ```app```
- copiar o ```.env.example``` e colar renomeando a copia para ```.env.local```
- rodar ```npm i``` para que as dependências sejam instaladas
- rodar ```npx tailwindcss -i ./src/tailwind.css -o ./src/tailwindcss.css --watch``` para garantir que os estilos tailwind sejam importados caso eles ainda não tenham sido.

O script ```start.sh``` faz isso tudo por conta própria, mas é necessário ter o Docker e docker compose instalados. Caso esse setup seja feito manualmente, será necessário ir vendo os erros de ambiente que acontecem e ir corrigindo, uma vez que apenas você sabe o que tem instalado na sua máquina e em quais portas e quais hosts estão parametrizados.

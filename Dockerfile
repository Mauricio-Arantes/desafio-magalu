# Imagem de origem
FROM node:16

# localização da aplicação dentro do container
WORKDIR /backend

# Adicionando o caminho '/backend/node_modules/.bin' para o $PATH
ENV PATH /backend/node_modules/.bin:$PATH

# Instalando as dependências do backend e armazenando em cache
COPY package.json /backend/package.json
RUN yarn global add @nestjs/cli --silent
RUN yarn install
RUN ls

# Iniciar a aplicação
CMD ["yarn", "start:dev"]
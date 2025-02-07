# Desafio Técnico Front-end - Dot Digital

Desenvolvimento de loja de filmes seguindo protótipo proposto.

## Instação
- Clonar o repositório https://github.com/eufabionovais/desafio-dot-digital;
- Acessar o diretório onde o projeto foi clonado;
- Executar __npm install__ para instalar as dependências necessárias;
- Executar __npm run dev__ para iniciar o servidor de execução do projeto.

## Observações 
- Para fins de facilidade na validação das funcionalidades, os dados estão sendo persistidos com (Vuex Persist)[https://www.npmjs.com/package/vuex-persist]
- Com a mesma finalidade, foi criada uma única Store ao invés de módulos por domínio;
- A aplicação foi desenvolvida com VueJS 3, porém, como em conversa na entrevista técnica fui informado que as aplicações da Dot utilizam Vue 2 com Options API, optei por utilizar Options API; 
- Também para fins de protótipo, as variáveis e chaves de API foram adicionadas no arquivo de Store. Em um cenário real, separaria em variáveis de ambiente, mesmo que fossem ficar públicar no caso da aplicação não ter nenhum servidor backend.

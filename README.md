# Email Classifier 📩

Este projeto foi desenvolvido como solução para o desafio técnico da AutoU.
O objetivo é implementar um sistema capaz de classificar emails automaticamente e sugerir respostas inteligentes, utilizando uma arquitetura frontend + backend.

ATENÇÃO: o contexto do desafio pede um classificador de e-mails recebidos por uma grande empresa do setor financeiro, então o prompt utilizado foi direcionado para uma abordagem específica para a situação, podendo ser alterado posteriormente para outros usos.

🚀 Tecnologias Utilizadas
🔹 Frontend

React + Typescript

Material UI (MUI) para a interface

Integração com o backend via Axios

🔹 Backend

Python (FastAPI)

Integração com a API Groq (modelos de LLM para processamento de linguagem natural)

Estrutura em endpoints REST

⚙️ Como Executar

- 1. Clonar o repositório

```bash
git clone https://github.com/KaiqueIvo04/email-classifier
cd email-classifier
```
- 2. Configurar o Backend

🔹Acessar a pasta do backend:
```bash
cd /backend
```
🔹Criar ambiente virtual e instalar dependências:
```bash
python3 -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
```

🔹Criar um arquivo .env com a sua chave da API Groq:
```bash
API_KEY=coloque_sua_chave_aqui
```

🔹Rodar o servidor FastAPI:
```bash
uvicorn app:app --reload
```
Backend ficará disponível em:
👉 http://localhost:8000

- 3. Configurar o Frontend  

🔹Acessar a pasta do frontend:
```bash
cd frontend
```
Obs.: Se estiver na pasta do backend primeiro volte para a pasta geral com: 
```bash
cd ..
```
🔹Criar um arquivo .env com a URL do backend:
```bash
VITE_API_URL=http://localhost:8000
```

🔹Instalar dependências:
```bash
npm install
```
🔹Rodar o projeto:
```bash
npm run dev
```

🔹Frontend ficará disponível em:
👉 http://localhost:5173 (ou porta definida pelo Vite)

💡 Funcionalidades

✅ Classificação de emails em categorias pré-definidas
✅ Sugestão de resposta automática baseada no contexto
✅ Interface amigável em React + MUI
✅ Comunicação em tempo real entre frontend e backend

📌 Exemplos de Uso

O usuário insere o texto de um e-mail ou arquivo de e-mail no frontend

O backend processa o texto usando a API do Groq

O sistema retorna:
-Categoria do email (Produtivo ou Improdutivo)
-Confiança da classificação
-Justificativa
-Resposta sugerida
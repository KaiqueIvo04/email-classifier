from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from classifier_by_api import classify_email
from pydantic import BaseModel
from PyPDF2 import PdfReader
import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente (Chave da API Groc)
load_dotenv()
API_KEY = os.getenv("API_KEY")

class EmailRequest(BaseModel):
    email_text: str

# Setup e rotas do servidor
app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # URLs do seu React
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)

@app.get("/")
def home():
    return {"message": "API de classificação de emails funcionando!"}

# Processa texto de e-mail como entrada
@app.post("/process_email_text/")
async def process_email(request: EmailRequest):
    response = classify_email(text_request=request.email_text, api_key=API_KEY)
    return response

# Processa arquivos de e-mail como entrada
@app.post("/process_email_file/")
async def process_file(email_file: UploadFile = File(...)):
    # Lê o conteúdo do arquivo
    content = await email_file.read()

    # Verificar se é pdf ou txt
    if email_file.filename.lower().endswith(".pdf"):
        reader = PdfReader(email_file.file) # Extrair texto do PDF
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    else:
        text = content.decode("utf-8") # Se for txt decodifica o texto

    # Chama a função de classificação
    response = classify_email(text_request=text, api_key=API_KEY)

    return response
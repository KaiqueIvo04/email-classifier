from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from classifier_by_api import classify_email
from pydantic import BaseModel
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

@app.post("/process_email/")
async def process_email(request: EmailRequest):
    response = classify_email(text_request=request.email_text, api_key=str(API_KEY))
    print(response)
    return response

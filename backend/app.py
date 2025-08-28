from fastapi import FastAPI
from classifier_by_api import classify_email
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("API_KEY")

class EmailRequest(BaseModel):
    email_text: str

app = FastAPI()

@app.get("/")
def home():
    return {"message": "API de classificação de emails funcionando!"}

@app.post("/process_email/")
async def process_email(request: EmailRequest):
    response = classify_email(text_request=request.email_text, api_key=str(API_KEY))
    return response

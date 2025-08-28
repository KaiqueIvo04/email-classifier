from groq import Groq
import json
import re
from dataclasses import dataclass

# Modelo de dados a ser retornado
@dataclass
class ClassificationResult:
    category: str
    confidence: float
    justification: str
    suggested_response: str

# Processa a resposta da API e transforma em json
def parse_response(content: str):
    # Remove formatação markdown se presente
    content = re.sub(r'```json\s*', '', content)
    content = re.sub(r'```\s*$', '', content)
    content = content.strip()
    
    # Tenta encontrar JSON válido na resposta
    json_match = re.search(r'\{.*\}', content, re.DOTALL)
    if json_match:
        content = json_match.group()
    
    result = json.loads(content)
    return result

def classify_email(text_request: str, api_key: str) -> ClassificationResult:
    client = Groq(api_key=api_key)

    # Prompt para requisitar resposta da API Groc
    prompt = f"""
Você é um assistente especializado em classificação de emails corporativos.

Analise o seguinte email e classifique-o seguindo estas regras:

**CATEGORIAS:**
- "Produtivo": Emails que requerem ação específica ou resposta (solicitações de suporte, atualizações de status, dúvidas técnicas, pedidos de informação, reclamações, etc.)
- "Improdutivo": Emails que não requerem ação imediata (felicitações, agradecimentos, mensagens sociais, spam, etc.)

**EMAIL PARA ANÁLISE:**
{text_request}

**INSTRUÇÕES:**
1. Leia o email com atenção
2. Determine a categoria mais apropriada
3. Avalie sua confiança na classificação (0-100%)
4. Forneça uma justificativa breve
5. Sugira uma resposta automática adequada

Responda APENAS no seguinte formato JSON:
{{
    "categoria": "Produtivo" ou "Improdutivo",
    "confianca": número entre 0 e 100,
    "justificativa": "explicação breve do motivo da classificação",
    "resposta_sugerida": "resposta automática apropriada para o email"
}}
"""
    # Obter conteúdo da resposta
    response = client.chat.completions.create(
        model = "meta-llama/llama-4-scout-17b-16e-instruct",
        messages = [
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    content = response.choices[0].message.content.strip()
    
    # Limpa possível formatação markdown
    content = parse_response(content=content)

    return content



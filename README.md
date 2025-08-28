# email-classifier

Instruções para inicialização do projeto:

- 1.  Para criação do ambiente virtual python rode:

```bash
cd /backend
```

  em seguida,

```bash
python -m venv venv
```

- 2.  Para ativar o ambiente rode:

```bash
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

- 3.  Para instalar as bibliotecas rode:
```bash
pip install -r requirements.txt
```

- 4.  E para iniciar o servidor rode:
```bash
uvicorn app:app --reload
```

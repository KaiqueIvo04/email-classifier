import { Box, Container, Grid } from "@mui/material"
import { EmailForm } from "./components/EmailForm"
import { Result } from "./components/Result"
import { useState } from "react"
import api from "./services/api";

// Interface para modelo de dados de resposta
export interface ClassificationResult {
  categoria: string;
  confianca: number;
  justificativa: string;
  resposta_sugerida: string;
}

function App() {
  const [apiResponse, setApiResponse] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitEmail = async (input: string) => {
    api
      .post("/process_email", { email_text: input })
      .then((response) => setApiResponse(response.data))
      .catch((err) => {
        console.error("Erro ao enviar requisição: " + err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid size={6}>
          <Box
            sx={{
              minHeight: "100vh",
              mt: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <EmailForm onSubmit={handleSubmitEmail} loading={loading} />
          </Box>
        </Grid>
        <Grid size={6}>
          <Box
            sx={{
              minHeight: "100vh",
              mt: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Result classificationResult={apiResponse}/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App

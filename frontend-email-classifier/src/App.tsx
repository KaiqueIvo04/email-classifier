import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material"
import { EmailForm } from "./components/EmailForm"
import { Result } from "./components/Result"
import { useState } from "react"
import api from "./services/api";
import { Route, Routes, useLocation } from "react-router-dom";
import { FileForm } from "./components/FileForm";
import { Link } from "react-router-dom";

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

  const location = useLocation();

  const handleTextSubmit = async (input: string) => {
    setLoading(true)
    api
      .post("/process_email_text", { email_text: input })
      .then((response) => setApiResponse(response.data))
      .catch((err) => {
        console.error("Erro ao enviar requisição: " + err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleFileSubmit = async (file: File) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("email_file", file);
    api
      .post("/process_email_file", formData, { headers: {"Content-Type": "multipart/form-data"} })
      .then((response) => setApiResponse(response.data))
      .catch((err) => {
        console.error("Erro ao enviar requisição: " + err)
      })
      .finally(() => {
        setLoading(false)
      })
  };

  // se a rota atual for /text_email ou /file_email => esconder botões
  const hideButtons: boolean = location.pathname === "/text_email"
    || location.pathname === "/file_email";

  return (
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              minHeight: "100vh",
              mt: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Container
              maxWidth="sm"
              disableGutters
              sx={{
                p: 0,
                m: 0,
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  height: 500,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography gutterBottom component="h1" variant="h4" align="center" sx={{ wordBreak: "break-word" }}>
                  Classificador de E-mails
                </Typography>

                {/* Só mostra os botões se não estiver nas rotas específicas */}
                {!hideButtons && (
                  <Box
                    sx={{
                      flexDirection: "column",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-around"
                    }}
                  >
                    <Typography variant="h5" align="center">
                      Selecione uma das opções:
                    </Typography>
                    <Link to="/text_email">
                      <Button
                        variant="contained"
                        disabled={loading}
                        fullWidth
                        size="large"
                      >
                        Digitar e-mail
                      </Button>
                    </Link>
                    <Link to="/file_email">
                      <Button
                        variant="contained"
                        disabled={loading}
                        fullWidth
                        size="large"
                      >
                        Enviar arquivo de e-mail
                      </Button>
                    </Link>
                  </Box>
                )}

                <Routes>
                  <Route path="/text_email" element={<EmailForm onSubmit={handleTextSubmit} loading={loading} />} />
                  <Route path="/file_email" element={<FileForm onSubmit={handleFileSubmit} loading={loading} />} />
                </Routes>

              </Paper>
            </Container>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              minHeight: "100vh",
              mt: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Result classificationResult={apiResponse} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App

import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material"
import { EmailForm } from "./components/EmailForm"
import { Result } from "./components/Result"
import { useRef, useState } from "react"
import api from "./services/api";
import { Route, Routes, useLocation } from "react-router-dom";
import { FileForm } from "./components/FileForm";
import { Link } from "react-router-dom";
import { MessageSnackbar } from "./components/MessageSnackbar";

// Interface para modelo de dados de resposta
export interface ClassificationResult {
  categoria: string;
  confianca: number;
  justificativa: string;
  resposta_sugerida: string;
}

function App() {
  // States
  const [apiResponse, setApiResponse] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // States Snack Bar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  // Se não estiver na rota início => esconder botões de escolha
  const location = useLocation();
  const hideButtons: boolean = location.pathname !== "/";

  // Rolagem automática
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handlers  
  const handleCloseSnackbar = () => setOpen(false);

  // Para enviar text do input
  const handleTextSubmit = async (input: string) => {
    setLoading(true)
    api
      .post("/process_email_text", { email_text: input })
      .then((response) => {
        setApiResponse(response.data)
        setMessage("Texto de e-mail enviado com sucesso!")
        setSeverity("success")
        scrollToSection()
      })
      .catch((err) => {
        setMessage("Erro ao enviar requisição: " + err.message)
        setSeverity("error")
      })
      .finally(() => {
        setLoading(false)
        setOpen(true);
      })
  }

  // Para enviar arquivo do input
  const handleFileSubmit = async (file: File) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("email_file", file);
    api
      .post("/process_email_file", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((response) => {
        setApiResponse(response.data)
        setMessage(`Arquivo ${file.name} enviado com sucesso!`)
        setSeverity("success")
        scrollToSection()
      })
      .catch((err) => {
        setMessage("Erro ao enviar requisição: " + err.message)
        setSeverity("error")
      })
      .finally(() => {
        setLoading(false)
        setOpen(true)
      })
  };

  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              minHeight: "100%",
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
                <Typography 
                  gutterBottom 
                  fontWeight="bold" 
                  variant="h4" 
                  color="primary.main"
                  align="center" 
                  sx={{ wordBreak: "break-word" }}>
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
            ref={sectionRef}
            sx={{
              minHeight: "100%",
              mt: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Result classificationResult={apiResponse} />
          </Box>
        </Grid>
      </Grid>
      <MessageSnackbar
        open={open}
        message={message}
        severity={severity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  )
}

export default App

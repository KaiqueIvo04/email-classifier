import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import type React from "react";

// Interface para modelo de dados de resposta
interface ClassificationResult {
    categoria: string;
    confiança: number;
    justicativa: string;
    resposta_sugerida: string;
}

// Url de conexão com API
const API_URL = 'http://localhost:8000/process_email/';

export const EmailForm: React.FC = () => {
    return (
        <Container maxWidth="sm"
            sx={{
                mt: 10
            }}
        >
            <Paper elevation={4} sx={{ p: 4 }}>
                <Typography component="h1" variant="h4" gutterBottom align="center">
                    Classificador de Emails
                </Typography>
                <Box component="form">
                    <TextField
                        label="Conteúdo do Email"
                        multiline
                        rows={10}
                        fullWidth
                        margin="normal"
                        placeholder="Cole o conteúdo do email aqui..."
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Classificar
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
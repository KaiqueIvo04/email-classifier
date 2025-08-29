import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import type React from "react";
import { useState } from "react";

interface EmailDataProps {
    onSubmit: (email_text: string) => void;
    loading: boolean;
}

export const EmailForm: React.FC<EmailDataProps> = ({ onSubmit, loading }) => {
    const [input, setInput] = useState<string>("");

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(input)
    }

    return (
        <Container maxWidth="sm" disableGutters
            sx={{
                p: 0,
                m: 0,
            }}
        >
            <Paper elevation={6} sx={{ p: 4, minHeight: 500, maxHeight: 500 }}>
                <Typography component="h1" variant="h4" gutterBottom align="center">
                    Classificador de E-mails
                </Typography>
                <Box component="form" onSubmit={handleSubmitEmail}>
                    <TextField
                        label="Conteúdo do Email"
                        multiline
                        rows={10}
                        fullWidth
                        margin="normal"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Cole o conteúdo do email aqui..."
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? 'Classificando...' : 'Classificar'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
import { Box, Button, TextField } from "@mui/material";
import type React from "react";
import { useState } from "react";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";

interface EmailDataProps {
    onSubmit: (email_text: string) => void;
    loading: boolean;
}

export const EmailForm: React.FC<EmailDataProps> = ({ onSubmit, loading }) => {
    const [input, setInput] = useState("");

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(input)
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmitEmail}
            sx={{
                flexDirection: "column",
                height: "100%",
                display: "flex",
                justifyContent: "space-around"
            }}
        >
            <TextField
                label="Conteúdo do Email"
                multiline
                rows={8}
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Cole o conteúdo do email aqui..."
            />
            <Button
                type="submit"
                variant="contained"
                disabled={loading || input === ""}
                fullWidth
                startIcon={<ForwardToInboxIcon />}
            >
                {loading ? 'Classificando...' : 'Classificar'}
            </Button>
            <Link to="/">
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ArrowBackIosNewIcon />}
                >
                    Voltar
                </Button>
            </Link>
        </Box>
    )
}
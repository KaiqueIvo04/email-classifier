import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";
import type { ClassificationResult } from "../App";

interface ClassificationDisplayProps {
    classificationResult: ClassificationResult | null;
}

export const Result: React.FC<ClassificationDisplayProps> = ({ classificationResult }) => {
    return (
        <Container maxWidth="sm" disableGutters
            sx={{ p: 0, m: 0 }}
        >
            <Box>
                <Paper elevation={6}
                    sx={{
                        p: 4, 
                        minHeight: 500,
                        maxHeight: 500,
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box>
                        <Typography
                            component="h1"
                            variant="h4"
                            gutterBottom
                            align="center"
                        >
                            Resultado
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography variant="h6">Categoria: {classificationResult?.categoria}</Typography>
                        <Typography variant="h6">Confiança de classificação: {classificationResult?.confianca}</Typography>
                        <Typography variant="h6">Justificativa: {classificationResult?.justificativa}</Typography>
                        <Typography variant="h6">Resposta sugerida: {classificationResult?.resposta_sugerida}</Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}
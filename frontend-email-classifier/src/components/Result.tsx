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
                            gutterBottom
                            fontWeight="bold"
                            variant="h4"
                            align="center"
                            sx={{ wordBreak: "break-word" }}
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
                        <Box>
                            <Typography variant="h6">Categoria: </Typography>
                            {classificationResult?.categoria}
                        </Box>
                        <Box>
                            <Typography variant="h6">Confiança de classificação: </Typography>
                            {classificationResult?.confianca}
                        </Box>
                        <Box>
                            <Typography variant="h6">Justificativa: </Typography>
                            {classificationResult?.justificativa}
                        </Box>
                        <Box>
                            <Typography variant="h6">Resposta sugerida: </Typography>
                            {classificationResult?.resposta_sugerida}
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}
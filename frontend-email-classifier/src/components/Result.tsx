import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";

export const Result: React.FC = () => {
    return (
        <Container maxWidth="sm" disableGutters 
            sx={{ p: 0 , m: 0}}
        >
            <Box>
                <Paper elevation={4} sx={{ p: 4, minHeight: 500}}>
                    <Typography component="h1" variant="h4" gutterBottom align="center">
                        Resultado
                    </Typography>
                </Paper>
            </Box>
        </Container>
    )
}
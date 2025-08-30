import { Box, Button } from "@mui/material";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface FileDataProps {
    onSubmit: (email_text: string) => void;
    loading: boolean;
}

export const FileForm: React.FC<FileDataProps> = ({ onSubmit, loading }) => {
    const [input, setInput] = useState<string>("");

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
            <Button
                component="label"
                role={undefined}
                variant="outlined"
                fullWidth
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ height: "65%" }}
            >
                Selecionar arquivo
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                />
            </Button>
            <Button
                type="submit"
                variant="contained"
                disabled={loading}
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
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";
import { FileDownloadDone } from "@mui/icons-material";

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
    onSubmit: (file: File) => void;
    loading: boolean;
}

export const FileForm: React.FC<FileDataProps> = ({ onSubmit, loading }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]); // salva o arquivo no estado
        }
    };

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            onSubmit(file);
        } else {
            alert("Selecione um arquivo primeiro!");
        }
    };

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
                startIcon={file?.name === undefined ? <CloudUploadIcon /> : <FileDownloadDone/>}
                sx={{ height: "65%" }}
            >
                {file?.name === undefined ? "Selecionar arquivo" : "Arquivo carregado: " + file?.name}
                <VisuallyHiddenInput
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileChange}
                />
            </Button>
            <Button
                type="submit"
                variant="contained"
                disabled={loading || file?.name === undefined}
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
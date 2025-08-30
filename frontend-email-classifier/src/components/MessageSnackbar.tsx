// MessageSnackbar.tsx
import { Snackbar, Alert, type AlertColor, Slide } from "@mui/material";

interface MessageSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
  duration?: number;
};

export const MessageSnackbar: React.FC<MessageSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
  duration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      slots={{ transition: Slide }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ width: "100%", fontSize: "1.3rem", fontWeight: "bold" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

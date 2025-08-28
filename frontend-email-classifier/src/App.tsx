import { Box, Container, Grid } from "@mui/material"
import { EmailForm } from "./components/EmailForm"
import { Result } from "./components/Result"


function App() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid size={6}>
          <Box
            sx={{
              minHeight: "100vh",
              mt: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <EmailForm />
          </Box>
        </Grid>
        <Grid size={6}>
          <Box
            sx={{
              minHeight: "100vh",
              mt: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Result />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App

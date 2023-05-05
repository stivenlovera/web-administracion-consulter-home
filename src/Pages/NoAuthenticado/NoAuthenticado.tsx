
import { Box, Button, Card, Container, FormControl, Grid, Input, InputLabel, Stack, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
const NoAuthenticado = () => {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <div
              style={{ textAlign: 'center', background: '#333' }}
            >
              <img
                src='https://www.consulters-home.com/wp-content/uploads/2020/07/logo5.png'
                alt={'dadad'}
                loading="lazy"
              />
            </div>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ConsultersHome
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              Bienvenido, para acceder copia el enlace y preciona en el boton verificar.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Enlace</InputLabel>
                <Input
                  size='small'
                  id="standard-adornment-amount"
                  placeholder="Introdusca enlace"
                />
              </FormControl>
              <Button size='small' variant="contained">Verificar</Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

export default NoAuthenticado

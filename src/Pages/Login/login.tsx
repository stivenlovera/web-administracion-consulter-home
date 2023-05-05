
import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import { ILogin } from "../../Services/Interface/login";
import UseLogin from "./hooks/useLogin";
import { useSnackbar } from "notistack";

export interface LoginProps {
    usuario: string,
    password: string
}
const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { loading, handlerSubmitSave, login } = UseLogin();
    const navigate = useNavigate();
    const {
        values,
        handleSubmit,
        handleBlur,
        handleChange,
        handleReset,
        errors,
        getFieldProps,
        setErrors
    } = useFormik({
        initialValues: login,
        onSubmit: async (value: ILogin) => {
            let data = await handlerSubmitSave(value);
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate('/bienvenido')
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        },
        validationSchema: Yup.object({
            usuario: Yup.string()
                .min(5, 'El valor debe ser almenos 3 caracteres')
                .required('Es requerido'),
            password: Yup.string()
                .min(5, 'El valor debe ser almenos 3 caracteres')
                .required('Es requerido'),
        })
    });

    useEffect(() => {
    }, [values])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Consulter Home
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Usuario"
                        name="usuario"
                        autoComplete="off"
                        autoFocus
                        value={values.usuario}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.usuario}
                        disabled={loading}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                        helperText={errors.password}
                        disabled={loading}
                    />
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        fullWidth
                        variant="contained"
                    >
                        <span>INGRESAR</span>
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;

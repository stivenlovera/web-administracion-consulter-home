import { Backdrop, CircularProgress, ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter, Route, Router, Link, NavLink, Routes, Navigate } from 'react-router-dom';
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { ProtectorRoute } from './components/ProtectorRoute';
import { NoProtectorRoute } from './components/NoProtectorRoute';
import { useDispatch, useSelector } from 'react-redux';
import { SelectToken, setToken } from '../Reducers/Slices/LoginSlice';
import { AutenticacionDto } from '../Services/Interface/authenticacion';
import { Authenticacion } from '../Services/authenticate';

const mdTheme = createTheme(
    {
        components: {

            /* MuiTimeline: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'red',
                    },
                },
            }, */
        },
    }
);

const Home = lazy(() => import('../Pages/Home/Home'));
const Login = lazy(() => import('../Pages/Login/login'));
const NoAuthenticado = lazy(() => import('../Pages/NoAuthenticado/NoAuthenticado'));
const ListaPostulantes = lazy(() => import('../Pages/Postulantes/lista-postulantes/lista-postulantes'));
const ListEmpresas = lazy(() => import('../Pages/Empresas/lista-empresas/list-empresas'));
const ListCargos = lazy(() => import('../Pages/Cargos/lista-cargos/list-cargos'));
const Pregunta = lazy(() => import('../Pages/Plantillas/components/plantillas'));
const ListConfigEvaluador = lazy(() => import('../Pages/Config-evaluacion/list-config-evaluciones/list-config-evaluaciones'));
/* const ListaPlantillas = lazy(() => import('../Pages/Plantilla/list-plantillas')); */
const ListaTest = lazy(() => import('../Pages/Plantillas/list-pregunta'));
const Test= lazy(() => import('../Pages/Plantillas/components/plantillas'));
const Resultado= lazy(() => import('../Pages/Evaluaciones/Resultados/resultados'));

const initialState: AutenticacionDto = {
    modulos: [],
    nombreCompleto: '',
    perfil: ''
}
const RouteApp = () => {
    const token = useSelector(SelectToken);
    const [spinner, setSpinner] = useState(true);

    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const updateToken = (token: boolean) => {
        dispatch(
            setToken({
                token: token
            })
        )
    }
    const getAuth = async () => {
        try {
            const { data } = await Authenticacion();
            if (data.status == 1) {
                setUser(data.data);
            }
            else {
                //verificar
            }
        } catch (error) {
            updateToken(false);
        }
    };

    useEffect(() => {
        if (token) {
            getAuth();
        } else {
            setSpinner(false)
        }
    }, [token])

    return (
        <Suspense fallback={<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={spinner}>
            <CircularProgress color="inherit" />
        </Backdrop>}>
            <BrowserRouter>
                <ThemeProvider theme={mdTheme}>
                    <Routes>
                        <Route element={<ProtectorRoute valid={token} children redirrecTo={'/login'} nombreCompleto={user.nombreCompleto} perfil={'no-foto.jpg'} />}>
                            <Route path="/bienvenido" element={<Home />}></Route>
                            <Route path="/lista-postulantes" element={<ListaPostulantes />}></Route>
                            <Route path="/lista-empresas" element={<ListEmpresas />}></Route>
                            <Route path="/lista-cargos" element={<ListCargos />}></Route>
                            <Route path="/lista-evaluaciones" element={<ListConfigEvaluador />}></Route>
                           {/*  <Route path="/lista-preguntas" element={<ListaPreguntas />}></Route>
                            <Route path="/lista-preguntas/create" element={<Pregunta />}></Route> */}
                            <Route path="/test" element={<ListaTest />}></Route>
                            <Route path="/test/:id" element={<Test />}></Route>
                            <Route path="/test/editar/:id" element={<Test />}></Route> 
                            <Route path="/test/vista-previa" element={<Test />}></Route> 
                            <Route path="/evaluacion-detalle/:evaluacionId/:postulanteId" element={<Resultado />}></Route> 
                        </Route>
                        <Route path='/login' element={
                            <NoProtectorRoute valid={token} redirrecTo={'/bienvenido'}>
                                <NoAuthenticado />
                            </NoProtectorRoute>}>
                            <Route path="/login" element={<Login />}></Route>
                        </Route>
                        {/* <Route path="/en-mantenimiento" element={<EnMantenimiento />}></Route> */}
                        {/* <Route path="/" element={<Login />}></Route>
                        <Route path="/Error" element={<Error404 />}></Route> */}
                        {/* redirrect */}
                        <Route path='/*' element={<Navigate to="/login" replace />}>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </Suspense>
    )
}

export default RouteApp

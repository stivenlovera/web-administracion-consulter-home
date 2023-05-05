import { useState } from "react";
import { LoginService } from "../../../Services/login";
import { LoginProps } from "../login";
import { useDispatch } from "react-redux";
import { setToken } from "../../../Reducers/Slices/LoginSlice";
interface Status {
    message: string;
    status: any
}
const initialState: LoginProps = {
    password: '',
    usuario: ''
}
const UseLogin = () => {
    const dispatch = useDispatch();
    const updateToken = (token: string) => {
        dispatch(
            setToken({
                token: token
            })
        )
    }

    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState<LoginProps>(initialState);

    const handlerSubmitSave = async (value: LoginProps) => {
        setLoading(true);
        const { data } = await LoginService(value);
        setLoading(false);
        updateToken(data.data.token);
        return data;
    }
    return {
        loading,
        login,
        handlerSubmitSave
    }
}

export default UseLogin;
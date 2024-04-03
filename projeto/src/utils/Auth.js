import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

//funções para decofidicar e recodificar o token
import { encode, decode } from "base-64";

if(!global.atob){
    global.atob = decode
}

if(!global.btoa){
    global.btoa = encode
}

export const UserDecodeToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("token")).token;

    if (token === null){
        return null;
    }

    //Decodifica o token recebido
    const decodedToken = jwtDecode(token)

    const informacoes = {
        nome: decodedToken.name,
        email: decodedToken.email,
        perfil: decodedToken.role,
        idUsuario: decodedToken.jti,
        token: token
    }

    return informacoes
}

export const UserLogout = async (navigation) => {
    await AsyncStorage.removeItem("token")
    .then(() => {
        navigation.replace("Login")
    })
}
import { Ionicons } from '@expo/vector-icons';
import { ContainerHeader } from '../Container/style';
import { HeaderContent, TextHeaderBox, WelcomeView } from './style';
import { UserImageHeader } from '../UserImage/styled';
import { UserNameTextHeader, WelcomeText } from '../Text/style';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { LoadProfile } from '../../utils/Auth';
import { TouchableOpacity } from 'react-native';
import { api } from '../../services/service';

export const Header = ({nomeUsuario, idUsuario}) => {
    const [fotoUsuario, setFotoUsuario] = useState("")

    const BuscarImagemUsuario = async (idUsuario) => {
        await api.get(`/Usuario/BuscarPorId?id=${idUsuario}`)
        .then(retornoApi => {
            setFotoUsuario(retornoApi.data.foto)
        }).catch(error => {
            alert(error)
        })
    }
 
    useEffect(() => {
        BuscarImagemUsuario(idUsuario)
    }, [])

    useEffect(() => {
        if(idUsuario !== ""){
            BuscarImagemUsuario(idUsuario)
        }
    }, [idUsuario])

    return (nomeUsuario !== null && fotoUsuario !== "" ? (
        <ContainerHeader>
            <HeaderContent>
                <WelcomeView>
                    <UserImageHeader
                        source={{uri: fotoUsuario}}
                    />
                    <TextHeaderBox>
                        <WelcomeText>Bem Vindo</WelcomeText>
                        <TouchableOpacity>
                            <UserNameTextHeader >{nomeUsuario}</UserNameTextHeader>
                        </TouchableOpacity>

                    </TextHeaderBox>
                </WelcomeView>
                <Ionicons name="notifications" size={25} color="white" />
            </HeaderContent>
        </ContainerHeader>
    ) : null)
}
import { Ionicons } from '@expo/vector-icons';
import { ContainerHeader } from '../Container/style';
import { HeaderContent, TextHeaderBox, WelcomeView } from './style';
import { UserImageHeader } from '../UserImage/styled';
import { UserNameTextHeader, WelcomeText } from '../Text/style';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { LoadProfile } from '../../utils/Auth';
import { TouchableOpacity } from 'react-native';

export const Header = () => {
    const [nomeUsuario, setNomeUsuario] = useState(null);

    useEffect(() => {
        LoadProfile()
            .then(token => {
                setNomeUsuario(token.nome);
            });
    }, [nomeUsuario])

    return (nomeUsuario != null ? (
        <ContainerHeader>
            <HeaderContent>
                <WelcomeView>
                    <UserImageHeader
                        source={require("../../assets/images/foto-murilo.jpg")}
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
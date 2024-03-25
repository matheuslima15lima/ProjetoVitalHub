import { Ionicons } from '@expo/vector-icons';
import { ContainerHeader } from '../Container/style';
import { HeaderContent, TextHeaderBox, WelcomeView } from './style';
import { UserImageHeader } from '../UserImage/styled';
import { UserNameTextHeader, WelcomeText } from '../Text/style';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { UserDecodeToken } from '../../utils/Auth';

export const Header = () => {
    const [nome, setNome] = useState("")

    const ProfileLoad = async () => {
        const token = await UserDecodeToken()

        if(token){
            console.log(token);
            setNome(token.nome)
        }
    }

    useEffect(() => {
        ProfileLoad()
    }, [])

    return (
            <ContainerHeader>
                <HeaderContent>
                    <WelcomeView>
                        <UserImageHeader
                            source={require("../../assets/images/foto-murilo.jpg")}
                        />
                        <TextHeaderBox>
                            <WelcomeText>Bem Vindo</WelcomeText>
                            <UserNameTextHeader>{nome}</UserNameTextHeader>
                        </TextHeaderBox>
                    </WelcomeView>
                    <Ionicons name="notifications" size={25} color="white" />
                </HeaderContent>

            </ContainerHeader>
    )
}
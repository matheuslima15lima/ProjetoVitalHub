import { useEffect, useState } from "react"
import { ContainerApp } from "../../components/Container/style/"
import { AgeUserText, ButtonTitle, EmailUserText, Title, UserNamePerfilText } from "../../components/Text/style"
import { UserImagePerfil } from "../../components/UserImage/styled"
import { UserContentBox } from "../../components/Box/style"
import { ContainerProntuario } from "../../components/Container/style"
import { ApointmentFormBox, ProntuarioBox, UserDataApointment } from "./style"
import { BoxInputField } from "../../components/Box"
import { Button } from "../../components/Button/styled"
import { LinkCancel } from "../../components/Link"
import { UserDecodeToken } from "../../utils/Auth"

export const PaginaDeProntuario = ({navigation}) => {

    const [editavel, setEditavel] = useState(false)

    const [nome , setNome] = useState("")

    const [email, setEmail] = useState("")

    const ProfileLoad = async ()=>{
        const token = await UserDecodeToken()

        if (token){
            setNome(token.nome)
            setEmail(token.email)
            console.log(token);
        }
    }


    // const ProntuarioInfo = async ()=>{
    //     try {
    //         const retornoGet = await api.get(``)
    //     } catch (error) {
            
    //     }
    // }

    useEffect(()=>{
            ProfileLoad()
           
    },[])

    return (
        <ContainerProntuario>
            <UserImagePerfil
                source={require("../../assets/images/user1-image.png")}
            />
            <ProntuarioBox>
                <UserNamePerfilText editavel={true}>{nome}</UserNamePerfilText>
                <UserDataApointment>
                    <AgeUserText>18 anos</AgeUserText>
                    <EmailUserText editavel={true}>{email}</EmailUserText>
                </UserDataApointment>
                <ApointmentFormBox>
                    <BoxInputField
                        apointment
                        fieldHeight="84"
                        placeholderText={"Descrição"}
                        labelText={"Descrição da consulta"}
                        editable
                    />
                    <BoxInputField
                        apointment
                        placeholderText={"Diagnóstico"}
                        labelText={"Diagnóstico do paciente"}
                        editable
                    />
                    <BoxInputField
                        apointment
                        fieldHeight="84"
                        placeholderText={"Prescrição médica"}
                        labelText={"Prescrição médica"}
                        editable
                    />
                </ApointmentFormBox>
                {editavel ? 
                <>
                    <Button onPress={() => setEditavel(false)}>
                        <ButtonTitle>Salvar Edições</ButtonTitle>
                    </Button> 
                </>
                : <Button onPress={() => setEditavel(true)}>
                    <ButtonTitle>Editar</ButtonTitle>
                </Button>}
                    
            <LinkCancel onPress={ 
                editavel ? () => setEditavel(false) : () => navigation.replace("Main")
            }>Cancelar</LinkCancel>
            </ProntuarioBox>
        </ContainerProntuario>
    )
}
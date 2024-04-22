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
import api from "../../services/service"
import { ActivityIndicator } from "react-native"

export const PaginaDeProntuario = ({navigation, route}) => {

    const [editavel, setEditavel] = useState(false)

    const [nome , setNome] = useState("")

    const [email, setEmail] = useState("")

    const [consulta, setConsulta] = useState({})

    const ProfileLoad = async ()=>{
        const token = await UserDecodeToken()

        if (token){
            setNome(token.nome)
            setEmail(token.email)
            console.log(token);
        }
    }

    // const [prontuario, setProntuario] = useState({
    //     descricao:"",
    //     diagnostico:"",

    // })
    // const EditProntuario = async ()=>{
    //         const retronoApi = await api.put("/Consultas/Prontuario",{

    //         })
    // }


    const ProntuarioInfo = async ()=>{
        try {
            // const id = "8E942765-8128-4948-966B-45550C15962E"
            const retornoGet = await api.get(`/Pacientes/BuscarPorId?id=${route.params.pacienteId}`)

            console.log(retornoGet.data.idNavigation.nome);
            setNome(retornoGet.data.idNavigation.nome)
            setEmail(retornoGet.data.idNavigation.email);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        ProfileLoad()
        .then(() => {
            ProntuarioInfo()
        })
        setConsulta(route.params.consulta)
        console.log(consulta);  
    },[nome])

    return nome !== "" ? (
        <ContainerProntuario>
            <UserImagePerfil
                source={require("../../assets/images/user1-image.png")}
            />
            <ProntuarioBox>
                <UserNamePerfilText editavel={true}>{consulta.paciente.idNavigation.nome}</UserNamePerfilText>
                <UserDataApointment>
                    <AgeUserText>18 anos</AgeUserText>
                    <EmailUserText editavel={true}>{consulta.paciente.idNavigation.email}</EmailUserText>
                </UserDataApointment>
                <ApointmentFormBox>
                    <BoxInputField
                        apointment
                        fieldHeight="84"
                        placeholderText={"Descrição"}
                        labelText={"Descrição da consulta"}
                        fieldValue={consulta.descricao}
                        editable
                    />
                    <BoxInputField
                        apointment
                        placeholderText={"Diagnóstico"}
                        labelText={"Diagnóstico do paciente"}
                        fieldValue={consulta.diagnostico}
                        editable
                    />
                    <BoxInputField
                        apointment 
                        fieldHeight="84"
                        placeholderText={"Prescrição médica"}
                        labelText={"Prescrição médica"}
                        fieldValue={consulta.receita.medicamento}
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
    ) : (
        <ActivityIndicator/>
    )
}
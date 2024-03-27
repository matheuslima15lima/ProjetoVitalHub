import { useEffect, useState } from "react";
import { BoxInputSelect, ButtonContinuarBox } from "../../components/Box";
import { CalendarioCompleto } from "../../components/Calendario";
import { ListaClinicas, ListaMedicos } from "../../components/FlatList";
import { InputSelect } from "../../components/Input";
import { ConfirmarConsultaModal } from "../../components/Modal";
import { ContainerSelectPage, TitleSelecao } from "./style";
import api from "../../services/service";
import { ActivityIndicator } from "react-native";

export const SelecionarClinica = ({navigation}) => {
    const listaClinicas = [
        {
            id: 1,
            nome: "Clínica Natureh",
            localizacao: "São Paulo, SP",
            avaliacao: "4,5",
            disponibilidade: "Seg-Sex"
        },
        {
            id: 2,
            nome: "Diamond Pró-Mulher",
            localizacao: "São Paulo, SP",
            avaliacao: "4,8",
            disponibilidade: "Seg-Sex"
        },
        {
            id: 3,
            nome: "Clinica Villa Lobos",
            localizacao: "Taboão, SP",
            avaliacao: "4,2",
            disponibilidade: "Seg-Sab"
        },
        {
            id: 4,
            nome: "SP Oncologia Clínica",
            localizacao: "Taboão, SP",
            avaliacao: "4,2",
            disponibilidade: "Seg-Sab"
        }
    ]

    return (
        <ContainerSelectPage>
            <TitleSelecao>Selecionar Clínica</TitleSelecao>
            <ListaClinicas
                dados={listaClinicas}
            />
            <ButtonContinuarBox
                manipulationFunction={() => {navigation.navigate("SelecionarMedico")}}
                functionCancel={() => navigation.replace("Main", {ativado: true})}
            />
        </ContainerSelectPage>
    )
}

export const SelecionarMedico = ({navigation}) => {
    const [listaDeMedicos, setListaDeMedicos] = useState([])

    const loadMedicosList = async () => {
        try{
            const retornoApi = await api.get("/Medicos")

            setListaDeMedicos(retornoApi.data)
            console.log(listaDeMedicos);
        }catch(erro){
            console.log(erro);
        }
    }

    useEffect(() => {
        loadMedicosList()
    },[])

    // const listaMedicos = [
    //     {
    //         id: 1,
    //         nome: "Dra.Alessandra",
    //         especialidades: "Dermatologia, Eletricista",
    //         foto: "../../assets/images/doctor_image_select.png"
    //     },{
    //         id: 2,
    //         nome: "Dr. Kumushiro",
    //         especialidades: "Cirurgião, Cardiologista",
    //         foto: "../../assets/images/doctor_image_select.png"
    //     },{
    //         id: 3,
    //         nome: "Dr. Rodrigo Santos",
    //         especialidades: "Clínica, Pediatra",
    //         foto: "../../assets/images/doctor_image_select.png"
    //     }
    // ]

    return (
        listaDeMedicos == null ? <ActivityIndicator/> : 
        <ContainerSelectPage>
            <TitleSelecao>Selecionar Médico</TitleSelecao>
            {/* <ListaSelectPages
            
            /> */}
            <ListaMedicos
                dados={listaDeMedicos}
            />
            <ButtonContinuarBox
                manipulationFunction={() => navigation.navigate("SelecionarData")}
                functionCancel={() => navigation.replace("Main", {ativado: true})}
            />
        </ContainerSelectPage>
    )
}

export const SelecionarData = ({navigation}) => {
    const [showModalConfirmarConsulta, setShowModalConfirmarConsulta] = useState(false)

    return (
        <ContainerSelectPage>
            <TitleSelecao>Selecionar Data</TitleSelecao>
            <CalendarioCompleto/>
            <BoxInputSelect
                labelText={"Selecione um horário disponível:"}
            />
            <ButtonContinuarBox
                manipulationFunction={() => setShowModalConfirmarConsulta(true)}
                functionCancel={() => navigation.replace("Main", {ativado: true})}
            />

            <ConfirmarConsultaModal
                navigation={navigation}
                visible={showModalConfirmarConsulta}
                setShowModal={setShowModalConfirmarConsulta}
            />
        </ContainerSelectPage>
    )
}
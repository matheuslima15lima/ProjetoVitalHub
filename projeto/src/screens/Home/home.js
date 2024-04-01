import { Header } from "../../components/Header";
import { Calendario } from "../../components/Calendario";
import { ContainerApp, ContainerHome } from "../../components/Container/style";
import { BoxButtonRow } from "../../components/Box/style";
import { FontAwesome } from '@expo/vector-icons';
import { ButtonHome } from "../../components/Button";
import { useEffect, useState } from "react";
import { ListaConsultas } from "../../components/FlatList";
import { AgendarConsultaModal, ApointmentModal, CancelattionModal, MedicoModal } from "../../components/Modal";
import { AgendarConsultaButton, HomeContent } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/service";
import { UserDecodeToken } from "../../utils/Auth";

export const Home = ({navigation}) => {

    const [listaDeConsultas, setListaDeConsultas] = useState([]);

    const [idUsuarioLogado, setIdUsuarioLogado] = useState('');

    //state para o estado da lista
    const [statusFiltro, setStatusFiltro] = useState("Agendada")

    //state para a exibição dos modais
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalApointment, setShowModalApointment] = useState(false)

    //state para guardar os dados da consulta e renderizar no modal
    const [infoConsulta, setInfoConsulta] = useState({})

    const ProfileLoad = async () => {
        const token = await UserDecodeToken()
    
        if(token){
            console.log(token);
            setIdUsuarioLogado(token.idUsuario);
        }
    }
    
    const LoadListaConsultas = async (idUsuario) => {
        const dataAtual = new Date(Date.now())
        try {
            const retornoApi = await api.get(`/Pacientes/BuscarPorData?data=${dataAtual.getFullYear()}-${dataAtual.getMonth()}-${dataAtual.getDate()}&id=${idUsuario}`);

            setListaDeConsultas(retornoApi.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    
    
    useEffect(() => {
        ProfileLoad()
        LoadListaConsultas(idUsuarioLogado)
    }, [])

    const consultasAgendadas = [
        {
            id: 1,
            nome: "Miguel Souza",
            idade: 14,
            nivel: "Rotina",
            horario: "14:00",
            email: "miguel.souza@gmail.com",
            foto: "../../assets/images/foto-murilo.jpg",
            situacao: "agendada"
        }, {
            id: 2,
            nome: "Mayara Almeida",
            idade: 16,
            nivel: "Exame",
            horario: "18:30",
            email: "mayara.almeida@gmail.com",
            foto: "caminhoAqui",
            situacao: "agendada"
        }, {
            id: 3,
            nome: "Matheus Dantas",
            idade: 24,
            nivel: "Urgência",
            horario: "21:20",
            foto: "caminhoAqui",
            email: "matheus.dantas@gmail.com",
            situacao: "realizada"
        }, {
            id: 4,
            nome: "Andréia Katia",
            idade: 41,
            nivel: "Exame",
            horario: "08:50",
            foto: "caminhoAqui",
            email: "andreia.katia@gmail.com",
            situacao: "cancelada"
        }, {
            id: 5,
            nome: "Jeferson Júnior",
            idade: 44,
            nivel: "Rotina",
            horario: "10:10",
            foto: "caminhoAqui",
            email: "jeferson.junior@gmail.com",
            situacao: "cancelada"
        }, {
            id: 6,
            nome: "Guilherme Garbelini",
            idade: 18,
            nivel: "Exame",
            horario: "19:30",
            foto: "caminhoAqui",
            email: "guilerme.garbelini@gmail.com",
            situacao: "realizada"
        },{
            id: 7,
            nome: "Miguel Souza",
            idade: 14,
            nivel: "Rotina",
            horario: "14:00",
            email: "miguel.souza@gmail.com",
            foto: "../../assets/images/foto-murilo.jpg",
            situacao: "agendada"
        }, {
            id: 8,
            nome: "Miguel Souza",
            idade: 14,
            nivel: "Rotina",
            horario: "14:00",
            email: "miguel.souza@gmail.com",
            foto: "../../assets/images/foto-murilo.jpg",
            situacao: "agendada"
        }, {
            id: 9,
            nome: "Miguel Souza",
            idade: 14,
            nivel: "Rotina",
            horario: "14:00",
            email: "miguel.souza@gmail.com",
            foto: "../../assets/images/foto-murilo.jpg",
            situacao: "agendada"
        }, {
            id: 10,
            nome: "Miguel Souza",
            idade: 14,
            nivel: "Rotina",
            horario: "14:00",
            email: "miguel.souza@gmail.com",
            foto: "../../assets/images/foto-murilo.jpg",
            situacao: "agendada"
        }, {
            id: 11,
            nome: "Miguel Souza",
            idade: 14,
            nivel: "Rotina",
            horario: "14:00",
            email: "miguel.souza@gmail.com",
            foto: "../../assets/images/foto-murilo.jpg",
            situacao: "agendada"
        }, {
            id: 12,
            nome: "Miguel Souza",
            idade: 14,
            nivel: "Rotina",
            horario: "14:00",
            email: "miguel.souza@gmail.com",
            foto: "../../assets/images/foto-murilo.jpg",
            situacao: "agendada"
        }, {
            id: 13,
            nome: "Miguel Souza",
            idade: 14,
            nivel: "Rotina",
            horario: "14:00",
            email: "miguel.souza@gmail.com",
            foto: "../../assets/images/foto-murilo.jpg",
            situacao: "agendada"
        }
    ]

    return (
        <ContainerHome>
            <Header />
            <Calendario />
            <HomeContent>
                <BoxButtonRow>
                    <ButtonHome
                        buttonText={"Agendadas"}
                        situacao={"Agendada"}
                        actived={statusFiltro === "Agendada"}
                        manipulationFunction={setStatusFiltro}
                    />
                    <ButtonHome
                        buttonText={"Realizadas"}
                        situacao={"Realizada"}
                        actived={statusFiltro === "Realizada"}
                        manipulationFunction={setStatusFiltro}
                    />
                    <ButtonHome
                        buttonText={"Canceladas"}
                        situacao={"Cancelada"}
                        actived={statusFiltro === "Cancelada"}
                        manipulationFunction={setStatusFiltro}
                    />
                </BoxButtonRow>
                <ListaConsultas
                    dados={listaDeConsultas}
                    statusConsulta={statusFiltro}
                    onPressCancel={() => setShowModalCancel(true)}
                    onPressApointment={() => setShowModalApointment(true)}
                    loadInfoConsulta={setInfoConsulta}
                />
            </HomeContent>


            {/* Modal Cancelar */}

            <CancelattionModal
                setShowModalCancel={setShowModalCancel}
                visible={showModalCancel}
            />


            {/* Modal Prontuário */}

            <ApointmentModal
                setShowModalApointment={setShowModalApointment}
                visible={showModalApointment}
                informacoes={infoConsulta}
                navigation={navigation}
            />

        </ContainerHome>
    )
}





export const HomePaciente = ({navigation, route}) => {
    const {ativado} = route.params

    const [listaDeConsultas, setListaDeConsultas] = useState([]);

    const [idUsuarioLogado, setIdUsuarioLogado] = useState('');

    //state para o estado da lista
    const [statusFiltro, setStatusFiltro] = useState("Agendada")

    //state para a exibição dos modais
    const [showModalAgendarConsulta, setShowAgendarConsulta] = useState(false)
    
    //state para a exibição dos modais
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalMedico, setShowModalMedico] = useState(false)
    const [showModalApointment, setShowModalApointment] = useState(false)

    //state para guardar os dados da consulta e renderizar no modal
    const [infoConsulta, setInfoConsulta] = useState({})

    const consultasAgendadas = [
        {
            id: 1,
            nome: "Dr. Miguel",
            crm: "15286",
            especialidadesMedico: "Clínico geral",
            idade: 27,
            nivel: "Rotina",
            horario: "14:00",
            email: "miguel.souza@gmail.com",
            foto: "../../assets/images/foto-murilo.jpg",
            situacao: "agendada"
        }, {
            id: 2,
            nome: "Dra. Mayara",
            crm: "11086",
            especialidadesMedico: "Neurocirurgião",
            idade: 32,
            nivel: "Exame",
            horario: "18:30",
            email: "mayara.almeida@gmail.com",
            foto: "caminhoAqui",
            situacao: "agendada"
        }, {
            id: 3,
            nome: "Dr. Matheus",
            idade: 51,
            nivel: "Urgência",
            horario: "21:20",
            foto: "caminhoAqui",
            email: "matheus.dantas@gmail.com",
            situacao: "realizada"
        }, {
            id: 4,
            nome: "Dra. Andréia",
            idade: 41,
            nivel: "Exame",
            horario: "08:50",
            foto: "caminhoAqui",
            email: "andreia.katia@gmail.com",
            situacao: "cancelada"
        }, {
            id: 5,
            nome: "Dr. Jeferson",
            idade: 44,
            nivel: "Rotina",
            horario: "10:10",
            foto: "caminhoAqui",
            email: "jeferson.junior@gmail.com",
            situacao: "cancelada"
        }, {
            id: 6,
            nome: "Dr. Guilherme",
            idade: 25,
            nivel: "Exame",
            horario: "19:30",
            foto: "caminhoAqui",
            email: "guilerme.garbelini@gmail.com",
            situacao: "realizada"
        }
    ]

    const ProfileLoad = async () => {
        const token = await UserDecodeToken()
    
        if(token){
            console.log(token);
            setIdUsuarioLogado(token.idUsuario);
        }
    }
    
    const LoadListaConsultas = async (idUsuario) => {
        const dataAtual = new Date(Date.now())
        const anoAtual = dataAtual.getFullYear()
        const mesAtual = dataAtual.getMonth() + 1;
        const diaAtual = dataAtual.getDay();

        try {
            console.log(dataAtual);
            console.log(anoAtual);
            console.log(mesAtual);
            console.log(diaAtual);
            console.log(idUsuario);

            const retornoApi = await api.get(`/Pacientes/BuscarPorData?data=${anoAtual}-${mesAtual}-${diaAtual}&id=${idUsuario}`);
            
            console.log(retornoApi.data);

            setListaDeConsultas(retornoApi.data)

            console.log(listaDeConsultas);
        } catch (error) {
            console.log(error);
            log(idUsuario)
        }
    }

    useEffect(() => {
        ProfileLoad()

        if(ativado){
            setShowAgendarConsulta(true)
        }

        LoadListaConsultas(idUsuarioLogado)
    }, [idUsuarioLogado])

    return (
        <ContainerHome>
            <Header />
            <Calendario />
            <HomeContent>
                <BoxButtonRow>
                    <ButtonHome
                        buttonText={"Agendadas"}
                        situacao={"Agendada"}
                        actived={statusFiltro === "Agendada"}
                        manipulationFunction={setStatusFiltro}
                    />
                    <ButtonHome
                        buttonText={"Realizadas"}
                        situacao={"Realizada"}
                        actived={statusFiltro === "Realizada"}
                        manipulationFunction={setStatusFiltro}
                    />
                    <ButtonHome
                        buttonText={"Canceladas"}
                        situacao={"Cancelada"}
                        actived={statusFiltro === "Cancelada"}
                        manipulationFunction={setStatusFiltro}
                    />
                </BoxButtonRow>
                <ListaConsultas
                    dados={listaDeConsultas}
                    statusConsulta={statusFiltro}
                    onPressCancel={() => setShowModalCancel(true)}
                    onPressApointment={() => navigation.navigate("VisualizarPrescricao")}
                    loadInfoConsulta={setInfoConsulta}
                />
            </HomeContent>

            {/* Botão para agendar consulta */}
            <AgendarConsultaButton onPress={() => setShowAgendarConsulta(true)}>
                <FontAwesome name="stethoscope" size={32} color="white" />
            </AgendarConsultaButton>

            {/* Modal Cancelar */}

            <CancelattionModal
                setShowModalCancel={setShowModalCancel}
                visible={showModalCancel}
            />


            {/* Modal Prontuário */}

            <ApointmentModal
                setShowModalApointment={setShowModalApointment}
                visible={showModalApointment}
                informacoes={infoConsulta}
            />

            <MedicoModal
                visible={showModalMedico}
                setShowModal={setShowModalMedico}
            />

            {/* Modal de Agendar Consulta */}
            <AgendarConsultaModal
                visible={showModalAgendarConsulta}
                setShowModal={setShowAgendarConsulta}
                navigation={navigation}
            />
        </ContainerHome>
    )
}
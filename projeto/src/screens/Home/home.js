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
    const [dataConsulta, setDataConsulta] = useState("")

    const [listaDeConsultas, setListaDeConsultas] = useState([]);

    const [idUsuarioLogado, setIdUsuarioLogado] = useState('');
    const [permissaoUsuario, setPermissaoUsuario] = useState("")

    //state para o estado da lista
    const [statusFiltro, setStatusFiltro] = useState("Agendada")

    
    //state para a exibição dos modais
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalMedico, setShowModalMedico] = useState(false)
    const [showModalApointment, setShowModalApointment] = useState(false)

    const [consultaSelecionada, setConsultaSelecionada] = useState({})

    const ProfileLoad = async () => {
        const token = await UserDecodeToken()
    
        if(token){
            setIdUsuarioLogado(token.idUsuario);
            setPermissaoUsuario(token.perfil);
        }
    }
    
    const LoadListaConsultas = async (idUsuario) => {
        try {
            const retornoApi = await api.get(`/Medicos/BuscarPorData?data=2024-04-08&id=${idUsuario}`);
            setListaDeConsultas(retornoApi.data)
        } catch (error) {
            console.log(error);
            console.log(dataConsulta);
            console.log(idUsuario);
        }
    }
    
    
    
    useEffect(() => {
        ProfileLoad()
        LoadListaConsultas(idUsuarioLogado)
        
    }, [idUsuarioLogado, dataConsulta])


    return (
        <ContainerHome>
            <Header />
            <Calendario
                setDataConsulta={setDataConsulta}
            />
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
                    loadInfoConsulta={setConsultaSelecionada}
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
                informacoes={consultaSelecionada}
                navigation={navigation}
            />
            <MedicoModal
                visible={showModalMedico}
                setShowModal={setShowModalMedico}
                informacoes={consultaSelecionada}
                perfilUsuario ={permissaoUsuario}
                navigation={navigation}
            />
        </ContainerHome>
    )
}





export const HomePaciente = ({navigation, route}) => {
    const {ativado} = route.params

    const [dataConsulta, setDataConsulta] = useState("")

    const [listaDeConsultas, setListaDeConsultas] = useState([]);

    const [idUsuarioLogado, setIdUsuarioLogado] = useState('');
    const [permissaoUsuario, setPermissaoUsuario] = useState("")

    //state para o estado da lista
    const [statusFiltro, setStatusFiltro] = useState("Agendada")

    //state para a exibição dos modais
    const [showModalAgendarConsulta, setShowAgendarConsulta] = useState(false)
    
    //state para a exibição dos modais
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalMedico, setShowModalMedico] = useState(false)
    const [showModalApointment, setShowModalApointment] = useState(false)

    const [consultaSelecionada, setConsultaSelecionada] = useState({})

    const ProfileLoad = async () => {
        const token = await UserDecodeToken()
    
        if(token){
            setIdUsuarioLogado(token.idUsuario);
            setPermissaoUsuario(token.perfil);
        }
    }
    
    const LoadListaConsultas = async (idUsuario) => {
        try {

            const retornoApi = await api.get(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${idUsuario}`);

            setListaDeConsultas(retornoApi.data)
        } catch (error) {
            console.log(error);
        }
    }

    const MostrarModal = (modal, consulta) => {
        setConsultaSelecionada(consulta)
        
        if(modal === 'cancelar'){
            setShowModalCancel(true)
        }else if (modal === 'prontuario'){
            setShowModalApointment(true)
        }else if (modal === 'medico'){
            setShowModalMedico(true)
        }
    }

    useEffect(() => {
        ProfileLoad()

        if(ativado){
            setShowAgendarConsulta(true)
        }

        LoadListaConsultas(idUsuarioLogado);
    }, [idUsuarioLogado, dataConsulta])

    return (
        <ContainerHome>
            <Header />
            <Calendario 
                setDataConsulta={setDataConsulta}
            />
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
                    // onPressCancel={() => setShowModalCancel(true)}
                    // onPressApointment={() => navigation.navigate("VisualizarPrescricao")}
                    loadInfoConsulta={setConsultaSelecionada}
                    permissaoUsuario={permissaoUsuario}
                    MostrarModal={MostrarModal}
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
                informacoes={consultaSelecionada}
                perfilUsuario ={permissaoUsuario}
                navigation={navigation}
            />

            <MedicoModal
                visible={showModalMedico}
                setShowModal={setShowModalMedico}
                informacoes={consultaSelecionada}
                perfilUsuario ={permissaoUsuario}
                navigation={navigation}
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
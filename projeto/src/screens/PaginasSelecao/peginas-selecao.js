import { useEffect, useState } from "react";
import { BoxInputSelect, ButtonContinuarBox } from "../../components/Box";
import { CalendarioCompleto } from "../../components/Calendario";
import { ListaClinicas, ListaMedicos } from "../../components/FlatList";
import { InputSelect } from "../../components/Input";
import { ConfirmarConsultaModal } from "../../components/Modal";
import { ContainerSelectPage, TitleSelecao } from "./style";
import { api } from "../../services/service";
import { GerarNotaClinica } from "../../utils/funcoesUteis";

export const SelecionarClinica = ({ navigation, route }) => {
    const [clinicaSelecionada, setClinicaSelecionada] = useState({});
    const [lsitaDeClinicas, setListaDeClinicas] = useState([])

    const BuscarClinicas = async (localizacao) => {
        await api.get(`/Clinica/BuscarPorCidade?cidade=${localizacao}`)
            .then(retornoApi => {
                setListaDeClinicas(retornoApi.data)
            })
    }

    const NavegarParaPaginaMedico = () => {
        if (clinicaSelecionada === "") {
            alert("Selecione Uma Clínica Para Continuar!")
        } else {
            navigation.replace("SelecionarMedico", { agendamento: { ...clinicaSelecionada, ...route.params.agendamento } })
        }
    }

    useEffect(() => {
        console.log(route.params.agendamento);
        BuscarClinicas(route.params.agendamento.localizacao)
    }, [route.params])

    return (
        <ContainerSelectPage>
            <TitleSelecao>Selecionar Clínica</TitleSelecao>
            {(lsitaDeClinicas.length > 0) ?
                <ListaClinicas
                    dados={lsitaDeClinicas}
                    selecionarClinica={setClinicaSelecionada}
                    clinicaSelecionada={clinicaSelecionada}
                />
                : null
            }
            <ButtonContinuarBox
                manipulationFunction={NavegarParaPaginaMedico}
                functionCancel={() => navigation.replace("Main", { ativado: true })}
            />
        </ContainerSelectPage>
    )
}

export const SelecionarMedico = ({ navigation, route }) => {
    const [medicoSelecionado, setMedicoSelecionado] = useState({});
    const [listaDeMedicos, setListaDeMedicos] = useState([])

    const BuscarMedicos = async (id) => {
        await api.get(`/Medicos/BuscarPorIdClinica?id=${id}`)
            .then(retornoApi => {
                setListaDeMedicos(retornoApi.data)
            })
            .catch(erro => {
                alert(erro)
            })
    }

    const NavegarParaSelecaoDeData = () => {
        if (medicoSelecionado === "") {
            alert("Selecione um médico para continuar!!")
        } else {
            navigation.navigate("SelecionarData", { agendamento: { ...medicoSelecionado, ...route.params.agendamento } })
            // navigation.navigate("SelecionarData", { agendamento: {...route.params.agendamento, ...medicoSelecionado} })
        }
    }

    useEffect(() => {
        console.log(route.params);
        BuscarMedicos(route.params.agendamento.clinicaId)
    }, [route.params])

    return (
        <ContainerSelectPage>
            <TitleSelecao>Selecionar Médico</TitleSelecao>
            {/* <ListaSelectPages
            
            /> */}
            {(listaDeMedicos.length > 0) ?
                <ListaMedicos
                    dados={listaDeMedicos}
                    selecionarMedico={setMedicoSelecionado}
                    medicoSelecionado={medicoSelecionado}
                />
                : null
            }
            <ButtonContinuarBox
                manipulationFunction={NavegarParaSelecaoDeData}
                functionCancel={() => navigation.replace("SelecionarClinica")}
            />
        </ContainerSelectPage>
    )
}

export const SelecionarData = ({ navigation, route }) => {
    const [showModalConfirmarConsulta, setShowModalConfirmarConsulta] = useState(false)

    const [agendamento, setAgendamento] = useState({
        dataConsulta: ""
    });
    const [dataSelecionada, setDataSelecionada] = useState("");
    const [horaSelecionada, setHoraSelecionada] = useState("");

    const HandleContinue = () => {
        setAgendamento({
            ...route.params.agendamento,
            dataConsulta: `${dataSelecionada} ${horaSelecionada}`
        })

        setShowModalConfirmarConsulta(true)
    }
    useEffect(() => {
        console.log(route.params);
    }, [route.params])

    useEffect(() => {
        console.log(dataSelecionada);
    }, [dataSelecionada])

    useEffect(() => {
        console.log(horaSelecionada);
    }, [horaSelecionada])
    return (
        <ContainerSelectPage>
            <TitleSelecao>Selecionar Data</TitleSelecao>
            <CalendarioCompleto
                selecionarData={setDataSelecionada}
                dataSelecionada={dataSelecionada}
            />
            <BoxInputSelect
                labelText={"Selecione um horário disponível:"}
                selecionarHora={setHoraSelecionada}
            />
            <ButtonContinuarBox
                manipulationFunction={() => HandleContinue()}
                functionCancel={() => navigation.replace("SelecionarMedico", { clinica: route.params.clinica })}
            />

            {agendamento.dataConsulta !== "" ?
                <ConfirmarConsultaModal
                    navigation={navigation}
                    visible={showModalConfirmarConsulta}
                    setShowModal={setShowModalConfirmarConsulta}
                    agendamento={agendamento}
                />
                : null}

        </ContainerSelectPage>
    )
}
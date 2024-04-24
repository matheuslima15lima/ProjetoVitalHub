import { Header } from "../../components/Header";
import { Calendario } from "../../components/Calendario";
import { ContainerApp, ContainerHome } from "../../components/Container/style";
import { BoxButtonRow } from "../../components/Box/style";
import { FontAwesome } from "@expo/vector-icons";
import { ButtonHome } from "../../components/Button";
import { useEffect, useState } from "react";
import { ListaConsultas } from "../../components/FlatList";
import {
  AgendarConsultaModal,
  ApointmentModal,
  CancelattionModal,
  MedicoModal,
} from "../../components/Modal";
import { AgendarConsultaButton, HomeContent } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/service";
import { UserDecodeToken } from "../../utils/Auth";
import { FlatListStyle } from "../../components/FlatList/style";
import { Text } from "react-native";
import moment from "moment";
import { CardConsulta } from "../../components/Card";

export const Home = ({ navigation }) => {
  const [dataConsulta, setDataConsulta] = useState("");

  const [listaDeConsultas, setListaDeConsultas] = useState([]);

  const [idUsuarioLogado, setIdUsuarioLogado] = useState("");
  const [permissaoUsuario, setPermissaoUsuario] = useState("");

  //state para o estado da lista
  const [statusFiltro, setStatusFiltro] = useState("Agendada");

  //state para a exibição dos modais
  const [showModalAgendarConsulta, setShowAgendarConsulta] = useState(false);

  //state para a exibição dos modais
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalMedico, setShowModalMedico] = useState(false);
  const [showModalApointment, setShowModalApointment] = useState(false);

  //state para guardar os dados da consulta e renderizar no modal
  const [infoConsulta, setInfoConsulta] = useState({});

  const [consultaSelecionada, setConsultaSelecionada] = useState({});

  const ProfileLoad = async () => {
    const token = await UserDecodeToken();

    if (token) {
      setDataConsulta(moment().format("YYYY-MM-DD"));
      setIdUsuarioLogado(token.idUsuario);
      await LoadListaConsultas(token.idUsuario);
    }
  };

  const LoadListaConsultas = async (idUsuario) => {
    try {
      const retornoApi = await api.get(
        `/Medicos/BuscarPorData?data=${dataConsulta}&id=${idUsuario}`
      );

      setListaDeConsultas(retornoApi.data);
    } catch (error) {
      console.log(error);
    }
  };

  MostrarModal = (modal, consulta) => {
    setConsultaSelecionada(consulta);

    if (modal === "cancelar") {
      setShowModalCancel(true);
    } else if (modal === "prontuario") {
      setShowModalApointment(true);
    } else if (modal === "medico") {
      setShowModalMedico(true);
    }
  };

  useEffect(() => {
    ProfileLoad();
    // LoadListaConsultas(idUsuarioLogado);
  }, []);

  return (
    <ContainerHome>
      <Header />
      <Calendario setDataConsulta={setDataConsulta} />
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
          loadInfoConsulta={setInfoConsulta}
          permissaoUsuario={permissaoUsuario}
          MostrarModal={MostrarModal}
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
        perfilUsuario={permissaoUsuario}
        navigation={navigation}
      />

      <MedicoModal
        visible={showModalMedico}
        setShowModal={setShowModalMedico}
        informacoes={consultaSelecionada}
        perfilUsuario={permissaoUsuario}
        navigation={navigation}
      />
    </ContainerHome>
  );
};

export const HomePaciente = ({ navigation, route }) => {
  const { ativado } = route.params;

  const [dataConsulta, setDataConsulta] = useState("");

  const [listaDeConsultas, setListaDeConsultas] = useState([]);

  const [idUsuarioLogado, setIdUsuarioLogado] = useState("");
  const [permissaoUsuario, setPermissaoUsuario] = useState("");

  //state para o estado da lista
  const [statusFiltro, setStatusFiltro] = useState("Agendada");

  //state para a exibição dos modais
  const [showModalAgendarConsulta, setShowAgendarConsulta] = useState(false);

  //state para a exibição dos modais
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalMedico, setShowModalMedico] = useState(false);
  const [showModalApointment, setShowModalApointment] = useState(false);

  //state para guardar os dados da consulta e renderizar no modal
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const ProfileLoad = async () => {
    const token = await UserDecodeToken();

    if (token) {
      setDataConsulta(moment().format("YYYY-MM-DD"));
      setIdUsuarioLogado(token.idUsuario);
      setPermissaoUsuario(token.perfil);
      await LoadListaConsultas(token.idUsuario);
    }
  };

  const LoadListaConsultas = async (idUsuario) => {
    console.log(
      `/Pacientes/BuscarPorData?data=${dataConsulta}&id=${idUsuario}`
    );
    await api
      .get(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${idUsuario}`)
      .then(async (response) => {
        console.log(response.data);
        await setListaDeConsultas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      });
  };

  useEffect(() => {
    ProfileLoad();
    if (ativado) {
      setShowAgendarConsulta(true);
    }
  }, [dataConsulta]);

  MostrarModal = (modal, consulta) => {
    setConsultaSelecionada(consulta);
    console.log(`Consulta selecionada: ${consultaSelecionada}`);

    if (Object.keys(consultaSelecionada).length != 0) {
      if (modal === "cancelar") {
        setShowModalCancel(true);
      } else if (modal === "prontuario") {
        setShowModalApointment(true);
        console.log("Abir modal apointment");
      } else if (modal === "medico") {
        setShowModalMedico(true);
      }
    }
  };

  return (
    <ContainerHome>
      <Header />
      <Calendario setDataConsulta={setDataConsulta} />
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
        <FlatListStyle
          data={listaDeConsultas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            statusFiltro == item.situacao.situacao ? (
              <CardConsulta
                consulta={item}
                permissaoUsuario={permissaoUsuario}
                dadosUsuario={
                  permissaoUsuario == "Paciente"
                    ? item.medicoClinica.medico
                    : item.paciente
                }
                dataConsulta={item.dataConsulta}
                prioridade={item.prioridade.prioridade}
                // imageSource={item.foto}
                statusConsulta={statusFiltro}
                onPressCancel={() => MostrarModal("cancelar", item)}
                onPressApointment={() => MostrarModal("prontuario", item)}
                onPressCard={() => MostrarModal("medico", item)}

                // onPressCancel={onPressCancel}
                // onPressApointment={onPressApointment}
              />
            ) : null
          }
          showsVerticalScrollIndicator={false}
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
        perfilUsuario={permissaoUsuario}
        navigation={navigation}
      />

      <MedicoModal
        visible={showModalMedico}
        setShowModal={setShowModalMedico}
        informacoes={consultaSelecionada}
        perfilUsuario={permissaoUsuario}
        navigation={navigation}
      />

      {/* Modal de Agendar Consulta */}
      <AgendarConsultaModal
        visible={showModalAgendarConsulta}
        setShowModal={setShowAgendarConsulta}
        navigation={navigation}
      />
    </ContainerHome>
  );
};

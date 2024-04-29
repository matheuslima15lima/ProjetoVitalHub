import { useEffect, useState } from "react";
import { BoxInputSelect, ButtonContinuarBox } from "../../components/Box";
import { CalendarioCompleto } from "../../components/Calendario";
import { ListaClinicas, ListaMedicos } from "../../components/FlatList";
import { InputSelect } from "../../components/Input";
import { ConfirmarConsultaModal } from "../../components/Modal";
import { ContainerSelectPage, TitleSelecao } from "./style";
import { api } from "../../services/service";
import { ActivityIndicator } from "react-native";

export const SelecionarClinica = ({ navigation, route }) => {
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);
  function handleContinue() {
    navigation.replace("Selecionar Medico", {
      agendamento: {
        ...route.params.agendamento,
        ...clinica,
      },
    });
  }
  // const listaClinicas = [
  //     {
  //         id: 1,
  //         nome: "Clínica Natureh",
  //         localizacao: "São Paulo, SP",
  //         avaliacao: "4,5",
  //         disponibilidade: "Seg-Sex"
  //     },
  //     {
  //         id: 2,
  //         nome: "Diamond Pró-Mulher",
  //         localizacao: "São Paulo, SP",
  //         avaliacao: "4,8",
  //         disponibilidade: "Seg-Sex"
  //     },
  //     {
  //         id: 3,
  //         nome: "Clinica Villa Lobos",
  //         localizacao: "Taboão, SP",
  //         avaliacao: "4,2",
  //         disponibilidade: "Seg-Sab"
  //     },
  //     {
  //         id: 4,
  //         nome: "SP Oncologia Clínica",
  //         localizacao: "Taboão, SP",
  //         avaliacao: "4,2",
  //         disponibilidade: "Seg-Sab"
  //     }
  // ]

  const [listaClinicas, setListaClinicas] = useState([]);

  const loadClinicasList = async () => {
    try {
      const retornoApi = await api.get(
        `/Clinica/BuscarPorCidade?=${route.params.agendamento.localizacao}`
      );
      console.log(retornoApi.data);
      setListaClinicas(retornoApi.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(route);
  }, [route]);
  useEffect(() => {
    loadClinicasList();
  }, []);

  return (
    <ContainerSelectPage>
      <TitleSelecao>Selecionar Clínica</TitleSelecao>

      <ListaClinicas
        dados={listaClinicas}
        selecionarClinica={setClinicaSelecionada}
        clinicaSelecionada={clinicaSelecionada}
      />
      <ButtonContinuarBox
        onPress={() => {
          handleContinue;

          //   navigation.replace("SelecionarClinica");
        }}
        // manipulationFunction={() => {
        //   navigation.navigate("SelecionarMedico");
        // }}

        functionCancel={() => navigation.replace("Main", { ativado: true })}
      />
    </ContainerSelectPage>
  );
};

export const SelecionarMedico = ({ navigation, route }) => {
  useEffect(() => {
    console.log(route);
  }, [route]);
  const [listaDeMedicos, setListaDeMedicos] = useState([]);
  const [agendamento,setAgendamento] = useState(null)

  function handleContinue(){
    navigation.replace("SelecionarData", {
        agendamento:{
            ...route.params.agendamento,
            ...medico
        }
    })
  }
  const loadMedicosList = async () => {
    try {
      const retornoApi = await api.get(
        `/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`
      );

      setListaDeMedicos(retornoApi.data);
    } catch (erro) {
      console.log(erro);
    }

    // Jeito do professor (usando o requisicao.then(() => {}).catch(() => {}))
    // api.get("/Medicos")
    // .then(Response => {
    //     setListaDeMedicos(Response.data)

    //     console.log(listaDeMedicos);
    // }).catch(error => {
    //     console.log(error);
    // })
  };

  useEffect(() => {
    loadMedicosList();
  }, []);

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
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  return listaDeMedicos == null ? (
    <ActivityIndicator />
  ) : (
    <ContainerSelectPage>
      <TitleSelecao>Selecionar Médico</TitleSelecao>
      {/* <ListaSelectPages
            
            /> */}

      <ListaMedicos
        dados={listaDeMedicos}
        selecionarMedico={setMedicoSelecionado}
        medicoSelecionado={medicoSelecionado}
      />
      <ButtonContinuarBox
      onPress={()=>handleContinue}
        manipulationFunction={() => navigation.navigate("SelecionarData")}
        functionCancel={() => navigation.replace("Main", { ativado: true })}
      />
    </ContainerSelectPage>
  );
};

export const SelecionarData = ({ navigation,route }) => {
    const [agendamento, setAgendamento] = useState(null);
    const [dataSelecionada, setDataSelecionada] = useState('');
    const [horaSelecionada, setHoraSecionada] = useState('')
  const [showModalConfirmarConsulta, setShowModalConfirmarConsulta] =
    useState(false);

  return (
    <ContainerSelectPage>
      <TitleSelecao>Selecionar Data</TitleSelecao>
      <CalendarioCompleto
        setDataSelecionada={setDataSelecionada}
        dataSelecionada={dataSelecionada}
      />
      <BoxInputSelect labelText={"Selecione um horário disponível:"} 
    
        selecionarHora={setHoraSecionada}
      />
      <ButtonContinuarBox
        manipulationFunction={() => setShowModalConfirmarConsulta(true)}
        functionCancel={() => navigation.replace("Main", { ativado: true })}
      />

      <ConfirmarConsultaModal
        navigation={navigation}
        visible={showModalConfirmarConsulta}
        setShowModal={setShowModalConfirmarConsulta}
      />
    </ContainerSelectPage>
  );
};

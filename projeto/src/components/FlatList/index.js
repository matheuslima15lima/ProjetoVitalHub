import { View } from "react-native"
import { FlatListStyle } from "./style"
import { CardClinica, CardConsulta, CardMedico } from "../Card"

export const ListaConsultas = ({ dados, statusConsulta, permissaoUsuario, MostrarModal = null }) => {
    return (
        <FlatListStyle
            data={dados}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                statusConsulta == item.situacao.situacao ? (
                    <CardConsulta
                        consulta={item}
                        permissaoUsuario={permissaoUsuario}
                        dadosUsuario={permissaoUsuario == "Paciente" ? item.medicoClinica.medico : item.paciente }
                        dataConsulta={item.dataConsulta}
                        prioridade={item.prioridade.prioridade}
                        // imageSource={item.foto}
                        statusConsulta={statusConsulta}

                        onPressCancel={() => MostrarModal('cancelar', item)}
                        onPressApointment={() => MostrarModal('prontuario', item)}
                        onPressCard = {() => MostrarModal('medico', item)}

                        // onPressCancel={onPressCancel}
                        // onPressApointment={onPressApointment}
                    />)
                    : null

            }
            showsVerticalScrollIndicator={false}
        />
    )
}

export const ListaClinicas = ({ dados, selecionarClinica, clinicaSelecionada }) =>
    <FlatListStyle
        data={dados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
            <CardClinica 
                selecionarClinica={selecionarClinica} 
                selecionada={item.id === clinicaSelecionada.clinicaId ? true : false} 
                dados={item} 
            />
        }
    />
// Lista de Medicos
export const ListaMedicos = ({ dados, selecionarMedico, medicoSelecionado }) =>
    <FlatListStyle
        data={dados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
            <CardMedico 
                selecionarMedico={selecionarMedico} 
                selecionado={item.id === medicoSelecionado.medicoId ? true : false}
                dados={item} 
            />
        }
    />
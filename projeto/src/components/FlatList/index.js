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

export const ListaClinicas = ({ dados }) =>
    <FlatListStyle
        data={dados}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <CardClinica firstItem={index === 0 ? true : false} dados={item} />}
    />

export const ListaMedicos = ({ dados }) =>
    <FlatListStyle
        data={dados}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <CardMedico firstItem={index === 0 ? true : false} dados={item}  />}
    />
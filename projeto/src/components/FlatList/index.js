import { View } from "react-native"
import { FlatListStyle } from "./style"
import { CardClinica, CardConsulta, CardMedico } from "../Card"

export const ListaConsultas = ({ dados, statusConsulta, onPressCancel, onPressApointment, loadInfoConsulta }) => {
    return (
        <FlatListStyle
            data={dados}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                statusConsulta == item.situacao ? (
                    <CardConsulta
                        consulta={item}
                        imageSource={item.foto}
                        statusConsulta={statusConsulta}
                        onPressCancel={onPressCancel}
                        onPressApointment={onPressApointment}
                        loadInfoConsulta={loadInfoConsulta}
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
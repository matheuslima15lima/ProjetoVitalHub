import { CancelText, CardBox, CardContent, CardTextCancelApointment, DataCard, HorarioBox, HorarioText, TitleCard, ProfileData, TextAge, TextTipoConsulta, ViewRow, TitleSelectCard, CardSelectBox, CardSelectContent, CardSelectDescription, CardSelectContentEnd, AvaliacaoClinicaBox, NotaAvaliacao, HorarioClinicaBox, DisponibilidadeClinicaText } from "./style";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserImageCart } from "../UserImage/styled";
import { useEffect, useState } from "react";
import { UserDecodeToken } from "../../utils/Auth";

export const CardConsulta = ({ consulta, statusConsulta, onPressCancel, onPressApointment, loadInfoConsulta, permissaoUsuario, dadosUsuario, dataConsulta, prioridade, onPressCard = null }) => {

    const abrirModalProntuario = () => {
        onPressApointment();
        loadInfoConsulta(consulta);
    }

    return (
        <CardBox onPress={onPressCard}>
            <UserImageCart
                source={require(`../../assets/images/nicolle_image.png`)}
            />
            <CardContent>
                <DataCard>
                    <TitleCard>
                        {dadosUsuario.idNavigation.nome}
                    </TitleCard>
                    <ProfileData>
                        <TextAge>{permissaoUsuario == "Paciente" ? `CRM ${dadosUsuario.crm}` : "22 anos"}</TextAge>
                        <TextTipoConsulta>{consulta.nivel}</TextTipoConsulta>
                    </ProfileData>
                </DataCard>
                <ViewRow>
                    <HorarioBox statusConsulta={statusConsulta}>
                        <AntDesign name="clockcircle" size={14} color={statusConsulta == "Agendada" ? "#49B3BA" : "#4E4B59"} />
                        <HorarioText statusConsulta={statusConsulta}>14:00</HorarioText>
                    </HorarioBox>
                    <CardTextCancelApointment
                        statusConsulta={statusConsulta}
                        onPress={statusConsulta == "Agendada" ? (onPressCancel) : (abrirModalProntuario)}
                    >
                        {statusConsulta == "Agendada" ? "Cancelar" : (statusConsulta == "Realizada" ? "Ver Prontuário" : null)}
                    </CardTextCancelApointment>
                </ViewRow>
            </CardContent>
        </CardBox>
    )
}

export const CardClinica = ({dados, firstItem}) => {
    return (
        <CardSelectBox firstItem={firstItem}>
            <CardSelectContent>
                <TitleSelectCard>{dados.nomeFantasia}</TitleSelectCard>
                <CardSelectDescription>{dados.endereco.cidade}</CardSelectDescription>
            </CardSelectContent>
            <CardSelectContentEnd>
                <AvaliacaoClinicaBox>
                    <AntDesign name="star" size={20} color="#F9A620" />
                    <NotaAvaliacao>4,7</NotaAvaliacao>
                </AvaliacaoClinicaBox>
                <HorarioClinicaBox>
                    <MaterialCommunityIcons name="calendar" size={14} color="#49B3BA" />
                    <DisponibilidadeClinicaText>Seg-Sex</DisponibilidadeClinicaText>
                </HorarioClinicaBox>
            </CardSelectContentEnd>
        </CardSelectBox>
    )
}

export const CardMedico = ({dados, firstItem}) =>{
    return (
    <CardBox firstItem={firstItem}>
        <UserImageCart
            source={require("../../assets/images/doctor_image_select.png")}
        />
        <CardSelectContent>
            <TitleSelectCard>{dados.idNavigation.nome}</TitleSelectCard>
            <CardSelectDescription>{dados.especialidade.especialidade1}</CardSelectDescription>
        </CardSelectContent>
    </CardBox>)
}
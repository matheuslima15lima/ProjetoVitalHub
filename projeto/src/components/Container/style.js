import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

export const ContainerApp = styled.SafeAreaView`
    align-items: center;
    flex: 1;
    background-color: #FAFAFA;
    width: 100%;
    padding: 0 5% 15px;
    /* justify-content: center; */
`

export const ContainerCenter = styled(ContainerApp)`
    justify-content: center;
    margin: 0;
    padding: 0 5%;
`

export const ContainerHeader = styled(LinearGradient).attrs({
    colors: ["#60BFC5", "#496BBA"],
    start: {x: -0.05, y: 1.08},
    end: {x: 1, y: 0}
})`
    width: 100%;
    padding: 55px 0 22px;
    border-radius: 0 0 15px 15px;
`

export const ContainerPerfilPage = styled.ScrollView`
    position: relative;
    background-color: #FBFBFB;
    padding: 35px 0 40px;
    flex: 1;
`

export const ContainerForm = styled.View`
    flex: 1;
    margin: 75px 0 30px;
    width: 100%;
    gap: 25px;
    justify-content: center;
    align-items: center;
    padding: 0 5%;
`

export const ContainerHome = styled.View`
    position: relative;
    flex: 1;
    width: 100%;
`

export const ContainerProntuario = styled(ContainerPerfilPage)``

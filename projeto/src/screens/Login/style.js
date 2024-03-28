import styled, { css } from "styled-components";

export const LoadIcon = styled.ActivityIndicator`
    ${props => props.animating ? css`display: block` : css`display:none`}
`
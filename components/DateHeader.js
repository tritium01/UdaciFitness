import React from 'react'
import styled from "styled-components/native";
import {purple} from "../utils/colors";

const Date = styled.Text`
  color: ${purple};
  font-size: 25px;
`
const DateHeader = ({date}) => {
    return (
        <Date>
            {date}
        </Date>
    )
}
export default DateHeader

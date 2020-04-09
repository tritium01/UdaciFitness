import {TouchableOpacity} from 'react-native'
import React from "react";

const Text = styled.Text`
  color: ${purple};
  text-align: center;
`
import styled from "styled-components";
import {purple} from "../utils/colors";
 export const TextButton = ({children, onPress, style={} }) => {
    return (
        <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
        </TouchableOpacity>

    )
}


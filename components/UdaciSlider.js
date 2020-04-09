import React from 'react';
import {View, Text, Slider} from 'react-native'
import styled from "styled-components/native";
import {gray} from "../utils/colors";

const Row = styled.View`
flex-direction: row;
flex: 1;
align-items: center;
justify-content: ${props => props.justify || 'flex-start'};
`
const MetricCounter = styled.View`
  width: 85px;
  justify-content:center;
  align-items: center;

`

const UdaciSlider = ({max, unit, step, value, onChange}) => {
    return (
        <Row>
            <Slider
                style={{flex: 1}}
            step={step}
            value={value}
            maximumValue={max}
            minimumValue={0}
            onValueChange={onChange}
            />
            <MetricCounter>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
            </MetricCounter>
        </Row>
    );
};

export default UdaciSlider;

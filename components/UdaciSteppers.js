import React from 'react'
import {View, Text, TouchableOpacity, Platform} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import {white, purple, gray} from "../utils/colors";
import styled from "styled-components/native";

const Row = styled.View`
flex-direction: row;
flex: 1;
align-items: center;
justify-content: ${props => props.justify || 'flex-start'};
`
const Button = styled.TouchableOpacity`
  background-color: ${Platform.select({ios: white, android: purple})};
  border-color: ${Platform.select({ios: purple, android: 'transparent'})};
  border-width: ${Platform.select({ios: '1px', android: '0'})};
  border-top-right-radius: ${props => props.topRight || '3px'};
  border-bottom-right-radius: ${props => props.bottomRight || Platform.select({ios: '3px', android: '1px'})};
  border-top-left-radius: ${props => props.topLeft || Platform.select({ios: '3px', android: '1px'})};
  border-bottom-left-radius: ${props => props.bottomLeft || Platform.select({ios: '3px', android: '1px'})};
  padding: ${Platform.select({ios: '5px 25px', android: '10px'})};
  margin: ${Platform.select({ios: '0', android: '5px'})}
`;

const MetricCounter = styled.Text`
  width: 85px;
  justify-content:center;
  align-items: center;
  font-size: ${props => props.size || '18px'};
  text-align: ${props => props.align || 'center'};
  color: ${props => props.color || 'black'}
`
const UdaciSteppers = ({max, unit, step, value, onIncrement, onDecrement}) => {
    return (
        <Row justify={'space-between'}>
            <Row>
            <Button onPress={onDecrement} topRight={Platform.OS === 'ios' ? '0' : '1px'} bottomRight ={Platform.OS === 'ios' ? '0' : '1px'} >
                <FontAwesome name='minus' size={30} color={Platform.OS === 'ios' ? purple : white}/>
            </Button>
            <Button onPress={onIncrement} topLeft={Platform.OS === 'ios' ? '0' : '1px'} bottomLeft={Platform.OS === 'ios' ? '0' : '1px'}>
                <FontAwesome name='plus' size={30} color={Platform.OS === 'ios' ? purple : white}/>
            </Button>
            </Row>
            <View>
                <MetricCounter size={'24px'} align={'center'}>{value}</MetricCounter>
                <MetricCounter color={gray}>{unit}</MetricCounter>
            </View>
        </Row>
    )
    };

export default UdaciSteppers;

import React, {useState}from 'react'
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from "../utils/helpers";
import DateHeader from './DateHeader'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciSteppers'
import {TextButton} from "./TextButton";
import {submitEntry, removeEntry} from "../utils/api";
import {Ionicons} from '@expo/vector-icons'
import {addEntry} from "../store/actions";
import {white, purple} from "../utils/colors";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${white};
`
const Row = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`
const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
`

const SubmittBtn = styled.TouchableOpacity`
  background-color: ${purple};
  border-radius: ${Platform.select({ios: '7px', android: '2px'})};
  padding: ${Platform.select({ios: '10px', android: '10px 30px 0 30px'})};
  height: 45px;
  margin: ${Platform.select({ios:'0 40px', android: '0'})};
  align-self: ${Platform.select({ios: 'center', android: 'flex-end'})};
  justify-content: ${Platform.select({ios: 'center', android: 'center'})};
  align-items: ${Platform.select({ios: 'center', android: 'center'})};
`;

const SubmitText = styled.Text`
    color: ${white};
    font-size: 22px;
    text-align: center;
`

    const SubmitBtn = ({onPress}) => {
        return(
            <SubmittBtn onPress={onPress}><SubmitText>Submit</SubmitText></SubmittBtn>
    )
    }

export const AddEntry = () => {
    const alreadyLogged = useSelector(state=> state[timeToString()] && typeof state[timeToString()].today === 'undefined')
    const dispatch = useDispatch();

    const [state, setState] = useState({
        run : 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    })



    const reset = () => {
        const key = timeToString()

        dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
        //Update Redux
        //Route Home
        removeEntry({key})
        //Update Databse
    }

    const increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric)

        setState((state)=> {
            const count = state[metric] + step

            return{
                ...state,
                [metric]: count > max ? max : count
            }
        })
    };
    const decrement = (metric)=> {
        setState((state)=> {
            const count = state[metric] - getMetricMetaInfo(metric).step

            return{
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })

    };
    const slide = (metric, value) => {
        setState((state)=>{
           return {
               ...state,
               [metric]: value,
           }
        })
    }
    const submit = () => {
        const key = timeToString();
        const entry = state;

        dispatch(addEntry({
            [key]: entry
        }))

        setState({
            run : 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        })
        //Update Redux

        //Navigate to home
        submitEntry({key, entry})
        //Save to DB

        //cleare local notificacion
    }

    const metaInfo = getMetricMetaInfo()
    if(alreadyLogged){
        return (
            <Center>
                <Ionicons
                name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
                size={100}
                />
                <Text>You already logged your information for the day</Text>
                <TextButton onPress={reset}>Reset</TextButton>
            </Center>
        )
    }
    return(
        <Container>
            <DateHeader date={(new Date()).toLocaleDateString()}/>
            {Object.keys(metaInfo).map((key)=>{
                const {getIcon, type, ...rest} = metaInfo[key]
                const value = state[key]
                return (
                    <Row key={key}>
                        {getIcon()}
                        {type === 'slider'
                        ? <UdaciSlider
                            value={value}
                            onChange={(value)=> slide(key, value)}
                            {...rest}
                        />
                        : <UdaciStepper
                            value={value}
                            onIncrement={()=> increment(key)}
                            onDecrement={()=> decrement(key)}
                            {...rest}
                        />
                        }
                    </Row>
                )
            })}
            <SubmitBtn onPress={submit}/>
        </Container>
    )
};

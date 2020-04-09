import React, {useEffect} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {receiveEntries, addEntry} from "../store/actions";
import {timeToString, getDailyReminderValue} from "../utils/helpers";
import {fetchCalendarResults} from "../utils/api";
import UdaciFitnessCalendar from 'udacifitness-calendar'
import {white} from "../utils/colors";
import styled from "styled-components/native";
import DateHeader from "./DateHeader";

const Item = styled.View`
  background-color: ${white};
  border-radius: ${Platform.select({ios: '16px', android: '2px'})};
  padding: 20px;
  margin: 17px 10px 0 10px;
  justify-content: center;

`
const NoStyleText = styled.Text`
  font-size: 20px;
  padding: 0 20px;
`;

const History = () => {
    const dispatch = useDispatch();
    const entries = useSelector(state => state)
    useEffect(()=>{
        fetchCalendarResults()
            .then(entries => dispatch(receiveEntries(entries)))
            .then(({entries})=> {
                if (entries[timeToString()] ===  null){
                    dispatch(addEntry({
                        [timeToString()] : getDailyReminderValue(),
                    }))
                }
            })
    })

    const renderItem = ({today, ...metrics}, formattedDate, key) => {
        return(
            <Item>
            {today
            ? <View>
                    <DateHeader date={formattedDate}/>

              </View>
            : <TouchableOpacity onPress={()=> console.log('Pressed!')}>
                    <NoStyleText>{JSON.stringify(metrics)}</NoStyleText>
                </TouchableOpacity>
            }
            </Item>
        )
    }

    const renderEmptyDate = (formattedDate) => {
        return(
            <View>
                <DateHeader date={formattedDate}/>
                <NoStyleText>No data for this day</NoStyleText>
            </View>
        )
    }
    return(

        <UdaciFitnessCalendar
        items={entries}
        renderItem={renderItem}
        renderEmptyDay={renderEmptyDate}
        />

    )
}

export default History

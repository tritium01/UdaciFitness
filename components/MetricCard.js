import React from 'react';
import {View, Text} from 'react-native'
import styled from "styled-components/native";
import DateHeader from "./DateHeader";
import {getMetricMetaInfo} from "../utils/helpers";
import {gray} from "../utils/colors";


const Metric = styled.View`
flex-direction: row;
margin-top: 12px;
`

const MetricCard = ({date, metrics}) => {
    return (
        <div>
            {date && <DateHeader/>}
            {Object.keys(metrics).map((metric)=> {
                const {getIcon, displayName, unit, backgroundColor} = getMetricMetaInfo(metric)
                    return(
                        <View>
                        {getIcon()}
                        <Metric>
                            <Text style={{fontSize: 20}}>
                                {displayName}
                            </Text>
                            <Text style={{fontSize: 16, color: gray}}>
                                {metrics[metric]} {unit}
                            </Text>
                        </Metric>
                        </View>
                    )
            })}
        </div>
    );
};

export default MetricCard;

import { React, useEffect, useState } from 'react';
import avatar from '../icons/default_avatar.svg'

import {MEMBERS} from '../constants/constants.js';


import './DayCard.scss';

export const DayCard = ({dayInfo}) => {

    const date = new Date(dayInfo.date)
    const inOffice = Object.keys(MEMBERS).length - dayInfo.wfh.length

    return (
        <div className="DayCard">
            {/* <p>{dayInfo.day.toUpperCase()}</p> */}
            <div className="TopArea">
                <div className="Date">{date.getDate()}</div>
                <div className="InOffice">{inOffice}</div>
            </div>
            <div className="BottomArea">
            <div className="WFHList">
            {
            dayInfo.wfh.map(elm => {
                return (<div className="WFHItem">
                    <img src={avatar} alt="avatar" width="20" />
                    <div className="WFHItemName">{elm.name}</div>
                </div>)
            })
            }
            </div>
            </div>
        </div>
    )
}
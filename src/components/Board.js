import { React, useEffect, useState } from 'react';
import { fetchEvents } from '../utils/APIcalls.js';
import { DayCard } from './DayCard.js';

import './Board.scss';

export const Board = () => {
	const [events, setEvents] = useState(null);
	const [days, setDays] = useState([]);

	useEffect(() => {
		const data = fetchEvents();
		data.then(d => {
			// console.log(d)
			setEvents(d)
			setDays(d.days)
		})
	}, []);

	return (
		<div className="Board">
			{/* <h1>Board</h1>
			<div className="WeekHeader">
				<h2>Måndag</h2>
				<h2>Tisdag</h2>
				<h2>Onsdag</h2>
				<h2>Torsdag</h2>
				<h2>Fredag</h2>
			</div>
			<div className="WContainer">
			<div className= "Numbers">
				<h2>12</h2>
				<h2>13</h2>
			</div>
			<div className="WeekContainer">
			<div className="DayContainer">
			{
				days.slice(0,5).map((day,i) => <DayCard key={i} dayInfo={day} />)
			}
			</div>
			<div className="DayContainer">
			{
				days.slice(5,10).map((day,i) => <DayCard key={i+6} dayInfo={day} />)
			}
			</div>
			</div>
			</div> */}

			<h1>Board</h1>
			<table>
				<tr>
					<th></th>
					<th>Måndag</th>
					<th>Tisdag</th>
					<th>Onsdag</th>
					<th>Torsdag</th>
					<th>Fredag</th>
				</tr>
				<tr>
					<th>12</th>
					{
						days.slice(0,5).map((day,i) => <td key={i}><DayCard key={i} dayInfo={day} /> </td>)
					}
				</tr>
				<tr>
					<th>13</th>
					{
						days.slice(5,10).map((day,i) => <td key={i+5}><DayCard key={i+5} dayInfo={day} /> </td>)
					}
				</tr>
			</table>
		</div>
	);
}


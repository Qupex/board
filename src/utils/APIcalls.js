import {DAY, MEMBERS} from '../constants/constants.js';


export const fetchEvents = async () => {
    const data = Events();

    await new Promise(resolve => setTimeout(resolve, 300));

    return data;
};

const Events = () => {
    const currentDate = new Date();

    // Start date is the first current work day or monday after weekend
    const startDate = new Date(currentDate.getTime() + (-(currentDate.getDay()+1)%7+2) * DAY )

    // End date is next weeks friday
    const endDate = new Date(startDate.getTime() + (5 - startDate.getDay()) * DAY + 7*DAY)

    // returns amount of work days between 2 dates
    const getAmountOfWorkDays = (sDate, eDate) => {
        let count = 0;
        const cDate = new Date(sDate.getTime());
        while (cDate <= eDate) {
            const dow = cDate.getDay();
            if (dow !== 0 && dow !== 6) count++;
            cDate.setDate(cDate.getDate() + 1);
        }
        return count;
    }

    let week = 0;

    // Clone members without ref
    let members = {...MEMBERS};

    const pickMember = () => {
        let keys = Object.keys(members);
        let key = keys[ keys.length * Math.random() << 0];
        let name = members[key].name;
        delete members[key];
        return name;

    }

    // console.log("currentDate: ", currentDate);
    // console.log("startDate: ", startDate)
    // console.log("endDate: ", endDate)

    return {
        "date": currentDate.toJSON(),
        "id": 0,
        "days": [ ...Array(getAmountOfWorkDays(startDate, endDate)).keys() ].map( i => {
            let cDate = new Date(startDate.valueOf());
            cDate.setDate(startDate.getDate() + i + week)
            if (cDate.getDay() === 0 || cDate.getDay() === 6) {
                week = 2;
                cDate.setDate(startDate.getDate() + i + week)
            }
            members = {...MEMBERS}
            return {
                "date": cDate.toJSON(),
                "day": cDate.toLocaleString('sv-SE', {weekday: 'short'}),
                "wfh": [...Array(Math.floor(Math.random() * 10) + 1)].map( () => {
                    const name = pickMember()
                    return {
                        "name": name,
                        "email": `${name}@nordea.com`,
                        "id": name,
                        "timeframe": "full"
                    }
                })
            }
        })
    }
};
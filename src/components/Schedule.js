import React, {useState, useEffect} from "react";
import axios from "axios";
import ScheduleComp from './ScheduleComp'
let backend_url = 'http://localhost:8000'

function parseEvents(events){
  let names = []
  let dates = []
  let locs = []
  let links = []

  for(let idx in events){
    let event = events[idx]
    if(event.description){
      if(event.description.includes("#SITE")){
      
        names.push(event.summary)
        dates.push(new Date(event.start.dateTime))
        locs.push(event.location.split(',')[0])
        links.push(event.htmlLink)
      }
    }
    
    
  }
  return {names, dates, locs, links}
}

function Schedule(props){

  const [events, setEvents] = useState(null)

  useEffect(() =>{
    // async function fetch() {
    //   axios.get(backend_url + '/api/calevents').then(resp =>{
    //     setEvents(resp.data)
    //     console.log(resp.data)
    //   })
    // }
    // fetch()
    axios.get(backend_url + '/api/calevents').then(resp =>{
      setEvents(resp.data)
      
    } )
    
  },[])

  if (!events ) return null;

  const {names, dates, locs, links} = parseEvents(events)
  

  return(
    <div className="schedule-container">
      <ScheduleComp className="schedule-name" e_data={{items: names, links: links}} />
      <ScheduleComp className="schedule-date" e_data={{items: dates}} />
      <ScheduleComp className="schedule-location" e_data={{items: locs}} />
    </div>
  )
    
    // return (
    //     <div className="schedule-container">
    //         <div className="schedule-name">
    //           <div>Name Tag Collection</div>
    //           <div>Reverse Career Fair</div>
    //           <div>In-Person Career Fair</div>
    //           <div>Virtual Career Fair</div>
    //         </div>
    //         <div className="schedule-date">
    //           <div>February 7th</div>
    //           <div>February 7th</div>
    //           <div>February 8th</div>
    //           <div>February 11th</div>
    //         </div>
    //         <div className="schedule-location">
    //           <div>Grainger Library</div>
    //           <div>Illini Union</div>
    //           <div>Illini Union</div>
    //           <div>Handshake</div>
    //         </div>
    //       </div>
          
    // )
}

export default Schedule
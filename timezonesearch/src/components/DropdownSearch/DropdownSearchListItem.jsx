import { useEffect, useState } from 'react'
import { addTimeToNow, formatTime, GMTTime } from '../../libs/timez'

const updateTimezone = (hours, minutes) => {
  const updatedTime = addTimeToNow(hours, minutes)
  return formatTime(updatedTime)
}

function DropDownSearchListItem({item}){

  const [localTime, setLocalTime] = useState("")    

  useEffect(() => {

    const newLocalTime = updateTimezone(item.hours, item.minutes)
    setLocalTime(newLocalTime)

    const interval = setInterval(() => {
      const newLocalTime = updateTimezone(item.hours, item.minutes)
      setLocalTime(newLocalTime)
    }, 1000)    

    return () => clearInterval(interval)

  },[])

  return (
    <li className="dropdown-search-list-item">
    <div className="flex-end">
      <p className="dropdown-search-list-item__title">{item.country}</p>              
      <p className="dropdown-search-list-item__time-difference">{GMTTime(item)}</p>
    </div>
    <p className="dropdown-search-list-item__local_time">{localTime}</p>
  </li>
  )
}

export default DropDownSearchListItem
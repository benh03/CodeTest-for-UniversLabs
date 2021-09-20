export const addTimeToNow = (hours, mins) => { 
  let updatedTime = new Date()
  updatedTime.setHours(updatedTime.getHours() + parseInt(hours))
  updatedTime.setMinutes(updatedTime.getMinutes() + parseInt(mins))
  return updatedTime  
}

export const formatTime = (time) => {
  const hours = prependZeroIfRequired(time.getHours())
  const mins = prependZeroIfRequired(time.getMinutes())
  const seconds = prependZeroIfRequired(time.getSeconds())
  return `${hours}:${mins}:${seconds}`

}

export const GMTTime = ({hours, minutes}) => {  
  const isPositive = hours >= 0
  const hasMins = minutes > 0;
  const hoursString = isPositive ? `+${hours}` : hours
  const minuteString = hasMins ? `.${convertMinutesToDecmal(minutes)}` : ''

  return `GMT${hoursString}${minuteString}`
}


const convertMinutesToDecmal = minutes => {
  const remained = minutes / 60
  return remained.toFixed(2)*100  
}


const prependZeroIfRequired = value => {
  return value < 10 ? `0${value}` : value 
} 

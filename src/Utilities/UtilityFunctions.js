export const GET_DATE_WITH_TIMEZONE_OFFSET = (originalDateString) => {     
    const dateArray = originalDateString.split(' ')
    
    const year = dateArray[3]
    const day = dateArray[2]
    const monthAbbreviation = dateArray[1]

    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']   
    const month = (monthArray.indexOf(monthAbbreviation))

    const timeZoneOffset = new Date(originalDateString).getTimezoneOffset()
    const dateWithTimezoneOffset = new Date(Date.UTC(year, month, day, 0, timeZoneOffset))
    return dateWithTimezoneOffset
  }
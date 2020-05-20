export const GET_UTCDATE_WITH_TIMEZONE_OFFSET = (originalDateString) => {   
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

  export const GET_MM_DD_YYYY_DATE = originalDateString => {
    const dateArray = originalDateString.split(' ')
    
    const year = dateArray[3]
    const day = dateArray[2]
    const monthAbbreviation = dateArray[1]

    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']   
    const month = (monthArray.indexOf(monthAbbreviation)+1)
    return `${month}/${day}/${year}`
  }

  export const CONVERT_TIME = time => {
    const minutes = Math.floor(time/60)
    const seconds = time%60
    return seconds < 10 ? `${minutes}m 0${seconds}s`: `${minutes}m ${seconds}s`
}

export const TOGGLE_HIDE_FORM = () => {
  const formElement = document.getElementsByTagName('form')[0]
  const formElementClassNames = formElement.className.split(' ')
  return formElementClassNames.indexOf('display-none') >= 0 ? formElement.classList.remove('display-none') : formElement.classList.add('display-none')
}


//   export const MERGE_PARENT_CHILD_ARRAYS = (parentArray, childArray, parentId) => {
//     const parentObj = parentArray.reduce((obj, item) => {
//         obj[item[`${parentId}`]] = item
//         item.children = []
//         return obj
//     }, {})
//     childArray.forEach(item => {
//         parentObj[item[`${parentId}`]].children.push(item)
//     })
//     return parentObj
// }
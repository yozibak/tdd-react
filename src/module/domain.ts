
export const sumArr = (arr: number[]) => {
  return arr.reduce((a,b) => a + b, 0)
}

export const avg = (arr: number[]) => {
  return Math.floor(sumArr(arr) / arr.length)
}

export const validateForm = (payload: Review) => {
  if (payload.title.length > 50) {
    window.alert(`Please enter title in less than 50 characters`)
    return false
  } else if (payload.score > 100) {
    window.alert(`Please enter score less than or equal to 100`)
    return false
  } else if (payload.comment.length > 400 ) {
    window.alert(`Please enter comment in less than 400 characters`)
    return false
  }
  return true
}


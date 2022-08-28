
const PseudoAPI = {
  submit: async (payload: any) => {
    await new Promise(r => setTimeout(r, 1000))
    return {
      status: 200,
      message: 'successfully submitted'
    }
  }
}

export default PseudoAPI

const PseudoAPI = {
  submit: async (payload: any) => {
    await new Promise(r => setTimeout(r, 500))
    return {
      status: 200,
      message: 'successfully submitted'
    }
  },
  fetch: async () => {
    await new Promise(r => setTimeout(r, 500))
    return {
      status: 200,
      items: <Review[]>[
        {
          title: 'Not recommended',
          score: 20,
          comment: 'It just stinks.'
        },
        {
          title: 'Superb',
          score: 100,
          comment: 'Very satisfied. Easy to use.'
        }
      ]
    }
  }
}

export default PseudoAPI
import { act, renderHook, waitFor } from '@testing-library/react'
import { useReviews } from './reviews'
import API from '../module/api'

describe("useReviews", () => {

  const mockReviews = <Review[]>[
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

  beforeEach(() => { 
    jest.spyOn(API, 'submit').mockResolvedValue({
      status: 200,
      message: 'successfully submitted'
    })

    jest.spyOn(API, 'fetch').mockResolvedValue({
      status: 200,
      items: mockReviews
    })
  })

  it("shoudl calculate average based on current reviews' score", async () => {
    // arrange
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.reviews).toBe(mockReviews))

    // assert
    expect(result.current.averageScore).toBe(60)

    // act
    await act(async () => {
      await result.current.submitReview({
        title: 'new review',
        score: 80,
        comment: 'foo'
      })
    })

    // assert
    expect(result.current.averageScore).toBe(66)
  })
})
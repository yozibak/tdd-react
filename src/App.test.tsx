import React from 'react'
import { act, render, screen } from '@testing-library/react'
import App from './App'
import * as review from './hooks/reviews'
import userEvent from '@testing-library/user-event'

describe("UI test", () => {

  const mockReviews:Review[] = [
    {
      title: 'test',
      score: 0,
      comment: 'hi there'
    }
  ]

  const submitFn = jest.fn()

  const mockUseReview: ReturnType<typeof review.useReviews> = {
    loading: false,
    reviews: mockReviews,
    submitReview: submitFn
  }

  let useReviews: jest.SpyInstance

  beforeEach(() => {
    useReviews = jest.spyOn(review, 'useReviews').mockReturnValue(mockUseReview)
    submitFn.mockResolvedValue(true)
  })

  it("should show page title", () => {
    // arrange
    render(<App />)
    
    // assert
    const title = screen.getByText(/Product Review Form/)
    expect(title).toBeInTheDocument()
  })

  it("should show num of current reviews", () => {
    // arrange
    render(<App />)

    // assert
    screen.getByText(/Current reviews: 1/)

    // arrange
    mockUseReview.reviews = [...mockReviews, { title: 'review2', score: 30, comment: '...'}]
    render(<App />)

    // assert
    screen.getByText(/Current reviews: 2/)
  })

  it("should submit input values properly", async () => {
    // arrange
    const windowAlert = jest.fn()
    window.alert = windowAlert
    render(<App />)
    
    // act
    const titleInput = screen.getByLabelText('Title')
    const scoreInput = screen.getByLabelText('Score')
    const commentInput = screen.getByLabelText('Comment')
    await act(async () => {
      userEvent.type(titleInput, 'Very Good')
      userEvent.type(scoreInput, '90')
      userEvent.type(commentInput, 'I liked it!')
      userEvent.click(screen.getByRole('button', {name: /submit/i}))
    })

    // assert
    expect(submitFn).toHaveBeenCalledTimes(1)
    expect(submitFn).toHaveBeenCalledWith({
      title: 'Very Good',
      score: 90,
      comment: 'I liked it!',
    })

    expect(windowAlert.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "Successfully submitted. Thank you!",
      ]
      `)

    expect(titleInput).toHaveValue('')
    expect(scoreInput).toHaveValue(0)
    expect(commentInput).toHaveValue('')
  })

  
})


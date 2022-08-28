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

  describe("validate input character length on form submission", () => {

    let windowAlert: jest.Mock

    beforeEach(() => {
      windowAlert = jest.fn()
      window.alert = windowAlert
    })

    const findInput = () => ({
      title: screen.getByLabelText('Title'),
      score: screen.getByLabelText('Score'),
      comment: screen.getByLabelText('Comment'),
    })

    const payload:Review = {
      title: 'title',
      score: 0,
      comment: 'comment'
    }

    const submitForm = async (form: ReturnType<typeof findInput>, payload: Review) => {
      await act(async () => {
        userEvent.type(form.title, payload.title)
        userEvent.type(form.score, payload.score.toString())
        userEvent.type(form.comment, payload.comment)
        userEvent.click(screen.getByRole('button', {name: /submit/i}))
      })
    }

    it("should accept < 50 characters on title", async () => {
      // arrange
      render(<App />)
      const form = findInput()

      // act
      await submitForm(form, {
        ...payload, 
        title: 'X'.repeat(51) // > 50
      })

      // assert
      expect(windowAlert).toHaveBeenCalledWith(`Please enter title in less than 50 characters`)
      expect(submitFn).not.toHaveBeenCalled()
    })

    it("should accept points between 0 ~ 100 on score", async () => {
      // arrange
      render(<App />)
      const form = findInput()

      // act
      await submitForm(form, {
        ...payload, 
        score: 120 // > 100
      })

      // assert
      expect(windowAlert).toHaveBeenCalledWith(`Please enter score less than or equal to 100`)
      expect(submitFn).not.toHaveBeenCalled()
    })

    it("should accept < 400 characters on comment", async () => {
      // arrange
      render(<App />)
      const form = findInput()

      // act
      await submitForm(form, {
        ...payload, 
        comment: 'X'.repeat(401) // > 400
      })

      // assert
      expect(windowAlert).toHaveBeenCalledWith(`Please enter comment in less than 400 characters`)
      expect(submitFn).not.toHaveBeenCalled()
    })
  })
})


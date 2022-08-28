import { useEffect, useState } from "react"
import { avg } from '../module/domain'
import API from '../module/api'

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    const {items} = await API.fetch()
    setReviews(items)
    setLoading(false)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const submitReview = async (payload: Review) => {
    const newReview = payload
    const apiRes = await API.submit(newReview)
    if (apiRes.status === 200) {
      setReviews([...reviews, newReview])
      return true
    }
  }

  const [averageScore, setAverageScore] = useState<number>()
  useEffect(() => {
    setAverageScore(avg(reviews.map(r => r.score)))
  }, [reviews])

  return {
    loading,
    reviews,
    averageScore,
    submitReview,
  }
}
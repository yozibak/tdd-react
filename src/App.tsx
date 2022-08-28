import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import { useReviews } from './hooks/reviews';

const initialState: Review = {
  title: '',
  score: 0,
  comment: '',
} as const

function App() {

  const { loading, reviews, submitReview } = useReviews()

  const [formState, setFormState] = useState(initialState)

  const onChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    if (e.currentTarget.name === 'score') {
      setFormState({...formState, score: parseInt(e.currentTarget.value)})
    } else {
      setFormState({...formState, [e.currentTarget.name]: e.currentTarget.value})
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await submitReview(formState)
    if (res) {
      window.alert('Successfully submitted. Thank you!')
      setFormState(initialState)
    }
  }

  return (
    <div className="App">
      <div className="page-title">
        Product Review Form
      </div>

      <div>
        Please submit your review. <br />
        {!loading ? `Current reviews: ${reviews.length}` : ``}
      </div>

      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input 
          name="title"
          type="text"
          value={formState.title}
          onChange={onChange}
        />

        <label htmlFor="score">Score</label>
        <input 
          name="score" 
          type="number"
          value={formState.score}
          onChange={onChange}
        />

        <label htmlFor="comment">Comment</label>
        <textarea 
          name="comment" 
          rows={5}
          value={formState.comment}
          onChange={onChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

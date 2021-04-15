import { useState, useEffect } from "react";
import axios from 'axios';

export default function Modal(props) {
    const [reviews, setReviews] = useState([])
    const [title, setTitle] = useState(0)
    const [body, setBody] = useState(0)
    const id = props.store.restaurant_id
    useEffect(() => {
        axios.get(`http://localhost:3000/api/reviews/fetch/${id}`)
        .then(res => {
            if(res.data !== null) {
                setReviews(res.data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [body])
    const handleTitle = e => {
        e.preventDefault()
        setTitle(e.target.value)
    }
    const handleBody = e => {
        e.preventDefault()
        setBody(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault()
        const data = {
            id: Math.random(),
            title: title,
            body: body
        }
        axios.post(`http://localhost:3000/api/reviews/post/${id}`, data)
          .then(function () {
            setTitle(0)
            setBody(0)
        })
    }
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-white">
            <div className="z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto m-3 p-5 rounded transition shadow-md bg-white">
                <p className="text-center text-3xl mt-2">Reviews</p>
                <div className="h-64 overflow-y-auto p-2 mb-2 rounded transition shadow-md">
                    {reviews.length > 0 ? reviews.map(review => {
                        return(
                            <div key={review.id} className="p-2">
                                <p className="text-2xl mb-4">{review.title}</p>
                                <p className="mb-4">{review.body}</p>
                            </div>
                        )
                    }): <p className="text-center mt-10">No reviews :(</p>}
                </div>
                <p className="text-2xl mb-4">Write a review</p>
                <form className="mb-4">
                    <input className="mb-3 mr-3 focus:outline-none focus:ring focus:border-blue-300 rounded-md p-2 transition shadow hover:shadow-lg" type="text" placeholder="Title" value={title == 0 ? '' : title} onChange={handleTitle}/>
                    <input className="mb-3 mr-3 focus:outline-none focus:ring focus:border-blue-300 rounded-md p-2 transition shadow hover:shadow-lg" type="text" placeholder="Body" value={body == 0 ? '' : body} onChange={handleBody}/>
                    <input className="mb-3 focus:outline-none p-2 rounded-md transition shadow hover:shadow-lg" type="submit" value="Submit" onClick={handleSubmit}/>
                </form>
                <button className="focus:outline-none px-4 bg-indigo-500 p-2 rounded-lg text-white hover:bg-indigo-400 transition shadow hover:shadow-lg" onClick={() => props.toggle(false)}>Close</button>
            </div>
        </div>
    )
}
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Modal(props) {
    const [reviews, setReviews] = useState([])
    const [title, setTitle] = useState(0)
    const [body, setBody] = useState(0)
    const [menu, setMenu] = useState([])
    const [meal, setMeal] = useState(0)
    const [price, setPrice] = useState(0)
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
        axios.get(`http://localhost:3000/api/menu/fetch/${id}`)
        .then(res => {
            if(res.data !== null) {
                setMenu(res.data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [body, price])
    const handleTitle = e => {
        e.preventDefault()
        setTitle(e.target.value)
    }
    const handleBody = e => {
        e.preventDefault()
        setBody(e.target.value)
    }
    const handleMeal = e => {
        e.preventDefault()
        setMeal(e.target.value)
    }
    const handlePrice = e => {
        e.preventDefault()
        setPrice(e.target.value)
    }
    const handleReviewSubmit = e => {
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
        .catch((error) => {
            console.log(error);
        })
    }
    const handleMenuSubmit = e => {
        e.preventDefault()
        const data = {
            id: Math.random(),
            meal: meal,
            price: price
        }
        axios.post(`http://localhost:3000/api/menu/post/${id}`, data)
        .then(function () {
            setMeal(0)
            setPrice(0)
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-white">
            <div className="sm:h-4/5 overflow-y-auto z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto p-5 sm:p-10 rounded transition shadow-md bg-white">
                <p className="text-center text-3xl mt-2">Reviews and Menu</p>
                <div className="flex sm:flex-col">
                    <div className="h-64 w-64 overflow-y-auto p-2 m-2 shadow-md">
                        {reviews.length > 0 ? reviews.map(review => {
                            return(
                                <div key={review.id} className="p-2">
                                    <p className="text-2xl mb-4">{review.title}</p>
                                    <p className="mb-4">{review.body}</p>
                                </div>
                            )
                        }): <p className="text-center mt-10">No reviews :(</p>}
                    </div>
                    <div className="h-64 w-64 overflow-y-auto p-2 m-2 shadow-md">
                        {menu.length > 0 ? menu.map(menu => {
                                return(
                                    <div key={menu.id} className="p-2">
                                        <p className="text-lg mb-4">{menu.meal}</p>
                                        <p className="mb-4">${menu.price}</p>
                                    </div>
                                )
                            }): <p className="text-center mt-10">No menu items reported :(</p>}
                    </div>
                </div>
                <p className="text-2xl my-4">Write a review</p>
                <form className="mb-4">
                    <input className="mb-3 mr-3 focus:outline-none focus:ring focus:border-blue-300 rounded-md p-2 transition shadow hover:shadow-lg" type="text" placeholder="Title" value={title == 0 ? '' : title} onChange={handleTitle}/>
                    <input className="mb-3 mr-3 focus:outline-none focus:ring focus:border-blue-300 rounded-md p-2 transition shadow hover:shadow-lg" type="text" placeholder="Body" value={body == 0 ? '' : body} onChange={handleBody}/>
                    <input className="mb-3 focus:outline-none p-2 rounded-md transition shadow hover:shadow-lg" type="submit" value="Submit" onClick={handleReviewSubmit}/>
                </form>
                <p className="text-2xl mb-4">Add a menu item</p>
                <form className="mb-4">
                    <input className="mb-3 mr-3 focus:outline-none focus:ring focus:border-blue-300 rounded-md p-2 transition shadow hover:shadow-lg" type="text" placeholder="Meal" value={meal == 0 ? '' : meal} onChange={handleMeal}/>
                    <input className="mb-3 mr-3 focus:outline-none focus:ring focus:border-blue-300 rounded-md p-2 transition shadow hover:shadow-lg" type="text" placeholder="Price" value={price == 0 ? '' : price} onChange={handlePrice}/>
                    <input className="mb-3 focus:outline-none p-2 rounded-md transition shadow hover:shadow-lg" type="submit" value="Submit" onClick={handleMenuSubmit}/>
                </form>
                <button className="focus:outline-none px-4 bg-indigo-500 p-2 rounded-lg text-white hover:bg-indigo-400 transition shadow hover:shadow-lg" onClick={() => props.toggle(false)}>Close</button>
            </div>
        </div>
    )
}
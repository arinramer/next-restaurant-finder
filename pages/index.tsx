import { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../components/restaurant'

export default function Home() {
  const AuthStr = '7cc3582b4f6051e0ed3642b1e1f0998d'
  const [zipcode, setZipcode] = useState(0)
  const [restaurants, setRestaurants] = useState([])
  const [input, setInput] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
      axios.get(`https://api.documenu.com/v2/restaurants/zip_code/${zipcode}`, { 'headers': { 'X-API-KEY': AuthStr } })
      .then(res => {
          setRestaurants(res.data.data)
          if(restaurants){
            setLoading(false)
          }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [zipcode])
  const handleChange = e => {
    e.preventDefault()
    setInput(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    setZipcode(input)
    setLoading(true)
    setInput(0)
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-4">
        <p className="text-center text-3xl m-4">Next.js restaurant finder</p>
        <form>
          <label>
              <input className="focus:outline-none focus:ring focus:border-blue-300 rounded-md p-2 transition shadow hover:shadow-lg" type="text" placeholder="Zip Code" value={input == 0 ? '' : input} onChange={handleChange}/>
          </label>
          <input className="focus:outline-none px-4 bg-indigo-500 p-2 ml-4 rounded-lg text-white hover:bg-indigo-400 transition shadow hover:shadow-lg" type="submit" value="Submit" onClick={handleSubmit}/>
        </form>
      </div>
      <div className="flex flex-row flex-wrap justify-center mb-6">
        {restaurants && !loading ? restaurants.map(item => {
          return <Restaurant store={item} key={item.restaurant_id}/>
        }): null}
        {loading ? <img className="mt-5" src="/static/spinner.gif"/> : null}
      </div>
    </div>
  )
}

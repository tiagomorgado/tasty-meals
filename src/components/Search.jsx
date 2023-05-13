import { useState } from "react"
import { useGlobalContext } from "../context"

const Search = () => {
    const {setSearchTerm, fetchRandomMeal} = useGlobalContext();
    const [text, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       
        if(text) {
            setSearchTerm(text)
        }
    }

    

    return(
        <header className='search-container'>
            <form onSubmit={handleSubmit}>
                <input className='form-input' placeholder="Search for a meal" type='text' onChange={handleChange}></input>
                <button className='btn' type='submit'>Search</button>
                <button className='btn btn-hipster' type='button' onClick={fetchRandomMeal}>Surprise Me!</button>
            </form>
        </header>
    )
}

export default Search

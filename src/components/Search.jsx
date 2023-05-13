import { useState } from "react"
import { useGlobalContext } from "../context"

const Search = () => {
    return(
        <header className='search-container'>
            <form>
                <input className='form-input' placeholder="Search for a meal" type='text'></input>
                <button className='btn' type='submit'>Search</button>
                <button className='btn btn-hipster' type='button'>Surprise Me!</button>
            </form>
        </header>
    )
}

export default Search
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext()
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem("favorites")
    if(favorites) {
        favorites = JSON.parse(localStorage.getItem("favorites"))
    }else{
        favorites = []
    }

    return favorites
}

/* Context API to prevent Prop drilling */
const AppProvider = ({children}) => {
    /* Meal state variables */
    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    /* Modal state variables */
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)

    /* Favorites state variables */
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

    const fetchMeals = async (url) => {
        setLoading(true);
        try{
            const {data} = await axios(url)
            if(data.meals) {
                setMeals(data.meals)
            } else {
                setMeals([])
            }
            
        } catch(e){
            console.log(e.response)
        }
        setLoading(false);
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const selectMeal = (idMeal, isFavoriteMeal) => {
        let meal;

        /* Condition to check is modal should search meal in the Meal Array or Favorites Array */
        if(isFavoriteMeal){
            meal = favorites.find((meal) => meal.idMeal === idMeal);
        } else {
            meal = meals.find((meal) => meal.idMeal === idMeal);
        }

        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavorites = (idMeal) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal)
        if(alreadyFavorite) return
        
        const updatedFavorites = [...favorites ,meal]
        setFavorites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal)
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    /* Loads Meals when application initially loads for the first time */
    useEffect(() => {
        fetchMeals(allMealsUrl)
    },[])
    
    /* Checks if the search term is empty. If yes, then take no action, otherwise fetch meals with available search term */
    useEffect(() => {
        if(!searchTerm) return;
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    },[searchTerm])

    return <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites, getFavoritesFromLocalStorage}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}
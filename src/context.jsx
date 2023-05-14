import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext()
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

/* Context API to prevent Prop drilling */
const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)

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

        meal = meals.find((meal) => meal.idMeal === idMeal);

        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
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

    return <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}
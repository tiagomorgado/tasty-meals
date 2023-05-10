import { useGlobalContext } from "../context"

const Meals = () => {
    const context = useGlobalContext()
    console.log(context)
    return <div>Shake and Bake</div>
}

export default Meals
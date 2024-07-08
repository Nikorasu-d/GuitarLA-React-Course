import { useState, useEffect } from "react"
import Footer from "./components/footer"
import Guitar from "./components/guitar"
import Header from "./components/header"
import { db } from "./data/db"

/**
* Los componentes en React se definen de la siguiente manera:
* 
* function Nombre () {
*  
* Codigo JS o TS
* 
*  Return (
*      <> 
*      <h1 className="Tu clase" > Tu Codigo HTML mezclado con {variables JS o TS} </h1>
*      </>
*  )
* }
* 
*/
function App() {
    //Los hooks van al inicio del codigo y nunca deben eliminarse o crearse, solo deben existir los mismos siempre
    
    const initializeCart = () => {
        const cart = localStorage.getItem("cart")
        return cart ? JSON.parse(cart) : []
    }

    const [cart, setCart] = useState(initializeCart())

    const [guitarData, setGuitarData] = useState(db) //Se inicializa con la base de datos de las guitarras

    

    function addToCart (object){
        const itemExist = cart.findIndex((e) => e.id === object.id)

        // retorna -1 si el elemento no existe y el indice si es que existe
        if(itemExist < 0) {

            setCart(prevCart => [...prevCart,object]) 
            object.quantity = 1

        }else{
            //En react los states son inmutables por lo tanto hay que evitar modificar directamente el state siempre
            const newCart = [...cart]
            newCart[itemExist].quantity++

            setCart(newCart)

        }
    }

    useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cart))
        
        console.log("Cambios en el Carrito: ")
        cart.map((e) => console.log( `Producto: ${e.name} -> ${e.quantity}`))
    },[cart])

    /**
     * useEffect() es un hook que se ejecuta siempre que termina de generarse el componente
     * 
     * si al final del useEffect va vacio significa que el codigo se ejecutara solo una vez, en cambio si se pasan variables, se actualizaran cuando hayan cambios en los hooks
     * 
     * 
     */

    return (
        <>  
        <Header
            cart = {cart}
            setCart={setCart}
        />
        
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {guitarData.map( item =>{//Esta funcion recorre con map el arreglo y retorna un componente guitarra
                    return <Guitar 

                        key = {item.id} //key es necesario siempre que se iteren listas, debe ser un valor unico

                        addToCart = {addToCart}
                        item = {item} // Esto se llama prop y es similar a una variable que se pasa por parametro
                    />
                })}
            </div>
        </main>
        
        <Footer/>
        </>
    )
}

export default App

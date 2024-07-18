import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db" // local JSON db

export const useCart =()=>{
    
    //State Hooks
    const [cart, setCart] = useState(initializeCart())
    const [guitarData, setGuitarData] = useState(db)

    //State derivado y useMemo para evitar que se ejecute la funcion si es que no hay cambios
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, actual) => total + (actual.price * actual.quantity), 0), [cart])

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    // Initialize Cart
    function initializeCart () {
        const cart = localStorage.getItem("cart")
        return cart ? JSON.parse(cart) : []
    } 

    // Add to Cart
    function addToCart (object){
        const itemExist = cart.findIndex((e) => e.id === object.id)

        // retorna -1 si el elemento no existe y el indice si es que existe
        if(itemExist < 0) {

            setCart(prevCart => [...prevCart,object]) 
            object.quantity = MIN_ITEMS

        }else{
            //En react los states son inmutables por lo tanto hay que evitar modificar directamente el state siempre
            const newCart = [...cart]
            newCart[itemExist].quantity < MAX_ITEMS && newCart[itemExist].quantity++
            setCart(newCart)

        }
    }

    // Clear Cart
    function clearCart(){
        const newCart = []
        setCart(newCart)
    }

    // Remove item from cart
    function removeFromCart(item){
        setCart([...(cart.filter((e) => e.id !== item.id  ? item : null))])
    }

    // Increase Quantity of Item in Cart
    function increaseQuantity(item){
        const updatedCart = cart.map((e) => {
            if(e.id === item.id && e.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }else{
                return e
            }
        })

        
        setCart(updatedCart)
    }

    // Decrease Quantity of Item in Cart
    function decreaseQuantity(item){
        const updatedCart = cart.map((e) => {
            if(e.id === item.id && e.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }else{
                return e
            }
        })
        setCart(updatedCart)
    }

    // Update on Cart Changes
    useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cart))
        
        console.log("Cambios en el Carrito: ")
        cart.map((e) => console.log( `Producto: ${e.name} -> ${e.quantity}`))
    },[cart])

    return{
        cart,
        guitarData,
        isEmpty,
        cartTotal,
        addToCart,
        clearCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    }
}
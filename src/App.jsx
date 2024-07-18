// Imports
import Footer from "./components/footer" // Footer Component
import Guitar from "./components/guitar" // Guitar Component
import Header from "./components/header" // Header Component
import { useCart } from "./hooks/cart"


function App() {
    // Custom Hook 
    const {cart, guitarData, isEmpty, cartTotal, addToCart, clearCart , removeFromCart, increaseQuantity, decreaseQuantity} = useCart()

    return (
        <>  
        <Header
            cart = {cart}
            isEmpty = {isEmpty}
            cartTotal = {cartTotal}
            decreaseQuantity = {decreaseQuantity}
            increaseQuantity = {increaseQuantity}
            removeFromCart = {removeFromCart}
            clearCart = {clearCart}
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

export default function Header ({cart,isEmpty,cartTotal, decreaseQuantity, increaseQuantity, removeFromCart, clearCart}) {
    
    
    return (
        <>
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div 
                            className="carrito"
                        >
                            <img className="img-fluid" src="img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                
                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ):(
                                    <>
                                        <p className="text-center"><b>Lista de Compras</b></p>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((item) => {
                                                        const {image:src, name, price, quantity} = item
                                                        return(
                                                            <tr key = {item.id}>
                                                                <td>
                                                                    <img className="img-fluid" src={`/img/${src}.jpg`} alt="imagen guitarra" />
                                                                </td>
                                                                    <td>{name}</td>
                                                                    <td className="fw-bold">
                                                                        {price}
                                                                    </td>
                                                                    <td className="flex align-items-start gap-4">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-dark"
                                                                        onClick={() => decreaseQuantity(item)}
                                                                    >
                                                                        -
                                                                    </button>
                                                                        {quantity}
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-dark"
                                                                        onClick = {()=> increaseQuantity(item)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                    </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        type="button"
                                                                        onClick={()=> removeFromCart(item)}
                                                                    >
                                                                    X
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )
                                            }
                                            </tbody>
                                        </table>
                                        <p className="text-end">TOTAL A PAGAR: <span className="fw-bold"> ${cartTotal}</span></p>
                                        <button className="btn btn-dark w-100 mt-3 p-2" onClick={()=>clearCart()}>Vaciar Carrito</button>
                                    </>
                                )}

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
        </>
    )
}
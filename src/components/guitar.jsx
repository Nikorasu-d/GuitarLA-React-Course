export default function Guitar({item, addToCart}){

    const {id,image:src , name, price, description:desc} =  item

    return (
        <>
            <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                    <div className="col-4">
                        <img className="img-fluid" src={`/img/${src}.jpg`} alt="imagen guitarra" />
                    </div>
                    <div className="col-8">
                        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                        <p>{desc}</p>
                        <p className="fw-black text-primary fs-3">${price}</p>
                        <button 
                            type="button"
                            className="btn btn-dark w-100"
                            onClick={() => addToCart(item)} //Se pasa como callback para que la funcion no se ejecute cuando se crea el componente
                        >Agregar al Carrito</button>
                    </div>
                </div>
        </>
    )
}
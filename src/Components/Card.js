import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from "./CartReducer"

function Card(props) {


    let option = props.options;
    let priceOption = Object.keys(option || {});

    let data = useCart();
    let dispatch = useDispatchCart();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    let priceRef = useRef();

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food, size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: props.finalPrice, qty: qty, size: size, img: props.foodItem.img })
                return
            }

        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: props.finalPrice, qty: qty, size: size })
    }

    let finalPrice = qty * parseInt(option[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    })
    return (
        <div className="card mt-4" style={{ "width": "18rem", "maxHeight": "360px  " }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <p className="card-text">important text .</p>
                <div className='container w-100'>
                    <select className='m-2 h-100  bg-success' onChange={(e) => setQty(e.target.value)}>
                        {
                            Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })
                        }
                    </select>
                    <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {
                            priceOption.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })
                        }
                    </select>
                    <div className='d-inline h-100 fs-5'>
                        &#8377;{finalPrice}/-
                    </div>
                </div>
                <hr />
                <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart} >Add To Cart</button>
            </div>
        </div>
    );
}


export default Card;
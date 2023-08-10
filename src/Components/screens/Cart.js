import React from 'react'
// import BsFillTrashFill from "react-icons/bs"
import trash from "../svg/trash.svg"
import { useCart, useDispatchCart } from '../CartReducer'

function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return ( 
            <div>
                <div className='m-5 w-100 text-center text-bg-light fs-3'><h1>
                The Cart is empty
                    </h1></div>
            </div>
        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='text table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((food, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td><button type="button" className='btn p-0'><img src={trash} alt="delete" onClick={() => {dispatch({ type: "ROMOVE", index: index })
                                    }} /></button></td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
                </div>
                <div>
                    <button className='btn bg-success mt-5'>Check Out </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
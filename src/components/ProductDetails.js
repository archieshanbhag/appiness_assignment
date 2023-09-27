import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, removeSelectedProduct } from "../redux/actions/productsActions";

const ProductDetails = () => {
    const { productId } = useParams();
    let product = useSelector((state) => state.product);
    const { image, title, price, category, description } = product;
    const dispatch = useDispatch();
    console.log(product);
    const fetchProductDetail = async (id) => {
        const response = await axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .catch((err) => {
            console.log("Err: ", err);
            });
        dispatch(selectedProduct(response.data));
    };

    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail(productId);
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId]);

    return (
        <div className="ui grid container">
            {Object.keys(product).length === 0 ? (
                <div className="ui active centered inline loader"></div>
            ) : (
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                    
                        <div className="middle aligned row">
                      
                            <div className="column lp">
                                <img className="ui fluid image" src={image} />
                                <img className="ui fluid image" src={image} />
                                <img className="ui fluid image" src={image} />

                                <nav className="navMenu" style={{marginTop :'50px'}}>
                                    <a href="" >Johanatan</a>
                                    <a href="">Blazers</a>
                                    <a href="">viscose</a>
                                                                 
                                    </nav>
<br>
</br>
                                    <p> A note from the editor</p>
                                    <p>The Forte Lurex Linen Viscose Jacket in Mother of Pearl <br/>
                                    features lunar lavishnessby night and by day </p>
                            </div>
                            <div className="column rp">
                                <h1>{title}</h1>
                                <h2>
                                    <a className="ui teal tag label">${price}</a>
                                </h2>
                                <h3 className="ui brown block header">{category}</h3>
                                <p>{description}</p>
                                <div className="ui vertical animated button" tabIndex="0">
                                    <div className="hidden content">
                                        <i className="shop icon"></i>
                                    </div>
                                    <div className="visible content">Add to Cart</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails

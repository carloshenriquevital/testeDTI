import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import editIcon from '../../assets/images/icons/edit-solid.svg';
import trashIcon from '../../assets/images/icons/trash-solid.svg';

interface ListProductsProps {
    product: {
        id: string,
        name: string,
        number: number,
        price: number
    };
    onChange: (id: string) => {};
}

const ListProductItem: React.FC<ListProductsProps> = ({...props}) => {
    
    const editLink = "/products/" + props.product.id;

    function handleDelete(id: string) {
        props.onChange(id);

        return id;
    }

    return (
        <div className="list-item">
            <div className="list-item-name">
                <span>{props.product.name}</span>
            </div>
            <div className="list-item-quantity">
                <span>{props.product.number}</span>
            </div>
            <div className="list-item-price">
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.product.price)}</span>
            </div>
            <div className="list-item-actions">
                <Link to={editLink} className="btn">
                    <img src={editIcon} alt="Editar"/>
                </Link>
                <Link to="/" className="btn" onClick={() => {handleDelete(props.product.id)}}>
                    <img src={trashIcon} alt="Excluir"/>
                </Link>
            </div>
        </div>
    );
}

export default ListProductItem;
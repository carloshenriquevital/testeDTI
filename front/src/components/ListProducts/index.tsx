import React from 'react';

import './styles.css';
import ListProductItem from '../ListProductItem';

interface ListProductsProps {
    products: Array<{
        id: string,
        name: string,
        number: number,
        price: number
    }>;
    onChange: (id: string) => {};
}

const ListProducts: React.FC<ListProductsProps> = ({...props}) => {

    function handleDelete(id: string) {
        props.onChange(id);
        return id;
    }
    
    return (
        <table>
            <thead>
                <tr>
                    <th className="list-item-name">Nome do produto</th>
                    <th className="list-item-quantity">Quantidade</th>
                    <th className="list-item-price">Preço</th>
                    <th className="list-item-actions"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={4}>
                        {props.children}
                        {props.products.map((product) => {
                            return <ListProductItem key={product.id} product={product} onChange={handleDelete}/>
                        })}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default ListProducts;
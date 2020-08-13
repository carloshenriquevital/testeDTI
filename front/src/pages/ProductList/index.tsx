import React, { useState, useEffect, FormEvent } from 'react';

import './styles.css'

import PageHeader from '../../components/PageHeader';
import ContentHeader from '../../components/ContentHeader';
import ListProducts from '../../components/ListProducts';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { getAccessToken } from '../../services/auth';

function ProductList() {
    const [products, setProducts] = useState([]);
    
    const getProducts = async () => {
        // const lin = await login();
        const token = await getAccessToken();

        api.get('products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            const { data } = response;
            setProducts(data);
        });

    }
    
    useEffect(() => {
        getProducts();
    }, []);

    const handleDeleteProduct = async (id: string) => {
        
        const token = await getAccessToken();

        
        api.delete('products/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            alert('Produto Excluido com sucesso.');
            getProducts();
        }).catch(() => {
            alert('Erro ao excluir o produto.');
        });
    }

    return (
        <div id="page-product-list" className="container">
            <PageHeader />
            <main>
                <ContentHeader title="Lista de Produtos">
                    <Link to="/new-product" className="btn">
                        Adicionar
                    </Link>
                </ContentHeader>
                <div className="section-content">
                    <ListProducts products={products} onChange={handleDeleteProduct} />
                </div>
            </main>
        </div>
    );
}

export default ProductList;
import React, { useState, useEffect, FormEvent } from 'react';

import './styles.css'
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { useHistory, Link } from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import api from '../../services/api';
import { getAccessToken } from '../../services/auth';
import NumericInput from '../../components/NumericInput';
import CurrencyInput from '../../components/CurrencyInput';

function ProductEdit() {
    const history = useHistory();
    let { id } = useParams();

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');

    const getProductById = async () => {
        const token = await getAccessToken();

        await api.get('products/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            const { data } = response;
            setName(data.name);
            setNumber(data.number);
            setPrice(new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(data.price));
        });
    }

    const handleUpdateProduct = async (e: FormEvent) => {
        e.preventDefault();
        const token = await getAccessToken();

        let priceSpliced = price.split(',');
        let correctPrice = '';

        if(priceSpliced.length != 1) {
            correctPrice = priceSpliced[0].replace(/\D/g, "").concat(".").concat(priceSpliced[1]);
        } else {
            correctPrice = price;
        }
        if(name == "" || name == null || number == "" || number == null || price == "" || price == null) {
            alert('Preencha todos os campos!')
        } else {
            console.log(name, number, price);

            await api.put('products/' + id, {
                name,
                number: Number(number),
                price: correctPrice
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                alert('Produto atualizado com sucesso.');
                history.push('/');
            }).catch(() => {
                alert('Erro na atualização.');
            });
        }
    }

    useEffect(() => {
        getProductById();
    }, []);
 
    return (
        <div id="page-product-edit" className="container">
            <PageHeader />
            
            <main>
                <ContentHeader title="Editar Produto">
                    <Link to="/" className="btn">
                        Voltar
                    </Link>
                </ContentHeader>
                <form onSubmit={handleUpdateProduct}>
                    <fieldset>

                        <Input
                            name="name"
                            label="Nome"
                            value={name}
                            maxLength={255}
                            onChange={(e) => {setName(e.target.value)}}
                        />

                        <NumericInput
                            name="number"
                            label="Quantidade"
                            value={number}
                            maxLength={5}
                            onChange={(e) => {setNumber(e.target.value)}}
                        />
                        <CurrencyInput
                            name="price"
                            label="Preço"
                            value={price}
                            maxLength={10}
                            onChange={(e) => {setPrice(e.target.value)}}
                        />
                    </fieldset>
                    <footer>
                        <p>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit" className="btn">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default ProductEdit;
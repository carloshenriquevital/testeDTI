import React, { FormEvent, useState } from 'react';

import './styles.css'
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { useHistory, Link } from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import api from '../../services/api';
import CurrencyInput from '../../components/CurrencyInput';
import NumericInput from '../../components/NumericInput';
import { getAccessToken } from '../../services/auth';

function ProductCreate() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');

    const handleCreateProduct = async (e: FormEvent) => {
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

            api.post('products', {
                name,
                number: Number(number),
                price: correctPrice
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                alert('Produto cadastrado com sucesso.');
                history.push('/');
            }).catch(() => {
                alert('Erro no cadastro.');
            });
        }
    }

    return (
        <div id="page-product-create" className="container">
            <PageHeader />
            
            <main>
                <ContentHeader title="Novo Produto">
                    <Link to="/" className="btn">
                        Voltar
                    </Link>
                </ContentHeader>
                <form onSubmit={handleCreateProduct}>
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
                            maxLength={11}
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

export default ProductCreate;
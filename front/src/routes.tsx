import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import ProductCreate from './pages/ProductCreate';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={ProductList} />
            <Switch>
                <Route path="/products/:id" component={ProductEdit} />
                <Route path="/new-product" exact component={ProductCreate} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
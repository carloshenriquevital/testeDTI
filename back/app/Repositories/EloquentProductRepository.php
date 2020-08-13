<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;

class EloquentProductRepository implements ProductRepositoryInterface {

    protected $model;

    public function __construct(Product $model) {
        $this->model = $model;
    }

    public function findAll(){
        return $this->model->all();
    }

    public function findById(int $id) {
        return $this->model->find($id);
    }

    public function create(array $data) {
        return $this->model->create($data);
    }

    public function update(array $data, int $id) {
        $product = $this->model->find($id);

        if(!$product) {
            return null;
        }

        $product->fill($data);

        $product->save();
        return $product->fresh();
    }

    public function delete(int $id) {
        return $this->model->destroy($id);
    }
}
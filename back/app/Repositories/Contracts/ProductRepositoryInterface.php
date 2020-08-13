<?php

namespace App\Repositories\Contracts;

interface ProductRepositoryInterface {

    public function findAll();

    public function findById(int $id);

    public function create(array $data);

    public function update(array $data, int $id);
    
    public function delete(int $id);
}
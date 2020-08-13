<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduct;
use App\Http\Requests\UpdateProduct;

use App\Http\Resources\Product as ProductResource;
use App\Http\Resources\Products as ProductCollection;
use App\Repositories\Contracts\ProductRepositoryInterface;

class ProductController extends Controller
{
    protected $repository;

    public function __construct(ProductRepositoryInterface $repository) {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(
            new ProductCollection($this->repository->findAll()),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProduct  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProduct $request)
    {
        return response()->json(
            new ProductResource($this->repository->create(
                $request->validated())
            ),
            201
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = $this->repository->findById($id);

        if($product) {
            return response()->json(
                new ProductResource($product)
                , 200
            );
        }

        return response()->json([], 404);
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProduct  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProduct $request, $id)
    {
        $updatedProduct = $this->repository->update($request->validated(), $id);
        // return new ProductResource($this->repository->update($request->validated(), $id));
        if($updatedProduct) {
            return response()->json(
                new ProductResource($updatedProduct)
                , 200
            );
        }

        return response()->json([], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->repository->delete($id);

        return response()->json([], 200);
    }
}

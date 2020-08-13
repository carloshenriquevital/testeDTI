<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Repositories\EloquentProductRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductRepositoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_product_can_be_inserted()
    {
        $this->withExceptionHandling();
        $productRepository = new EloquentProductRepository(new Product);

        $productRepository->create([
            'name' => 'Produto 1',
            'number' => 2,
            'price' => 34.6
        ]);

        $this->assertCount(1, Product::all());
    }


    /** @test */
    public function a_product_can_be_updated()
    {
        $this->withExceptionHandling();
        $productRepository = new EloquentProductRepository(new Product);

        $productRepository->create([
            'name' => 'Produto Novo',
            'number' => 2,
            'price' => 34.6
        ]);

        $this->assertCount(1, Product::all());
        $this->assertEquals('Produto Novo', Product::first()->name);
        $this->assertEquals(2, Product::first()->number);
        $this->assertEquals(34.6, Product::first()->price);

        $productRepository->update([
            'name' => 'Produto Atualizado',
            'number' => 2,
            'price' => 34.6
        ], 1);

        $this->assertEquals('Produto Atualizado', Product::first()->name);
        $this->assertEquals(2, Product::first()->number);
        $this->assertEquals(34.6, Product::first()->price);
    }
}

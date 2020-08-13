<?php

namespace Tests\Feature;

use \App\Database\Eloquent\Factory;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;
    
    

    /** @test */
    public function a_name_is_required()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        $response = $this->actingAs($user)
                         ->post('/api/products', [
                             'name' => '',
                             'number' => 3,
                             'price' => 34.6
                         ]);
        // $response = $this->get('/');
                        
        $response->assertJsonValidationErrors('name');
        $response->assertStatus(422);
    }

    /** @test */
    public function a_number_is_required()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        $response = $this->actingAs($user)
                         ->post('/api/products', [
                             'name' => 'Produto 1',
                             'price' => 34.6
                         ]);
        // $response = $this->get('/');
                        
        $response->assertJsonValidationErrors('number');
        $response->assertStatus(422);
    }

    /** @test */
    public function a_price_is_required()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        $response = $this->actingAs($user)
                         ->post('/api/products', [
                             'name' => 'Produto 1',
                             'number' => 3
                         ]);
        // $response = $this->get('/');
                        
        $response->assertJsonValidationErrors('price');
        $response->assertStatus(422);
    }

    /** @test */
    public function a_number_needs_to_be_numeric()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        $response = $this->actingAs($user)
                         ->post('/api/products', [
                             'name' => 'Produto 1',
                             'number' => 'teste',
                             'price' => 34.6
                         ]);
        // $response = $this->get('/');
                        
        $response->assertJsonValidationErrors('number');
        $response->assertStatus(422);
        $this->assertCount(0, Product::all());
    }

    /** @test */
    public function a_price_needs_to_be_numeric()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        $response = $this->actingAs($user)
                         ->post('/api/products', [
                             'name' => 'Produto 1',
                             'number' => 2,
                             'price' => 'teste'
                         ]);
        // $response = $this->get('/');
                        
        $response->assertJsonValidationErrors('price');
        $response->assertStatus(422);
        $this->assertCount(0, Product::all());
    }

    /** @test */
    public function many_products_can_be_retrieved()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        $response = $this->actingAs($user)
                        ->post('/api/products', [
                            'name' => 'Produto 1',
                            'number' => 3,
                            'price' => 34.6
                        ]);
        // $response = $this->get('/');
                        
        $response->assertStatus(201);

        $response = $this->actingAs($user)
                        ->post('/api/products', [
                            'name' => 'Produto 2',
                            'number' => 1,
                            'price' => 54.8
                        ]);
        // $response = $this->get('/');
                        
        $response->assertStatus(201);

        $this->assertCount(2, Product::all());

        $response = $this->actingAs($user)
                        ->get('/api/products');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_single_product_can_be_retrieved()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        $response = $this->actingAs($user)
                        ->post('/api/products', [
                            'name' => 'Produto 1',
                            'number' => 3,
                            'price' => 34.6
                        ]);
        
                        
        $response->assertStatus(201);

        $this->assertCount(1, Product::all());

        $response = $this->actingAs($user)
                        ->get('/api/products/' . Product::first()->id);

        $response->assertStatus(200);
    }

    /** @test */
    public function a_product_can_be_added_to_storage()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        $response = $this->actingAs($user)
                        ->post('/api/products', [
                            'name' => 'Produto 1',
                            'number' => 3,
                            'price' => 34.6
                        ]);
        // $response = $this->get('/');
                        
        $response->assertStatus(201);
        $this->assertCount(1, Product::all());
    }
    
    /** @test */
    public function a_product_can_be_updated()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

         $this->actingAs($user)
            ->post('/api/products', [
                'name' => 'Produto 1',
                'number' => 3,
                'price' => 34.6
            ]);
        // $response = $this->get('/');
                        
        $this->assertCount(1, Product::all());

        $response = $this->actingAs($user)
                         ->put('/api/products/' . Product::first()->id, [
                             'name' => 'Produto Atualizado',
                             'number' => 5,
                             'price' => 34.6
                         ]);
        // $response = $this->get('/');
        $this->assertEquals('Produto Atualizado', Product::first()->name);
        $this->assertEquals(5, Product::first()->number);
        $this->assertEquals(34.6, Product::first()->price);
                        
        $response->assertStatus(200);
    }

    /** @test */
    public function a_product_can_be_deleted()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

         $this->actingAs($user)
            ->post('/api/products', [
                'name' => 'Produto 1',
                'number' => 3,
                'price' => 34.6
            ]);
        // $response = $this->get('/');
                        
        $this->assertCount(1, Product::all());

        $response = $this->actingAs($user)
                         ->delete('/api/products/' . Product::first()->id);
        // $response = $this->get('/');
        $this->assertCount(0, Product::all());
                        
        $response->assertStatus(200);
    }

    /** @test */
    public function a_product_cant_be_added_by_unauthorized_users()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        $response = $this->post('/api/products', [
                             'name' => 'Produto 1',
                             'number' => 3,
                             'price' => 34.6
                         ]);
        // $response = $this->get('/');
                        
        $response->assertStatus(401);
        $this->assertCount(0, Product::all());
    }

    /** @test */
    public function a_product_cant_be_updated_by_unauthorized_users()
    {
        $this->withExceptionHandling();

        Product::create([
            'name' => 'Produto 1',
            'number' => 3,
            'price' => 34.6
        ]);
        // $response = $this->get('/');
                        
        $this->assertCount(1, Product::all());

        $response = $this->put('/api/products/' . Product::first()->id, [
                            'name' => 'Produto Atualizado',
                            'number' => 5,
                            'price' => 34.6
                        ]);
        // $response = $this->get('/');
        $response->assertStatus(401);

        $this->assertEquals('Produto 1', Product::first()->name);
        $this->assertEquals(3, Product::first()->number);
        $this->assertEquals(34.6, Product::first()->price);
    }

    /** @test */
    public function a_product_cant_be_deleted_by_unauthorized_users()
    {
        $this->withExceptionHandling();
        $user = factory('App\Models\User')->create();

        Product::create([
            'name' => 'Produto 1',
            'number' => 3,
            'price' => 34.6
        ]);
        // $response = $this->get('/');
                        
        $this->assertCount(1, Product::all());

        $response = $this->delete('/api/products/' . Product::first()->id);
        $response->assertStatus(401);

        $this->assertCount(1, Product::all());

        
    }
}

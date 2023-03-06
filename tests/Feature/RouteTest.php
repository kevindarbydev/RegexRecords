<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;


class RouteTest extends TestCase
{
    public function test_route_to_collections()
    {
        $user = User::factory()->create([
            'name' => 'Ozzy Osbourne',
            'email' => 'ozzy@crazytrain.com',
            'password' => 'GoodPassword55!!',
            // 'password_confirmation' => 'GoodPassword55!!'
        ]); {
            $response = $this->actingAs($user)->get('dashboard/collections');

            $response->assertStatus(200);
        }
    }
    // use RefreshDatabase;
    public function test_route_to_marketplace()
    {
        $user2 = User::factory()->create([
            'name' => "Steve2",
            'email' => "steve2@test.com",
            'password' => 'GoodPassword55!!',
        ]); {
            $response = $this->actingAs($user2)->get('/marketplace');

            $response->assertStatus(200);
        }
    }

    // public function test_route_to_explore()
    // {
    //     $user3 = User::factory()->create([
    //         'name' => "Steve3",
    //         'email' => "steve3@test.com",
    //     ]); {
    //         $response = $this->actingAs($user3)->get('/explore');

    //         $response->assertStatus(200);
    //     }
    // }
}

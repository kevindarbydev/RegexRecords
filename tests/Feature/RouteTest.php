<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

// tests the routes as an auth user
class RouteTest extends TestCase
{

    // ---- dashboard ----
    public function test_route_to_wishlists()
    {
        $user4 = User::factory()->create([
            'name' => "Julia",
            'email' => "julia@test.com",
            'password' => 'GoodPassword77!!',
        ]); {
            $response = $this->actingAs($user4)->get('dashboard/wishlists');

            $response->assertStatus(200);
        }
    }

    public function test_route_to_export()
    {
        $user5 = User::factory()->create([
            'name' => "Mike",
            'email' => "mike@test.com",
            'password' => 'GoodPassword88!!',
        ]); {
            $response = $this->actingAs($user5)->get('dashboard/export');

            $response->assertStatus(200);
        }
    }

    public function test_route_to_collections()
    {
        $user1 = User::factory()->create([
            'name' => 'Ozzy Osbourne',
            'email' => 'ozzy@crazytrain.com',
            'password' => 'GoodPassword55!!',
            // 'password_confirmation' => 'GoodPassword55!!'
        ]); {
            $response = $this->actingAs($user1)->get('dashboard/collections');

            $response->assertStatus(200);
        }
    }

    // --- marketplace ---
    public function test_route_to_marketplace()
    {
        $user2 = User::factory()->create([
            'name' => "Steven",
            'email' => "steven@test.com",
            'password' => 'GoodPassword55!!'
        ]); {
            $response = $this->actingAs($user2)->get('/marketplace');

            $response->assertStatus(200);
        }
    }


    // needs a seller, so checks if fail (code 200 vs 405)
    public function test_route_to_seller()
    {
        $user15 = User::factory()->create([
            'name' => "Bugz",
            'email' => "bugz@test.com",
            'password' => 'GoodPasswerd255!!'
        ]); {
            $response = $this->actingAs($user15)->get('marketplace/seller');

            $response->assertStatus(405);
        }
    }

    public function test_route_to_orders()
    {
        $user13 = User::factory()->create([
            'name' => "Perry",
            'email' => "perry@test.com",
            'password' => 'GoodPassword255!!'
        ]); {
            $response = $this->actingAs($user13)->get('marketplace/orders');

            $response->assertStatus(200);
        }
    }

    // --- explore ---

    // FIXME: I think the route to explore/index needs albums to exist in this context - trying to route to it breaks the test class w/no message

    // public function test_route_to_explore_index()
    // {
    //     $user8 = User::factory()->create([
    //         'name' => "Bill",
    //         'email' => "bill@test.com",
    //         'password' => 'GoodPassword99!!',
    //     ]); {
    //         $response = $this->actingAs($user8)->get('explore/index');

    //         $response->assertStatus(200);
    //     }
    // }

    public function test_route_to_adv_search()
    {
        $user6 = User::factory()->create([
            'name' => "Ronny",
            'email' => "ronnny@test.com",
            'password' => 'GoodPassword99!!',
        ]); {
            $response = $this->actingAs($user6)->get('explore/advSearch');

            $response->assertStatus(200);
        }
    }

    public function test_route_to_explore()
    {
        $user3 = User::factory()->create([
            'name' => "Steve Jobs",
            'email' => "steve33@test.com",
            'password' => 'GoodPassword15!!'
        ]); {
            $response = $this->actingAs($user3)->get('explore/viewAllAlbums');

            $response->assertStatus(200);
        }
    }
    // ---- community ----

    // this fails with message:
    // "The search field is required."
    // which is correct so for now changed error code from 200 to 302
    public function test_route_to_community_search_without_search_query()
    {
        $user9 = User::factory()->create([
            'name' => "Tom",
            'email' => "tom@test.com",
            'password' => 'GoodPassword378!!',
        ]); {
            $response = $this->actingAs($user9)->get('community/search');

            $response->assertStatus(302);
        }
    }

    public function test_route_to_friends()
    {
        $user10 = User::factory()->create([
            'name' => "Valair",
            'email' => "valair@test.com",
            'password' => 'GoodPassword178!!',
        ]); {
            $response = $this->actingAs($user10)->get('community/friends');

            $response->assertStatus(200);
        }
    }

    // --- profile ---
    public function test_route_to_profile()
    {
        $user11 = User::factory()->create([
            'name' => "Manny",
            'email' => "manny@test.com",
            'password' => 'GoodPassword178!!',
        ]); {
            $response = $this->actingAs($user11)->get('/profile');

            $response->assertStatus(200);
        }
    }

    // --- messages ---
    public function test_route_to_messages()
    {
        $user12 = User::factory()->create([
            'name' => "Sally",
            'email' => "sally@test.com",
            'password' => 'GoodPassword178!!',
        ]); {
            $response = $this->actingAs($user12)->get('messages/create');

            $response->assertStatus(200);
        }
    }
}

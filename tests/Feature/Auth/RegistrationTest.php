<?php

namespace Tests\Feature\Auth;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Elon Tusk',
            'email' => 'eTusk@spacex.com',
            'password' => 'GoodPassword55!!',
            'password_confirmation' => 'GoodPassword55!!'
        ]);

        // $this->withoutMiddleware();
        $this->actingAs($this->user()->assertAuthenticated($this->user()));
        $response->assertRedirect('/login');
    }
}

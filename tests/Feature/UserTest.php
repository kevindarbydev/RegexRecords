<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_user_duplication(): void
    {
        $user1 = User::make([
            'name' => 'Elon Tusk',
            'email' => 'eTusk@spacex.com',
            'password' => 'GoodPassword55!!',
            'password_confirmation' => 'GoodPassword55!!'
        ]);

        $user2 = User::make([
            'name' => 'Stan Marsh',
            'email' => 'stan@sp.com',
            'password' => 'GoodPassword55!!',
            'password_confirmation' => 'GoodPassword55!!'
        ]);
        $this->assertTrue($user1->name != $user2->name);
    }

    public function test_delete_user()
    {
        $user = User::factory()->count(1)->make();
        $user = User::first();
        if ($user) {
            $user->delete();
        }
        $this->assertTrue(true);
    }
}

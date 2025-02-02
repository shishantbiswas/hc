<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Link>
 */
class LinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $realUrls = [
            'https://www.google.com',
            'https://www.github.com',
            'https://www.wikipedia.org',
            'https://www.stackoverflow.com',
        ];
        return [
            'name' => fake()->words(2, true),
            'user_id' => 1,
            'status' => fake()->boolean(),
            'url' => fake()->randomElement($realUrls),
        ];
    }
}

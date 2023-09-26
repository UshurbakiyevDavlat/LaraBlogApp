<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categoryIds = Category::all()->pluck('id');

        return [
            'title' => $this->faker->sentence(),
            'category_id' => $categoryIds->random(),
            'content' => $this->faker->paragraphs(3, true),
        ];
    }
}

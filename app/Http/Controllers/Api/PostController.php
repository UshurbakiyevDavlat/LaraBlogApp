<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $post = Post::with('category')
            ->when(request('category'), function ($query) {
                $query->where('category_id', request('category'));
            })
            ->paginate(2);

        return PostResource::collection($post);
    }
}

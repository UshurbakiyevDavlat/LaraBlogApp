<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\IndexRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    public function index(IndexRequest $request): AnonymousResourceCollection
    {
        $data = $request->validated();

        $orderColumn = $data['column'] ?? 'created_at';
        $orderDir = $data['order'] ?? 'desc';

        $post = Post::with('category')
            ->when($data['category'], function ($query) use ($data) {
                $query->where('category_id', $data['category']);
            })
            ->orderBy($orderColumn, $orderDir)
            ->paginate(10);

        return PostResource::collection($post);
    }
}

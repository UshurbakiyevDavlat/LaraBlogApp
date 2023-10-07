<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\IndexRequest;
use App\Http\Requests\Post\StoreRequest;
use App\Http\Requests\Post\UpdateRequest;
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

    public function store(StoreRequest $request): PostResource
    {
        $data = $request->validated();

        if ($data['thumbnail']) {
            $filename = $request->file('thumbnail')?->getClientOriginalName();
            info($filename);
        }

        $post = Post::create($data);

        return new PostResource($post);
    }

    public function update(Post $post, UpdateRequest $request): PostResource
    {
        $data = $request->validated();

        $post->update($data);

        return new PostResource($post);
    }

    public function show(Post $post): PostResource
    {
        return new PostResource($post);
    }
}

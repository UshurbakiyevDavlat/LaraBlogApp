<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\IndexRequest;
use App\Http\Requests\Post\StoreRequest;
use App\Http\Requests\Post\UpdateRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class PostController extends Controller
{
    public function index(IndexRequest $request): AnonymousResourceCollection
    {
        $data = $request->validated();

        $orderColumn = $data['column'] ?? 'created_at';
        $orderDir = $data['order'] ?? 'desc';

        $post = Post::with('category')
            ->when($data['search_category'], function ($query) use ($data) {
                $query->where('category_id', $data['search_category']);
            })
            ->when($data['search_id'], function ($query) use ($data) {
                $query->where('id', $data['search_id']);
            })
            ->when($data['search_title'], function ($query) use ($data) {
                $query->where('title', 'like', '%' . $data['search_title'] . '%');
            })
            ->when($data['search_content'], function ($query) use ($data) {
                $query->where('content', 'like', '%' . $data['search_content'] . '%');
            })
            ->when($data['search_global'], function ($query) use ($data) {
                $query->where(function ($q) use ($data) {
                    $q->where('title', 'like', '%' . $data['search_global'] . '%')
                        ->orWhere('content', 'like', '%' . $data['search_global'] . '%')
                        ->orWhere('id', $data['search_global'])
                        ->orWhere('category_id', $data['search_global']);
                });
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

    /**
     * @throws AuthorizationException
     */
    public function destroy(Post $post): Response
    {
        $this->authorize('post.delete'); // gate check

        $post->delete();

        return response()->noContent();
    }
}

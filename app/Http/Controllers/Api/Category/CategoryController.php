<?php

namespace App\Http\Controllers\Api\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        return CategoryResource::collection(Category::get());

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreCategoryRequest $request
     * @return JsonResponse|object
     */
    public function store(StoreCategoryRequest $request)
    {
        try {
            $category = Category::create($request->all());
            return (new CategoryResource($category))
                ->response()
                ->setStatusCode(201);
        }catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while created a Category'
            ],500);        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return CategoryResource
     */
    public function show($id)
    {
        try {
            return new  CategoryResource(Category::findOrfail($id));
        }catch (\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Category not found'
            ],404);
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {

        try {
            $category = Category::findOrFail($id);
            $category->delete();
            return response()->json('', 204);
        }catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Category not found'
            ],404);
        }
    }
}

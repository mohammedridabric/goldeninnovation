<?php

namespace App\Http\Controllers\Api\Product;

use App\Http\Controllers\Controller;
use App\Http\helpers\helpers;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\Product\ProductResource;
use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        return ProductResource::collection(Product::with(['category','images'])->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreProductRequest $request
     * @return JsonResponse|object
     */
    public function store(StoreProductRequest $request)
    {
           $product = Product::create($request->all());
            if($request->hasfile('filename'))
            {
                $data=[];
                foreach($request->file('filename') as $image)
                {
                    $data[]= $this->saveImage($image,$product->id);
                }

                Image::insert($data);

            }
            //send  email
            helpers::sendMail("Product created Successfully",'produit :'.$product->title. ' description : '.$product->description);

         return response()->json([
            'product'=>new ProductResource($product),
            'message'=>'Product created Successfully ',
        ],201);


    }
    // save Image of product in path product/image and Getting (name,path,size)
    public function saveImage($photo,$id){

        $image = $photo;
        $imageName =Str::random().'.'.$photo->getClientOriginalExtension();
        $path = $image->move('product/image', $imageName);
        $imgsizes = $path->getSize();
        return [
            'name' =>$imageName,
            'path' =>$path,
            'size' =>$imgsizes,
            'product_id' =>$id
        ];
    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return ProductResource
     */
    public function show($id)
    {
        try {
            return new  ProductResource(Product::with(['category','images'])->findOrfail($id));
        }catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'product not found '
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateProductRequest $request
     * @param int $id
     * @return void
     */
    public function update(UpdateProductRequest $request, $id)
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
            $product = Product::findOrFail($id);
            if($product->images){
                foreach ($product->images as $image) {

                    $this->deleteImage($image->name);
                }
            }
            //send  email
            helpers::sendMail("Product Deleted Successfully",'produit :'.$product->title. ' description : '.$product->description);

            $product->delete();
            return response()->json([
                'message'=>'Product Deleted Successfully!!',
                'id'=>$id
            ],200);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'product not found  ',
                'error'=>$e->getMessage()
            ],404);
        }
    }

    public function deleteImage($name){

        $path = public_path("product/image/".$name);

        if(File::exists($path)){
            unlink("product/image/".$name);
        }

    }
}

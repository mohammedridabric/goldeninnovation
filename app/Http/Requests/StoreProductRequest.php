<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'         =>'required|string',
            'description'   =>'required|string',
            'date'          =>'required|date',
            'category_id'   =>'required|exists:categories,id',
            'filename'      => 'required',
            'filename.*'    => 'mimes:jpeg,jpg,png'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors()
        ]));
    }
    public function messages()
    {
        return [
            'title.required'        => 'title is required',
            'title.string'          => 'title is not correct',
            'description.required'  => 'description is required',
            'description.string'    => 'description is not correct',
            'category.required'     => 'category is  required',
            'filename.required'     => 'filename is  required',
        ];
    }
}

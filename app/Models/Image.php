<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['name','path','size'];

    protected $hidden = [
        'updated_at',
        'created_at',
    ];

    public function product(){
        return $this -> belongsTo(Product::class);
    }

}

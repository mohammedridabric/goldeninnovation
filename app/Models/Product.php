<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title','description','date','category_id'];

    protected $hidden = [
        'updated_at',
        'created_at',
    ];

    public function category(){
        return $this -> belongsTo(Category::class);
    }

    public function images(){
        return $this -> hasMany(Image::class);
    }
}

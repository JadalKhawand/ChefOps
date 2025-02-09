<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;
        protected $primaryKey = 'menuID'; 
        protected $fillable = [
            'name', 
            'description', 
            'price', 
            'category',
            'image'
        ];
    
        public $timestamps = true;
        
}

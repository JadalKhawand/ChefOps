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
        public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_menu', 'menuID', 'orderID')
                    ->withPivot('quantity') 
                    ->withTimestamps();
    }

        
}

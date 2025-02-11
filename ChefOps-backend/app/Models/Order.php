<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $primaryKey = 'orderID'; 
    protected $fillable = ['menuID', 'quantity'];

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'order_menu', 'orderID', 'menuID')
                    ->withPivot('quantity') 
                    ->withTimestamps();
    }

}

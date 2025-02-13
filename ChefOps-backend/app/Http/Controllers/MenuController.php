<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
 
    public function index(Request $request)
    {
        $category = $request->query('category');
        
        if ($category) {
            return Menu::where('category', $category)->get();
        }
        
        return Menu::all();
    }
    

  
    public function store(Request $request)
    {
       

        $menu = new Menu();
        $menu->name = $request->name;
        $menu->description = $request->description;
        $menu->price = $request->price;
        $menu->category = $request->category;
        if ($request->hasFile('image')) {
            $menu->image = $request->file('image')->store('menu_images', 'public');
        }

        if ($menu->save()) {
            return response()->json($menu, 201);
        } else {
            return response()->json(['error' => 'Failed to create menu item'], 400);
        }

        return response()->json($menu, 201);
    }

   
    
    public function update(Request $request, Menu $menu)
{
    // Validate the incoming data
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'category' => 'required|string|max:255'
    ]);

    // Update the menu details
    $menu->name = $validatedData['name'];
    $menu->description = $validatedData['description'];
    $menu->price = $validatedData['price'];
    $menu->category = $validatedData['category'];

    if ($request->hasFile('image')) {
        $menu->image = $request->file('image')->store('menu_images', 'public');
    }

    if ($menu->save()) {
        return response()->json($menu, 200); 
    } else {
        return response()->json(['error' => 'Failed to update menu item'], 400);
    }
}

    
    

public function destroy($id)
{
    $menu = Menu::findOrFail($id);

    DB::table('order_menu')->where('menuID', $id)->update(['menuID' => null]);

    $menu->delete();

    return response()->json(['message' => 'Menu deleted successfully']);
}


}

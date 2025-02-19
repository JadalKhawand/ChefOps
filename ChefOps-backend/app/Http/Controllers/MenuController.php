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
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255'
        ]);

        $menu = new Menu();
        $menu->name = $validatedData['name'];
        $menu->description = $validatedData['description'];
        $menu->price = $validatedData['price'];
        $menu->category = $validatedData['category'];
        
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
    try {
        $menu = Menu::findOrFail($id);

        DB::table('order_menu')->where('menuID', $id)->update(['menuID' => null]);

        $menu->delete();

        return response()->json(['message' => 'Menu deleted successfully'], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['error' => 'Menu not found'], 404);
    } catch (\Exception $e) {
        return response()->json(['error' => 'An error occurred while deleting the menu', 'details' => $e->getMessage()], 500);
    }
}



}

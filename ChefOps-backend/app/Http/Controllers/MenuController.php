<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $category = $request->query('category');
        
        if ($category) {
            return Menu::where('category', $category)->get();
        }
        
        return Menu::all();
    }
    

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Menu::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        // Validate the incoming data
    

    // Update the menu item
    $menu->name = $request->name;
    $menu->description = $request->description;
    $menu->price = $request->price;
    $menu->category = $request->category;

    // Handle image upload if a new image is provided
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('menu_images', 'public');
        $menu->image = $imagePath;
    }

    // Save the changes to the database
   if ($menu->save()) {
            return response()->json($menu, 201);
        } else {
            return response()->json(['error' => 'Failed to create menu item'], 400);
        }

    // Redirect or return response
    return redirect()->route('menus.index')->with('success', 'Menu item updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();

        // Redirect or return a response
        return redirect()->route('menus.index')->with('success', 'Menu item deleted successfully!');
    }
}

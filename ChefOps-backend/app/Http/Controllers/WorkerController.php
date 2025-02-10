<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class WorkerController extends Controller
{
    /**
     * Display a listing of the workers.
     */
    public function index()
    {
        return response()->json(Worker::all());
    }

    /**
     * Store a newly created worker in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:workers',
            'password' => 'required|string|min:6',
            'role' => 'required|string|max:50',
        ]);

        $worker = Worker::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hashing the password for security
            'role' => $request->role,
        ]);

        return response()->json(['message' => 'Worker created successfully', 'worker' => $worker], 201);
    }

    /**
     * Display the specified worker.
     */
    public function show($id)
    {
        $worker = Worker::find($id);
        if (!$worker) {
            return response()->json(['message' => 'Worker not found'], 404);
        }
        return response()->json($worker);
    }

    /**
     * Update the specified worker in storage.
     */
    public function update(Request $request, $id)
    {
        $worker = Worker::find($id);
        if (!$worker) {
            return response()->json(['message' => 'Worker not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|unique:workers,email,' . $worker->id,
            'password' => 'sometimes|string|min:6',
            'role' => 'sometimes|string|max:50',
        ]);

        if ($request->has('name')) $worker->name = $request->name;
        if ($request->has('email')) $worker->email = $request->email;
        if ($request->has('password')) $worker->password = Hash::make($request->password);
        if ($request->has('role')) $worker->role = $request->role;

        $worker->save();

        return response()->json(['message' => 'Worker updated successfully', 'worker' => $worker]);
    }

    /**
     * Remove the specified worker from storage.
     */
    public function destroy($id)
    {
        $worker = Worker::find($id);
        if (!$worker) {
            return response()->json(['message' => 'Worker not found'], 404);
        }

        $worker->delete();
        return response()->json(['message' => 'Worker deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;

class ApiController extends Controller{

    public function register(Request $request)
    {
        $data = [
            'name'=>$request->name,
            'email'=> $request->email,
            'password'=>bcrypt($request->password),
        ];

        try {
            User::create($data);
            $status=true;
            $message='Record successfully created !';
        } catch (Exception $e) {
            $message = $e->getMessage();
            $status=false;
        }

        return response()->json(['success'=>$status,'message'=>$message]);
    }
    
    public function login(Request $request)
    {
        return $request->all();
    }

}
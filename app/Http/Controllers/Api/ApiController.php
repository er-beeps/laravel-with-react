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
        
        $credential= $request->validate([
            'email'=>'required',
            'password'=>'required'
        ]);

        // $credential=[
        //     'username'=>$request->name,
        //     'password'=>$request->password,
        // ];

        if(!auth()->attempt($credential)){
            return response()->json(['success'=>false,'message'=>'Invalid Credentials']);
        }
        $accessToken =auth()->user()->createToken('authToken')->plainTextToken;

        return response()->json(['success'=>true,'user'=>auth()->user(),'auth_token'=>$accessToken]);
    }

}
<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class MaklonController extends Controller
{
    public function index()
    {
        return Inertia::render('Maklon/Index');
    }
}

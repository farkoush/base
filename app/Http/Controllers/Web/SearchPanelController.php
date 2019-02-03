<?php

namespace App\Http\Controllers\Web;

use App\Models\Product;
use App\Models\Business;
use App\Models\SearchPanel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchPanelController extends Controller
{
    public function search(Request $request, SearchPanel $searchPanel)
    {
        $options = $searchPanel->options;

        if ($searchPanel->model === Product::class) {
            $products = $searchPanel->result($request, ['tags', 'media']);

            return view('searchpanels.products', compact('options', 'products'));
        }

        if ($searchPanel->model === Business::class) {
            $businesses = $searchPanel->result($request);

            return view('searchpanels.businesses', compact('options', 'businesses'));
        }
    }
}

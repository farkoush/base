<?php

namespace App\Http\Requests\SearchPanels;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSearchPanelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'          =>  'required|string',
            'slug'           =>  [
                'required',
                'string',
                Rule::unique(
                    'search_panels',
                    'slug'
                )->ignore($this->input('slug'), 'slug'),
            ],
            'description'    =>  'nullable|string',
            'model'          =>  'required|string',
            'filters'        =>  'required|array',
            'options'        =>  'required|array',
        ];
    }
}

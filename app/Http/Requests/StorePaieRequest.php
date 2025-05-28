<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StorePaieRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'paies' => 'required|array',
      'paies.*.employe_id' => 'required|exists:users,id',
      'paies.*.date' => 'required|date',
      'paies.*.montant' => 'required|numeric|min:0',
      'paies.*.prime' => 'nullable|decimal:2|min:0',
    ];
  }
}

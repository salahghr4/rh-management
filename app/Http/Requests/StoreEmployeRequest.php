<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeRequest extends FormRequest
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
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'adresse' => ['required', 'string', 'max:255'],
            'telephone' => ['required', 'string', 'max:20'],
            'date_embauche' => ['required', 'date', 'before_or_equal:today'],
            'poste' => ['required', 'string', 'max:255'],
            'type_contrat' => ['required', Rule::in(['CDI', 'CDD'])],
            'status' => ['required', Rule::in(['actif', 'inactif'])],
            'salaire' => ['required', 'numeric', 'min:1500'],
            'role' => ['required', Rule::in(['admin', 'employe', 'rh', 'manager'])],
            'departement_id' => ['nullable', 'exists:departements,id'],
            'joures_conges_restant' => ['required', 'integer', 'min:0', 'max:18'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'documents.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx',
        ];
    }
}

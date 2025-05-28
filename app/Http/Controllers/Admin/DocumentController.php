<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
  public function store(Request $request, User $employe)
  {
    $request->validate([
      'documents.*' => 'required|file|mimes:pdf,jpg,jpeg,png,doc,docx',
    ]);

    foreach ($request->file('documents') as $file) {
      $path = $file->store('documents/employe-' . $employe->id, 'public');

      $employe->documents()->create([
        'file_path' => $path,
        'file_name' => $file->getClientOriginalName(),
        'file_size' => $file->getSize(),
        'file_extension' => $file->getClientOriginalExtension(),
      ]);
    }

    return redirect()->route('admin.employes.show', $employe->id)->with('success', 'Documents uploaded successfully.');
  }

  public function destroy(User $employe, Document $document)
  {
    Storage::disk('public')->delete($document->file_path);
    $document->delete();

    return redirect()->route('admin.employes.show', $employe->id)->with('success', 'Document deleted successfully.');
  }

  public function downloadDocument(User $employe, Document $document)
  {
    return Storage::disk('public')->download($document->file_path, $document->file_name);
    // return response()->download(storage_path('app/public/' . $document->file_path), $document->file_name);
  }
}

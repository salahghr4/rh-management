import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Create({ auth, types }) {
  const [formData, setFormData] = useState({
    date_debut: '',
    date_fin: '',
    type: 'congé',
    commentaire: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('employe.conges.store'), formData, {
      onSuccess: () => {
        setFormData({
          date_debut: '',
          date_fin: '',
          type: 'autre',
          commentaire: ''
        });
      },
      onError: (errors) => {
        console.error('Error creating employee record:', errors);
      }
    });
  };

  const { errors } = usePage().props;

  return (
    <>
      <AuthenticatedLayout user={auth.user}>
        <Head title="Create Congés" />
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
          <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="bg-blue-500 md:w-1/3 p-8 text-white">
                <h2 className="text-3xl font-bold mb-6">Demande un Congé</h2>
                <p className="text-indigo-200 mb-6">Remplissez le formulaire pour soumettre une demande de congé.</p>
              </div>
              <div className="p-8 md:w-2/3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="date_debut" className={`block text-sm font-medium ${errors.date_debut ? 'text-red-500' : 'text-gray-700'} mb-1`}>
                        Date Début
                      </label>
                      <input
                        type="date"
                        id="date_debut"
                        name="date_debut"
                        value={formData.date_debut}
                        onChange={handleChange}
                        className={`w-full rounded-lg border ${errors.date_debut ? 'border-red-500' : 'border-gray-200'} shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.date_debut && <p className="text-red-500 text-sm mt-1">{errors.date_debut}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="date_fin" className={`block text-sm font-medium ${errors.date_fin ? 'text-red-500' : 'text-gray-700'} mb-1`}>
                        Date Fin
                      </label>
                      <input
                        type="date"
                        id="date_fin"
                        name="date_fin"
                        value={formData.date_fin}
                        onChange={handleChange}
                        className={`w-full rounded-lg border ${errors.date_fin ? 'border-red-500' : 'border-gray-200'} shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.date_fin && <p className="text-red-500 text-sm mt-1">{errors.date_fin}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="type" className={`block text-sm font-medium ${errors.type ? 'text-red-500' : 'text-gray-700'} mb-1`}>
                        Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={`w-full rounded-lg border ${errors.type ? 'border-red-500' : 'border-gray-200'} shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      >
                        {types.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="commentaire" className={`text-sm font-medium ${errors.commentaire ? 'text-red-500' : 'text-gray-700'} mb-1`}>
                      Commentaire
                    </label>
                    <textarea
                      id="commentaire"
                      name="commentaire"
                      value={formData.commentaire}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full rounded-lg border ${errors.commentaire ? 'border-red-500' : 'border-gray-200'} shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Ajoutez des commentaires ou des notes supplémentaires"
                    ></textarea>
                    {errors.commentaire && <p className="text-red-500 text-sm mt-1">{errors.commentaire}</p>}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                      onClick={() => router.get(route('employe.conges.index'))}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}

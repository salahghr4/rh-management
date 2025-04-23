import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateForm() {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    telephone: '',
    date_embauche: '',
    poste: '',
    type_contrat: 'CDI',
    status: 'active',
    salaire: '',
    role: 'employe',
    departement_id: '',
    joures_conges_restant: 18,
    password: '',
    password_confirmation: ''
  });

  const [departments, setDepartments] = useState([
    { id: 1, name: 'IT', icon: '💻' },
    { id: 2, name: 'HR', icon: '👥' },
    { id: 3, name: 'Finance', icon: '💰' },
    { id: 4, name: 'Marketing', icon: '📈' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('admin.employes.store'), formData, {
      onSuccess: () => {
        console.log('Form submitted successfully:', formData);
      },
      onError: (errors) => {
        console.error('Form submission errors:', errors);
      }
    });
    // console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  // Check if a tab is completed to show the checkmark
  const isTabCompleted = (tab) => {
    switch(tab) {
      case 'personal':
        return formData.nom && formData.prenom && formData.email && formData.adresse && formData.telephone;
      case 'employment':
        return formData.date_embauche && formData.poste && formData.salaire;
      case 'admin':
        return true; // This tab has default values so it's always "complete"
      default:
        return false;
    }
  };
  const { errors } = usePage().props;

  return (
    <div className="min-h-screen  p-6 flex  justify-center">
      <div className="w-full ">
      {Object.keys(errors).length > 0 && (
  <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded text-red-700">
    <p className="font-bold mb-2">Whoooooops Somthing wrong !!!</p>
    <ul className="list-disc list-inside">
      {Object.entries(errors).map(([field, message]) => (
        <li key={field}>{message}</li>
      ))}
    </ul>
  </div>
)}
        {/* Header with fluid design */}
        {/* <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 transform -skew-y-3 rounded-3xl shadow-lg opacity-20"></div>
          <div className="relative text-center py-8">
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              User Registration Portal
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Complete the registration form with the user's information across all categories
            </p>
          </div>
        </div> */}

        {/* Main card with custom shape */}
        <div className="relative">
          {/* Background decorative elements */}
          {/* <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full -ml-10 -mt-10 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-200 rounded-full -mr-16 -mb-16 opacity-50"></div>
          <div className="absolute top-1/2 right-0 w-24 h-24 bg-indigo-200 rounded-full -mr-12 opacity-30"></div>
           */}
          {/* Main form container */}
          <div className="relative bg-white  backdrop-filter backdrop-blur-lg bg-opacity-80 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Tab navigation with animated indicator */}
            <div className="relative">
              <div className="flex border-b">
                <button 
                  onClick={() => setActiveTab('personal')} 
                  className={`flex-1 py-4 px-6 text-center relative ${activeTab === 'personal' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <span className="flex justify-center items-center space-x-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span className="hidden sm:inline font-medium">Personal</span>
                    {isTabCompleted('personal') && (
                      <span className="ml-2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </span>
                  {activeTab === 'personal' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>}
                </button>
                
                <button 
                  onClick={() => setActiveTab('employment')} 
                  className={`flex-1 py-4 px-6 text-center relative ${activeTab === 'employment' ? 'text-pink-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <span className="flex justify-center items-center space-x-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span className="hidden sm:inline font-medium">Employment</span>
                    {isTabCompleted('employment') && (
                      <span className="ml-2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </span>
                  {activeTab === 'employment' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-red-500"></div>}
                </button>
                
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className={`flex-1 py-4 px-6 text-center relative ${activeTab === 'admin' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <span className="flex justify-center items-center space-x-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <span className="hidden sm:inline font-medium">Administrative</span>
                    {isTabCompleted('admin') && (
                      <span className="ml-2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </span>
                  {activeTab === 'admin' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>}
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {/* Personal Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6 transition-all duration-500 ease-in-out">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <div className="group relative bg-white rounded-lg p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <h3 className="ml-3 text-lg font-medium text-gray-800">Personal Identity</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                              type="text"
                              name="nom"
                              value={formData.nom}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Enter nom"
                            />
                          </div>
                          
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                            <input
                              type="text"
                              name="prenom"
                              value={formData.prenom}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Enter prénom"
                            />
                          </div>
                          
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="email@example.com"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="group relative bg-white rounded-lg p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <h3 className="ml-3 text-lg font-medium text-gray-800">Contact Details</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                              </div>
                              <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="+33 01 23 45 67 89"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                            <textarea
                              name="adresse"
                              value={formData.adresse}
                              onChange={handleChange}
                              rows="3"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Enter full address"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Employment Tab */}
              {activeTab === 'employment' && (
                <div className="space-y-6 transition-all duration-500 ease-in-out">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <div className="group relative bg-white rounded-lg p-4 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h3 className="ml-3 text-lg font-medium text-gray-800">Job Details</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'embauche</label>
                            <input
                              type="date"
                              name="date_embauche"
                              value={formData.date_embauche}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                            <input
                              type="text"
                              name="poste"
                              value={formData.poste}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              placeholder="Job title"
                            />
                          </div>
                          
                          <div className="flex space-x-4">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat</label>
                              <div className="flex space-x-2">
                                <label className={`flex-1 flex items-center justify-center py-2 px-3 border ${formData.type_contrat === 'CDI' ? 'bg-pink-50 border-pink-300 text-pink-700' : 'border-gray-300 text-gray-700'} rounded-lg cursor-pointer hover:bg-pink-50 transition-all duration-200`}>
                                  <input
                                    type="radio"
                                    name="type_contrat"
                                    value="CDI"
                                    checked={formData.type_contrat === 'CDI'}
                                    onChange={handleChange}
                                    className="sr-only"
                                  />
                                  <span>CDI</span>
                                </label>
                                
                                <label className={`flex-1 flex items-center justify-center py-2 px-3 border ${formData.type_contrat === 'CDD' ? 'bg-pink-50 border-pink-300 text-pink-700' : 'border-gray-300 text-gray-700'} rounded-lg cursor-pointer hover:bg-pink-50 transition-all duration-200`}>
                                  <input
                                    type="radio"
                                    name="type_contrat"
                                    value="CDD"
                                    checked={formData.type_contrat === 'CDD'}
                                    onChange={handleChange}
                                    className="sr-only"
                                  />
                                  <span>CDD</span>
                                </label>
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                              <div className="relative">
                                <select
                                  name="status"
                                  value={formData.status}
                                  onChange={handleChange}
                                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                >
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="group relative bg-white rounded-lg p-4 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="ml-3 text-lg font-medium text-gray-800">Compensation</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Salaire</label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">€</span>
                              </div>
                              <input
                                type="number"
                                name="salaire"
                                value={formData.salaire}
                                onChange={handleChange}
                                step="0.01"
                                className="w-full pl-8 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="0.00"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">/mois</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Salaire Range</label>
                            <div className="px-2">
                              <input
                                type="range"
                                min="1500"
                                max="10000"
                                step="100"
                                name="salaire"
                                value={formData.salaire || 1500}
                                onChange={handleChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>€1,500</span>
                                <span>€10,000</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-8 pt-4 border-t border-gray-200">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-gray-500">Annual Total:</span>
                              <span className="font-bold text-gray-800">
                                €{formData.salaire ? (parseFloat(formData.salaire) * 12).toLocaleString('fr-FR') : '0'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Administrative Tab */}
              {activeTab === 'admin' && (
                <div className="space-y-6 transition-all duration-500 ease-in-out">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <div className="group relative bg-white rounded-lg p-4 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-400 to-blue-500 text-white shadow-inner">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <h3 className="ml-3 text-lg font-medium text-gray-800">Department & Role</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <div className="grid grid-cols-2 gap-3">
                              {departments.map(dept => (
                                <label 
                                  key={dept.id}
                                  className={`
                                    flex items-center p-3 border rounded-lg cursor-pointer hover:bg-indigo-50 transition-all
                                    ${formData.departement_id === dept.id.toString() ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-gray-300 text-gray-700'}
                                  `}
                                >
                                  <input
                                    type="radio"
                                    name="departement_id"
                                    value={dept.id}
                                    checked={formData.departement_id === dept.id.toString()}
                                    onChange={handleChange}
                                    className="sr-only"
                                  />
                                  <span className="mr-2 text-xl">{dept.icon}</span>
                                  <span>{dept.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <div className="relative">
                              <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              >
                                <option value="employe">Employé</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                                <option value="super_admin">Super Admin</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="group relative bg-white rounded-lg p-4 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-400 to-blue-500 text-white shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <h3 className="ml-3 text-lg font-medium text-gray-800">Access & Security</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                              <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Set a secure password"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                              <input
                                type="password"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Confirm password"
                              />
                            </div>
                            {formData.password && formData.password_confirmation && formData.password !== formData.password_confirmation && (
                              <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jours de congés restants</label>
                            <div className="px-2">
                              <input
                                type="range"
                                min="0"
                                max="30"
                                step="1"
                                name="joures_conges_restant"
                                value={formData.joures_conges_restant}
                                onChange={handleChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0 jours</span>
                                <span className="font-medium text-indigo-600 text-center">{formData.joures_conges_restant} jours</span>
                                <span>30 jours</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Submit Button and Navigation */}
              <div className="mt-8 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                <div className="flex space-x-4">
                  {activeTab !== 'personal' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab(activeTab === 'employment' ? 'personal' : 'employment')}
                      className="px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </span>
                    </button>
                  )}
                  
                  {activeTab !== 'admin' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab(activeTab === 'personal' ? 'employment' : 'admin')}
                      className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="flex items-center">
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>
                
                {activeTab === 'admin' && (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Submit Registration
                    </span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
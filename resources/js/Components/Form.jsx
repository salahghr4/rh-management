import { Link, router, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function EditForm({ employe, departements }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    nom: employe.nom || "",
    prenom: employe.prenom || "",
    email: employe.email || "",
    adresse: employe.adresse || "",
    telephone: employe.telephone || "",
    date_embauche: employe.date_embauche || "",
    poste: employe.poste || "",
    type_contrat: employe.type_contrat || "CDI",
    status: employe.status || "active",
    salaire: employe.salaire || "",
    role: employe.role || "employe",
    departement_id: employe.departement_id || "",
    joures_conges_restant: employe.joures_conges_restant || 18,
    password: "",
    password_confirmation: "",
  });

  const { errors } = usePage().props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check if there are any errors set the active tab to the first one the error is in
  useEffect(() => {
    console.log(errors);
    if (errors) {
      const firstErrorTab = Object.keys(errors).find((key) => {
        return ["nom", "prenom", "email", "adresse", "telephone"].includes(key);
      });
      if (firstErrorTab) {
        setActiveTab("personal");
      } else if (
        Object.keys(errors).some((key) =>
          ["date_embauche", "poste", "salaire"].includes(key)
        )
      ) {
        setActiveTab("employment");
      } else if (
        Object.keys(errors).some((key) =>
          ["departement_id", "role"].includes(key)
        )
      ) {
        setActiveTab("admin");
      }
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(route("admin.employes.update", employe.id), formData);
  };

  // Check if a tab is completed to show the checkmark
  const isTabCompleted = (tab) => {
    switch (tab) {
      case "personal":
        return (
          formData.nom &&
          formData.prenom &&
          formData.email &&
          formData.adresse &&
          formData.telephone
        );
      case "employment":
        return formData.date_embauche && formData.poste && formData.salaire;
      case "admin":
        return (
          formData.departement_id &&
          formData.role &&
          formData.joures_conges_restant &&
          formData.password &&
          formData.password_confirmation
        );
      default:
        return false;
    }
  };

  return (
    <div className="p-6 bg-white flex flex-col rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-4">
          <div>
            <Link
              href={route("admin.employes.index")}
              className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Retour
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">Modifier l'employé </h1>
            <p className="text-gray-600">
              Veuillez remplir les informations nécessaires pour modifier les
              détails de l'employé.
            </p>
          </div>
        </div>
      </div>
      <div className="relative">
        {/* Main form container */}
        <div className="relative bg-white  backdrop-filter backdrop-blur-lg bg-opacity-80 rounded-2xl overflow-hidden">
          {/* Tab navigation with animated indicator */}
          <div className="relative">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("personal")}
                className={`flex-1 py-4 px-6 text-center relative ${
                  activeTab === "personal"
                    ? "text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex justify-center items-center space-x-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="hidden sm:inline font-medium">Personal</span>
                  {isTabCompleted("personal") && (
                    <span className="ml-2 text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  )}
                </span>
                {activeTab === "personal" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                )}
              </button>

              <button
                onClick={() => setActiveTab("employment")}
                className={`flex-1 py-4 px-6 text-center relative ${
                  activeTab === "employment"
                    ? "text-pink-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex justify-center items-center space-x-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span className="hidden sm:inline font-medium">Emploi</span>
                  {isTabCompleted("employment") && (
                    <span className="ml-2 text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  )}
                </span>
                {activeTab === "employment" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-red-500"></div>
                )}
              </button>

              <button
                onClick={() => setActiveTab("admin")}
                className={`flex-1 py-4 px-6 text-center relative ${
                  activeTab === "admin"
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex justify-center items-center space-x-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span className="hidden sm:inline font-medium">
                    Administratif
                  </span>
                  {isTabCompleted("admin") && (
                    <span className="ml-2 text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  )}
                </span>
                {activeTab === "admin" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                )}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 mt-3">
            {/* Personal Tab */}
            {activeTab === "personal" && (
              <div className="space-y-6 transition-all duration-500 ease-in-out">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div className="group relative bg-white rounded-lg p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-inner">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-3 text-lg font-medium text-gray-800">
                          Identité personnelle
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                          <label
                            className={`block text-sm font-medium ${
                              errors.nom ? "text-red-500" : "text-gray-700"
                            } mb-1`}
                          >
                            Nom
                          </label>
                          <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${
                              errors.nom ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="Enter nom"
                          />
                          {errors.nom && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.nom}
                            </p>
                          )}
                        </div>

                        <div className="col-span-1">
                          <label
                            className={`block text-sm font-medium ${
                              errors.prenom ? "text-red-500" : "text-gray-700"
                            } mb-1`}
                          >
                            Prénom
                          </label>
                          <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${
                              errors.prenom
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="Enter prénom"
                          />
                          {errors.prenom && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.prenom}
                            </p>
                          )}
                        </div>

                        <div className="col-span-2">
                          <label
                            className={`block text-sm font-medium ${
                              errors.email ? "text-red-500" : "text-gray-700"
                            } mb-1`}
                          >
                            Email
                          </label>
                          <div>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 border ${
                                  errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                placeholder="email@example.com"
                              />
                            </div>
                          </div>
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2">
                    <div className="group relative bg-white rounded-lg p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-inner">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-3 text-lg font-medium text-gray-800">
                          {" "}
                          Coordonnées
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label
                            className={`block text-sm font-medium ${
                              errors.telephone
                                ? "text-red-500"
                                : "text-gray-700"
                            } mb-1`}
                          >
                            Téléphone
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                            </div>
                            <input
                              type="tel"
                              name="telephone"
                              value={formData.telephone}
                              onChange={handleChange}
                              className={`w-full pl-10 pr-4 py-2 border ${
                                errors.telephone
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                              placeholder="06 00 00 00 00"
                            />
                          </div>
                          {errors.telephone && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.telephone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            className={`block text-sm font-medium ${
                              errors.adresse ? "text-red-500" : "text-gray-700"
                            } mb-1`}
                          >
                            Adresse
                          </label>
                          <textarea
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            rows="3"
                            className={`w-full px-4 py-2 border ${
                              errors.adresse
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="Entrez l'adresse complète"
                          ></textarea>
                          {errors.adresse && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.adresse}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Employment Tab */}
            {activeTab === "employment" && (
              <div className="space-y-6 transition-all duration-500 ease-in-out">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div className="group relative bg-white rounded-lg p-4 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-inner">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-3 text-lg font-medium text-gray-800">
                          Détails du poste
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label
                            className={`block text-sm font-medium ${
                              errors.date_embauche
                                ? "text-red-500"
                                : "text-gray-700"
                            } mb-1`}
                          >
                            Date d'embauche
                          </label>
                          <input
                            type="date"
                            name="date_embauche"
                            value={formData.date_embauche}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${
                              errors.nom ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                          />
                          {errors.date_embauche && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.date_embauche}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            className={`block text-sm font-medium ${
                              errors.telephone
                                ? "text-red-500"
                                : "text-gray-700"
                            } mb-1`}
                          >
                            Poste
                          </label>
                          <input
                            type="text"
                            name="poste"
                            value={formData.poste}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${
                              errors.poste
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                            placeholder="Titre d'emploi"
                          />
                          {errors.poste && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.poste}
                            </p>
                          )}
                        </div>

                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Type de contrat
                            </label>
                            <div className="flex space-x-2">
                              <label
                                className={`flex-1 flex items-center justify-center py-2 px-3 border ${
                                  formData.type_contrat === "CDI"
                                    ? "bg-pink-50 border-pink-300 text-pink-700"
                                    : "border-gray-300 text-gray-700"
                                } rounded-lg cursor-pointer hover:bg-pink-50 transition-all duration-200`}
                              >
                                <input
                                  type="radio"
                                  name="type_contrat"
                                  value="CDI"
                                  checked={formData.type_contrat === "CDI"}
                                  onChange={handleChange}
                                  className="sr-only"
                                />
                                <span>CDI</span>
                              </label>

                              <label
                                className={`flex-1 flex items-center justify-center py-2 px-3 border ${
                                  formData.type_contrat === "CDD"
                                    ? "bg-pink-50 border-pink-300 text-pink-700"
                                    : "border-gray-300 text-gray-700"
                                } rounded-lg cursor-pointer hover:bg-pink-50 transition-all duration-200`}
                              >
                                <input
                                  type="radio"
                                  name="type_contrat"
                                  value="CDD"
                                  checked={formData.type_contrat === "CDD"}
                                  onChange={handleChange}
                                  className="sr-only"
                                />
                                <span>CDD</span>
                              </label>
                            </div>
                            {errors.type_contrat && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.type_contrat}
                              </p>
                            )}
                          </div>

                          <div className="flex-1">
                            <label
                              className={`block text-sm font-medium ${
                                errors.status ? "text-red-500" : "text-gray-700"
                              } mb-1`}
                            >
                              Status
                            </label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className={`block w-full px-4 py-2 border ${
                                errors.status
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg appearance-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                            {errors.status && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.status}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2">
                    <div className="group relative bg-white rounded-lg p-4 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-inner">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-3 text-lg font-medium text-gray-800">
                          Compensation
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label
                            className={`block text-sm font-medium ${
                              errors.salaire ? "text-red-500" : "text-gray-700"
                            } mb-1`}
                          >
                            Salaire
                          </label>
                          <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                DH
                              </span>
                            </div>
                            <input
                              type="number"
                              name="salaire"
                              value={formData.salaire}
                              onChange={handleChange}
                              step="100"
                              className={`w-full pl-10 pr-12 py-2 border ${
                                errors.salaire
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                              placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                /mois
                              </span>
                            </div>
                          </div>
                          {errors.salaire && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.salaire}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Salaire Range
                          </label>
                          <div className="px-2">
                            <input
                              type="range"
                              min="1500"
                              max="30000"
                              step="100"
                              name="salaire"
                              value={formData.salaire || 1500}
                              onChange={handleChange}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>1,500 DH</span>
                              <span>30,000 DH</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-500">
                              Total annuel :
                            </span>
                            <span className="font-bold text-gray-800">
                              {formData.salaire
                                ? (
                                    parseFloat(formData.salaire) * 12
                                  ).toLocaleString("fr-FR")
                                : "0"}
                              DH
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
            {activeTab === "admin" && (
              <div className="space-y-6 transition-all duration-500 ease-in-out">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div className="group relative bg-white rounded-lg p-4 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-400 to-blue-500 text-white shadow-inner">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-3 text-lg font-medium text-gray-800">
                          Département & Rôle
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label
                            className={`block text-sm font-medium ${
                              errors.departement_id
                                ? "text-red-500"
                                : "text-gray-700"
                            } mb-1`}
                          >
                            Departement
                          </label>
                          <div>
                            <select
                              name="departement_id"
                              value={formData.departement_id}
                              onChange={handleChange}
                              className={`block w-full px-4 py-2 border ${
                                errors.departement_id
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            >
                              {departements.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                  {dept.nom}
                                </option>
                              ))}
                            </select>
                          </div>
                          {errors.departement_id && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.departement_id}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rôle
                          </label>
                          <div className="relative">
                            <select
                              name="role"
                              value={formData.role}
                              onChange={handleChange}
                              className={`block w-full px-4 py-2 border ${
                                errors.role
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            >
                              <option value="rh">RH</option>
                              <option value="employe">Employé</option>
                              <option value="manager">Manager</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2">
                    <div className="group relative bg-white rounded-lg p-4 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-400 to-blue-500 text-white shadow-inner">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-3 text-lg font-medium text-gray-800">
                          Accès & sécurité
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label
                            className={`block text-sm font-medium ${
                              errors.password ? "text-red-500" : "text-gray-700"
                            } mb-1`}
                          >
                            Mot de passe
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border ${
                                errors.password
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                              placeholder="Définir un mot de passe sécurisé"
                            />
                            {errors.password && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label
                            className={`block text-sm font-medium ${
                              errors.password ? "text-red-500" : "text-gray-700"
                            } mb-1`}
                          >
                            Confirmer Mot de passe
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              name="password_confirmation"
                              value={formData.password_confirmation}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border ${
                                errors.password
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                              placeholder="Confirmez le mot de passe"
                            />
                          </div>
                          {formData.password &&
                            formData.password_confirmation &&
                            formData.password !==
                              formData.password_confirmation && (
                              <p className="mt-1 text-sm text-red-500">
                                Les mots de passe ne correspondent pas
                              </p>
                            )}
                        </div>

                        <div>
                          <label
                            className={`block text-sm font-medium ${
                              errors.joures_conges_restant
                                ? "text-red-500"
                                : "text-gray-700"
                            } mb-1`}
                          >
                            Jours de congés restants
                          </label>
                          <div className="px-2">
                            <input
                              type="range"
                              min="0"
                              max="18"
                              step="1"
                              name="joures_conges_restant"
                              value={formData.joures_conges_restant}
                              onChange={handleChange}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>0 jours</span>
                              <span
                                className={`font-medium ${
                                  errors.joures_conges_restant
                                    ? "text-red-500"
                                    : "text-indigo-600"
                                } text-center`}
                              >
                                {formData.joures_conges_restant} jours
                              </span>
                              <span>18 jours</span>
                            </div>
                            {errors.joures_conges_restant && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.joures_conges_restant}
                              </p>
                            )}
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
                {activeTab !== "personal" && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        activeTab === "employment" ? "personal" : "employment"
                      )
                    }
                    className="px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Précédent
                    </span>
                  </button>
                )}

                {activeTab !== "admin" && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        activeTab === "personal" ? "employment" : "admin"
                      )
                    }
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="flex items-center">
                      Suivant
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </button>
                )}
              </div>

              {activeTab === "admin" && (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Soumettre la creation
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

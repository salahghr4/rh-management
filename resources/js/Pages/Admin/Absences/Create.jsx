import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { DatePicker, message, Select } from "antd";
import { User } from "lucide-react";
import { useState } from "react";

export default function Create({ auth, employes }) {
  const [formData, setFormData] = useState({
    date_absence: "",
    type: "maladie",
    employe_id: "",
    justificatif: "non",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("admin.absences.store"), formData, {
      onSuccess: () => {
        setFormData({
          date_absence: "",
          type: "maladie",
          employe_id: "",
          justificatif: "non",
        });
        message.success("Absence créée avec succès !");
      },
    });
  };

  const { errors } = usePage().props;

  return (
    <>
      <AuthenticatedLayout user={auth.user}>
        <Head title="Créer une Absence" />
        <div className="w-[90%] mx-auto p-6 flex items-center justify-center">
          <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="bg-blue-500 lg:w-1/3 p-8 text-white">
                <h2 className="text-3xl font-bold mb-6">Créer une Absence</h2>
                <p className="text-indigo-200 mb-6">
                  Remplissez le formulaire pour enregistrer une absence.
                </p>
              </div>
              <div className="p-8 lg:w-2/3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="w-full">
                    <label
                      className={`block text-sm font-medium ${
                        errors.date_absence ? "text-red-500" : "text-gray-700"
                      } mb-3`}
                    >
                      Date d'Absence <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                      onChange={(date) => {
                        if (date) {
                          setFormData((prevState) => ({
                            ...prevState,
                            date_absence: date.format("YYYY-MM-DD"),
                          }));
                        }
                      }}
                      placeholder="Sélectionnez une date"
                      className="w-full rounded-lg border-gray-200 shadow-sm p-3 focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.date_absence && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.date_absence}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="type"
                        className={`block text-sm font-medium ${
                          errors.type ? "text-red-500" : "text-gray-700"
                        } mb-1`}
                      >
                        Type <span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={[
                          { label: "Maladie", value: "maladie" },
                          { label: "Congé", value: "congé" },
                          { label: "Personnel", value: "personnel" },
                        ]}
                        value={formData.type}
                        onChange={(value) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            type: value,
                          }));
                        }}
                        className="w-full h-12"
                        status={errors.type ? "error" : ""}
                        placeholder="Sélectionnez un type"
                      />
                      {errors.type && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.type}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="employe_id"
                        className={`block text-sm font-medium ${
                          errors.employe_id ? "text-red-500" : "text-gray-700"
                        } mb-1`}
                      >
                        Employé <span className="text-red-500">*</span>
                      </label>
                      <Select
                        showSearch
                        optionFilterProp="search"
                        options={employes.map((e) => ({
                          label: (
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>
                                {e.nom} {e.prenom}
                              </span>
                            </div>
                          ),
                          value: e.id,
                          search: `${e.nom}${e.prenom}`,
                        }))}
                        className="w-full h-12 "
                        onChange={(value) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            employe_id: value,
                          }));
                        }}
                        placeholder="Sélectionnez un employé"
                        status={errors.employe_id ? "error" : ""}
                      />
                      {errors.employe_id && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.employe_id}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="justificatif"
                      className={`block text-sm font-medium ${
                        errors.justificatif ? "text-red-500" : "text-gray-700"
                      } mb-1`}
                    >
                      Justificatif <span className="text-red-500">*</span>
                    </label>
                    <Select
                      options={[
                        { label: "Oui", value: "oui" },
                        { label: "Non", value: "non" },
                      ]}
                      value={formData.justificatif}
                      onChange={(value) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          justificatif: value,
                        }));
                      }}
                      className="w-full h-12"
                      status={errors.justificatif ? "error" : ""}
                      placeholder="Sélectionnez un justificatif"
                    />
                    {errors.justificatif && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.justificatif}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                      onClick={() => router.get(route("admin.absences.index"))}
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

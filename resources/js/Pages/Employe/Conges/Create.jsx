import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { DatePicker } from "antd";
import { useState } from "react";

export default function Create({ auth, types }) {
  const [formData, setFormData] = useState({
    date_debut: "",
    date_fin: "",
    type: "congé",
    commentaire: "",
  });
  console.log(formData);

  const { RangePicker } = DatePicker;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("employe.conges.store"), formData, {
      onSuccess: () => {
        setFormData({
          date_debut: "",
          date_fin: "",
          type: "autre",
          commentaire: "",
        });
      },
      onError: (errors) => {
        console.error("Error creating employee record:", errors);
      },
    });
  };

  const { errors } = usePage().props;

  return (
    <>
      <AuthenticatedLayout user={auth.user}>
        <Head title="Demander un congé" />
        <div className="w-[90%] mx-auto p-6 flex items-center justify-center">
          <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="bg-blue-500 lg:w-1/3 p-8 text-white">
                <h2 className="text-3xl font-bold mb-6">Demande un Congé</h2>
                <p className="text-indigo-200 mb-6">
                  Remplissez le formulaire pour soumettre une demande de congé.
                </p>
              </div>
              <div className="p-8 lg:w-2/3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="w-full">
                    <label
                      className={`block text-sm font-medium ${
                        errors.date_debut ? "text-red-500" : "text-gray-700"
                      } mb-3`}
                    >
                      Date de Début <span className="text-red-500">*</span>
                    </label>

                    <RangePicker
                      onChange={(date) => {
                        if (date) {
                          setFormData((prevState) => ({
                            ...prevState,
                            date_debut: date[0].format("YYYY-MM-DD"),
                            date_fin: date[1].format("YYYY-MM-DD"),
                          }));
                        }
                      }}
                      placeholder={["Date Début", "Date Fin"]}
                      className="w-full rounded-lg border-gray-200 shadow-sm p-3 focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.date_debut && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.date_debut}
                      </p>
                    )}
                    {errors.date_fin && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.date_fin}
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
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={`w-full rounded-lg border ${
                          errors.type ? "border-red-500" : "border-gray-200"
                        } shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      >
                        {types.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      {errors.type && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.type}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="commentaire"
                      className={`text-sm font-medium ${
                        errors.commentaire ? "text-red-500" : "text-gray-700"
                      } mb-1`}
                    >
                      Commentaire
                    </label>
                    <textarea
                      id="commentaire"
                      name="commentaire"
                      value={formData.commentaire}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full rounded-lg border ${
                        errors.commentaire
                          ? "border-red-500"
                          : "border-gray-200"
                      } shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Ajoutez des commentaires ou des notes supplémentaires"
                    ></textarea>
                    {errors.commentaire && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.commentaire}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                      onClick={() => router.get(route("employe.conges.index"))}
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

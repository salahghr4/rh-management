import React from 'react';

export default function Informations({ employe = {} }) {
    // Default employee data for demo
    const defaultEmploye = {
        poste: "Développeur Full Stack",
        departement: { nom: "Technologie" },
        salaire: "75,000 €",
        date_embauche: "15/03/2023",
        type_contrat: "CDI",
        status: "Actif",
        telephone: "+33 1 23 45 67 89",
        adresse: "123 Rue de la République, 75001 Paris"
    };

    const employeeData = { ...defaultEmploye, ...employe };

    const infoItems = [
        { label: "Post", value: employeeData.poste, icon: "💼" },
        { label: "Département", value: employeeData.departement?.nom, icon: "🏢" },
        { label: "Salaire", value: employeeData.salaire, icon: "💰" },
        { label: "Date d'embauche", value: employeeData.date_embauche, icon: "📅" },
        { label: "Contrat", value: employeeData.type_contrat, icon: "📋" },
        { label: "Statut", value: employeeData.status, icon: "✅" },
        { label: "Téléphone", value: employeeData.telephone, icon: "📞" },
        { label: "Adresse", value: employeeData.adresse, icon: "📍" }
    ];

    return (
        <div className="">
            <div className=" mx-auto">
                <section className=" border border-gray-100 rounded-xl  overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                👤
                            </div>
                            Informations personnelles
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {infoItems.map((item, index) => (
                                <div key={index} className="group hover:bg-gray-50 rounded-lg p-4 transition-all duration-200 border border-transparent hover:border-blue-100">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-lg group-hover:bg-blue-100 transition-colors duration-200">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <dt className="text-sm font-medium text-gray-600 mb-1">
                                                {item.label}
                                            </dt>
                                            <dd className="text-lg font-semibold text-gray-900 break-words">
                                                {item.value || 'Non renseigné'}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer accent */}
                    <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-700"></div>
                </section>
            </div>
        </div>
    );
}
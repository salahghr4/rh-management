import React from 'react';

export default function Informations({ employe }) {

    const infoItems = [
        { label: "Post", value: employe.poste, icon: "💼" },
        { label: "Département", value: employe.departement?.nom, icon: "🏢" },
        { label: "Salaire", value: employe.salaire + " DH", icon: "💰" },
        { label: "Date d'embauche", value: employe.date_embauche, icon: "📅" },
        { label: "Contrat", value: employe.type_contrat, icon: "📋" },
        { label: "Statut", value: employe.status, icon: "✅" },
        { label: "Téléphone", value: employe.telephone, icon: "📞" },
        { label: "Adresse", value: employe.adresse, icon: "📍" }
    ];

    return (
        <div className="">
            <div className=" mx-auto">
                <section className=" rounded-xl  overflow-hidden">
                    {/* Header */}
                    <div className="pb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                👤
                            </div>
                            Informations personnelles
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="">
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

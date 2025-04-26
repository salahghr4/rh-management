import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
  ArrowLeft,
  Edit,
  User,
  Mail,
  Phone,
  Home,
  Briefcase,
  Building2,
  Calendar,
  DollarSign,
  Clock,
  CalendarDays,
  FileText,
} from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Show = ({ auth, employe }) => {
  const getBadgeColor = (status) => {
    return status === "actif"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  };

  const getContractBadgeColor = (type) => {
    return type === "CDI"
      ? "px-4 bg-indigo-100 text-indigo-600"
      : "bg-sky-100 text-sky-600";
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-600";
      case "rh":
        return "bg-indigo-100 text-indigo-600";
      case "manager":
        return "bg-cyan-100 text-cyan-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getAnciennete = (date) => {
    const dateEmb = new Date(date);
    const today = new Date();

    let years = today.getFullYear() - dateEmb.getFullYear();
    let months = today.getMonth() - dateEmb.getMonth();
    let days = today.getDate() - dateEmb.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // récupère les jours du mois précédent
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years <= 0 && months <= 0 && days <= 0) {
      return "Aujourd'hui";
    }

    if (years <= 0 && months <= 0 && days > 0) {
      return `${days} jour${days > 1 ? "s" : ""}`;
    }

    if (years <= 0 && months > 0) {
      return `${months} mois`;
    }

    if (months === 0) {
      return `${years} an${years > 1 ? "s" : ""}`;
    }

    return `${years} an${years > 1 ? "s" : ""} et ${months} mois`;
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`${employe.prenom} ${employe.nom} | Profile`} />

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center space-x-3">
          <Link
            href={route("admin.employes.index")}
            className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Retour
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Profile header */}
          <div className="flex items-center relative bg-gradient-to-r from-indigo-600 to-blue-500 h-48">
            <div className="ml-5 flex items-center">
              <div className="h-32 w-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                <User className="h-20 w-20 text-gray-400" />
              </div>
              <div className="ml-6 text-white">
                <h1 className="text-2xl font-bold">
                  {employe.nom} {employe.prenom}
                </h1>
                <div className="flex gap-2 mt-2">
                  <span
                    className={`px-4 py-1 text-sm font-bold rounded-full ${getRoleBadgeColor(
                      employe.role
                    )}`}
                  >
                    {employe.role === "admin"
                      ? "Admin"
                      : employe.role === "rh"
                      ? "RH"
                      : employe.role === "manager"
                      ? "Manager"
                      : "Employé"}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Link
                href={route("admin.employes.edit", employe.id)}
                className="bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-full flex items-center text-sm font-medium shadow"
              >
                <Edit className="h-4 w-4 mr-2" /> Modifier
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 pb-12 pt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Détails de l'employé
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: employe.email,
                    },
                    {
                      icon: Phone,
                      label: "Téléphone",
                      value: employe.telephone,
                    },
                    {
                      icon: Home,
                      label: "Adresse",
                      value: employe.adresse,
                    },
                    {
                      icon: Briefcase,
                      label: "Poste",
                      value: employe.poste,
                    },
                    {
                      icon: Building2,
                      label: "Département",
                      value: employe.departement?.nom || "Non assigné",
                    },
                    {
                      icon: Calendar,
                      label: "Date d'embauche",
                      value: new Date(employe.date_embauche).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      ),
                    },
                    {
                      icon: DollarSign,
                      label: "Salaire",
                      value: `${employe.salaire} DH`,
                    },
                    {
                      icon: Clock,
                      label: "Jours de congé restants",
                      value: `${employe.joures_conges_restant} jours`,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <item.icon className="h-5 w-5 text-indigo-500 mt-1" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {item.label}
                        </div>
                        <div className="text-base font-medium text-gray-800">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Statistiques
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Ancienneté</span>
                    <span
                      className={`px-3 py-1 text-sm font-bold rounded-full bg-blue-100 text-blue-600`}
                    >
                      {getAnciennete(employe.date_embauche)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Contrat</span>
                    <span
                      className={`px-3 py-1 text-sm font-bold rounded-full ${getContractBadgeColor(
                        employe.type_contrat
                      )}`}
                    >
                      {employe.type_contrat}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Statut</span>
                    <span
                      className={`px-3 py-1 text-sm font-bold rounded-full ${getBadgeColor(
                        employe.status
                      )}`}
                    >
                      {employe.status === "actif" ? "Actif" : "Inactif"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Actions rapides
                </h3>
                <div className="space-y-4">
                  <Link
                    href={route("admin.employes.edit", employe.id)}
                    className="w-full flex justify-center items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg text-sm"
                  >
                    <Edit className="h-4 w-4" /> Modifier
                  </Link>
                  <Link
                    href="#"
                    className="w-full flex justify-center items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg text-sm"
                  >
                    <CalendarDays className="h-4 w-4" /> Historique congés
                  </Link>
                  <Link
                    href="#"
                    className="w-full flex justify-center items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg text-sm"
                  >
                    <FileText className="h-4 w-4" /> Fiches de paie
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;

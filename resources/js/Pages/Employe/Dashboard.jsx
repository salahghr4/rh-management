import Chart from "@/Components/Chart";
import EmployeeCalendar from "@/Components/EmployeeCalendar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Table } from "antd";
import { CalendarX, Clock, Plane, Users } from "lucide-react";
import "react-calendar/dist/Calendar.css";

export default function Dashboard({
  auth,
  employees,
  totalEmployes,
  demandeConges,
  joursConge,
  joursAbsence,
  paisParMois,
  absences,
}) {
  const departementFilters = [
    ...new Set(employees.map((emp) => emp.departement)),
  ].map((dep) => ({
    text: dep,
    value: dep,
  }));

  const posteFilters = [...new Set(employees.map((emp) => emp.poste))].map(
    (poste) => ({
      text: poste,
      value: poste,
    })
  );

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
      sorter: (a, b) => a.nom.localeCompare(b.nom),
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
      sorter: (a, b) => a.prenom.localeCompare(b.prenom),
    },
    {
      title: "Poste",
      dataIndex: "poste",
      key: "poste",
      filters: posteFilters,
      onFilter: (value, record) => record.poste === value,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "departement",
      dataIndex: "departement",
      key: "departement",
      filters: departementFilters,
      onFilter: (value, record) => record.departement === value,
    },
  ];

  const dataSource = employees.map((e) => ({
    key: e.id,
    nom: e.nom,
    prenom: e.prenom,
    poste: e.poste,
    email: e.email,
    departement: e.departement,
  }));

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <h2 className="text-2xl m-3 font-bold text-gray-800 animate-fade-in dark:text-white">
        Bonjour,{" "}
        <span className="text-blue-600">
          {auth.user.nom} {auth.user.prenom}
        </span>{" "}
        👋
      </h2>

      <div className="grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Total Employeés
            </h3>
            <p className="text-3xl font-bold text-blue-900 dark:text-white">
              {totalEmployes}
            </p>
          </div>
          <Users className="w-12 h-12 text-blue-500" />
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Demande de congés
            </h3>
            <p className="text-3xl font-bold text-red-900 dark:text-white">
              {demandeConges}
            </p>
          </div>
          <Plane className="w-12 h-12 text-red-500" />
        </div>

        {/* Total Customers */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Jours restants de congés
            </h3>
            <p className="text-3xl font-bold text-yellow-900 dark:text-white">
              {joursConge}
            </p>
          </div>
          <Clock className="w-12 h-12 text-yellow-500" />
        </div>

        {/* Traffic Analytics */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Jours des absence par Mois
            </h3>
            <p className="text-3xl font-bold text-green-900 dark:text-white">
              {joursAbsence}
            </p>
          </div>
          <CalendarX className="w-12 h-12 text-green-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 dark:bg-black">
        {/* Traffic Chart */}
        <div className="bg-white p-6  overflow-hidden  shadow-sm sm:rounded-lg dark:bg-gray-800">
          <h1 className="text-xl mb-8 text-center">Salaire Par Mois</h1>
          <Chart
            type={"bar"}
            data={{
              labels: paisParMois.map((item) =>
                new Date(item.date).toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })
              ),
              datasets: [
                {
                  label: "Salaire (DH)",
                  data: paisParMois.map((item) => parseFloat(item.montant)),
                  backgroundColor: "#4F46E5",
                  // barThickness: 40,
                },
                {
                  label: "Prime (DH)",
                  data: paisParMois.map((item) =>
                    item.prime ? parseFloat(item.prime) : 0
                  ),
                  backgroundColor: "#ff1a02",
                  // barThickness: 40,
                },
              ],
            }}
          />
        </div>

        {/* Sales Chart */}
        <div className="bg-white p-6 overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800  ">
          <h3 className="text-xl mb-4 text-center">Absence Calendar</h3>
          <EmployeeCalendar absences={absences} />
        </div>
      </div>
      <div className="bg-white mt-5 shadow-sm sm:rounded-lg dark:bg-gray-800 w-['80%']">
        <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
          <h2 className="font-bold text-lg">Employées</h2>
          <Link
            href={route("employe.employes.index")}
            className="underline text-blue-500"
          >
            Afficher Tous
          </Link>
        </div>
        <div className="overflow-x-auto">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

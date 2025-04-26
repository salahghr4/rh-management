import Chart from "@/Components/Chart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Table, Tag } from "antd";
import { Building, Plane, UserMinus, Users } from "lucide-react";


export default function Dashboard({
  auth,
  totalEmployes,
  demandeConges,
  totalAbsence,
  departementCount,
  departmentWithEmployees,
  absenceTypes,
  employees,
}) {
  // Ensure department data is properly structured
  const departmentData = Array.isArray(departmentWithEmployees)
    ? departmentWithEmployees.map((dept) => ({
        label: dept.nom,
        count: dept.users_count,
      }))
    : [];
  // console.log("departmentData:", departmentData);
  const departmentLabels = departmentData.map((d) => d.label) || ["No Data"];
  const departmentEmployeeCounts = departmentData.map((d) => d.count) || [0];

  // Ensure absence type data is properly structured
  const absenceTypeData = Array.isArray(absenceTypes)
    ? absenceTypes.map((type) => ({
        label: type.type,
        count: type.total,
      }))
    : [];

  const absenceTypeLabels = absenceTypeData.map((a) => a.label) || ["No Data"];
  const absenceTypeCounts = absenceTypeData.map((a) => a.count) || [0];

  const departementFilters = [
    ...new Set(employees.map((emp) => emp.departement?.nom)),
  ]
    .filter(Boolean)
    .map((depNom) => ({
      text: depNom,
      value: depNom,
    }));

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
      sorter: (a, b) => a.nom.localeCompare(b.nom),
    },
    {
      title: "Prenom",
      dataIndex: "prenom",
      key: "prenom",
      sorter: (a, b) => a.prenom.localeCompare(b.prenom),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Poste",
      dataIndex: "poste",
      key: "poste",
      sorter: (a, b) => a.poste.localeCompare(b.poste),
    },
    {
      title: "Departement",
      dataIndex: "departement",
      key: "departement",
      filters: departementFilters,
      onFilter: (value, record) => record.departement === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Actif",
          value: "actif",
        },
        {
          text: "Inactif",
          value: "inactif",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      render: (status) => (
        <Tag color={status === "actif" ? "green" : "red"}>{status}</Tag>
      ),
    },

    {
      title: "Date embauche",
      dataIndex: "date_embauche",
      key: "date_embauche",

      sorter: (a, b) => a.date_embauche.localeCompare(b.date_embauche),
    },

    {
      title: "Salaire",
      dataIndex: "salaire",
      key: "salaire",
      sorter: (a, b) => a.salaire.localeCompare(b.salaire),
    },

    {
      title: "Telephone",
      dataIndex: "telephone",
      key: "telephone",
      sorter: (a, b) => a.telephone.localeCompare(b.telephone),
    },
    {
      title: "Type contrat",
      dataIndex: "type_contrat",
      key: "type_contrat",
      sorter: (a, b) => a.type_contrat.localeCompare(b.type_contrat),
      render: (type_contrat) => (
        <Tag
          color={type_contrat === "CDD" ? "blue" : "purple"}
          title={
            type_contrat === "CDD"
              ? "Contrat à durée déterminée"
              : "Contrat à durée indéterminée"
          }
        >
          {type_contrat}
        </Tag>
      ),
    },
    {
      title: "Adresse",
      dataIndex: "adresse",
      key: "adresse",
      sorter: (a, b) => a.adresse.localeCompare(b.adresse),
      render: (adresse) => (
        <div className="w-20">
          <p className="text-ellipsis truncate overflow-hidden">{adresse}</p>
        </div>
      ),
    },
    {
      title: "Joures conges restant",
      dataIndex: "joures_conges_restant",
      key: "joures_conges_restant",
      sorter: (a, b) =>
        a.joures_conges_restant.localeCompare(b.joures_conges_restant),
    },
  ];

  const data = employees.map((employee) => ({
    key: employee.id,
    nom: employee.nom,
    prenom: employee.prenom,
    email: employee.email,
    role: employee.role,
    status: employee.status,
    adresse: employee.adresse,
    date_embauche: employee.date_embauche,
    departement: employee.departement.nom,
    joures_conges_restant: employee.joures_conges_restant,
    poste: employee.poste,
    salaire: employee.salaire,
    telephone: employee.telephone,
    type_contrat: employee.type_contrat,
  }));
  console.log("data:", data);
  console.log("columns:", columns);
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

      <div className="grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Total Employeés
            </h3>
            <p className="text-3xl font-bold text-blue-900 dark:text-white">
              {totalEmployes}
            </p>
          </div>
          <Users className="w-12 h-12 text-yellow-500" />
        </div>

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

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Total Absences
            </h3>
            <p className="text-3xl font-bold text-yellow-900 dark:text-white">
              {totalAbsence}
            </p>
          </div>
          <UserMinus className="w-12 h-12 text-blue-500" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Nombre de département
            </h3>
            <p className="text-3xl font-bold text-green-900 dark:text-white">
              {departementCount}
            </p>
          </div>
          <Building className="w-12 h-12 text-green-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-black">
        <div className="bg-white p-6 overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
          <h2 className="text-center text-2xl mb-5 font-bold">
            Total employés par departement
          </h2>
          <Chart
            type="pie"
            data={{
              labels: departmentLabels,
              datasets: [
                {
                  label: "Employés par département",
                  data: departmentEmployeeCounts,
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                  ],
                },
              ],
            }}
          />
        </div>

        <div className="bg-white p-6 overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
          <h2 className="text-center text-2xl mb-5 font-bold">
            Total absences par departement
          </h2>

          <Chart
            type="pie"
            data={{
              labels: absenceTypeLabels,
              datasets: [
                {
                  label: "Absences par type",
                  data: absenceTypeCounts,
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
      <div className="bg-white mt-5 overflow-auto shadow-sm sm:rounded-lg dark:bg-gray-800 w-['80%']">
        <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
          <h2 className="font-bold text-lg">Employées</h2>
          <Link
            href={route("admin.employes.index")}
            className="underline text-blue-500"
          >
            Afficher Tous
          </Link>
        </div>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => {
            router.visit(route("admin.employes.show", record.key));
          },
        })}
        rowClassName="cursor-pointer"
      />
    </AuthenticatedLayout>
  );
}

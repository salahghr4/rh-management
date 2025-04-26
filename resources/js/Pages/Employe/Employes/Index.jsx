import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Table } from "antd";

const Index = ({ auth, employes }) => {
  const departementFilters = [
    ...new Set(employes.map((emp) => emp.departement)),
  ].map((dep) => ({
    text: dep,
    value: dep,
  }));

  const posteFilters = [...new Set(employes.map((emp) => emp.poste))].map(
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Poste",
      dataIndex: "poste",
      key: "poste",
      filters: posteFilters,
      onFilter: (value, record) => record.poste === value,
    },
    {
      title: "departement",
      dataIndex: "departement",
      key: "departement",
      filters: departementFilters,
      onFilter: (value, record) => record.departement === value,
    },
  ];

  const dataSource = employes.map((e) => ({
    key: e.id,
    nom: e.nom,
    prenom: e.prenom,
    poste: e.poste,
    email: e.email,
    departement: e.departement,
  }));

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Employés" />
      <div className="bg-white mt-5 overflow-auto shadow-sm sm:rounded-lg dark:bg-gray-800 w-['80%']">
        <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
          <h2 className="font-bold text-lg">Employées</h2>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;

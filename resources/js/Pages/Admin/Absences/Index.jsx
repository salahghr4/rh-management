import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Button, Modal, Space, Table, Tag } from "antd";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

const Index = ({ auth, absences }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState(null);

  const handleDelete = () => {
    router.delete(route("admin.absences.destroy", selectedAbsence.key), {
      onSuccess: () => {
        setShowDeleteModal(false);
        setSelectedAbsence(null);
      },
    });
  };
  const ShowDeleteModal = (record) => {
    setSelectedAbsence(record);
    setShowDeleteModal(true);
  };

  const columns = [
    {
      title: "Employé",
      dataIndex: "employe",
      key: "employe",
      sorter: (a, b) => a.nom.localeCompare(b.nom),
      filters: absences
        .map((absence) => ({
          text: `${absence.employe.nom} ${absence.employe.prenom}`,
          value: absence.employe.id,
        }))
        .filter(
          (value, index, self) =>
            self.findIndex((v) => v.value === value.value) === index
        ),
      onFilter: (value, record) => record.employe_id === value,
      render: (employe, record) => (
        <Link
          href={route("admin.employes.show", record.employe_id)}
          className="underline text-blue-500"
        >
          {employe}
        </Link>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Congé", value: "congé" },
        { text: "Maladie", value: "maladie" },
        { text: "Personnel", value: "personnel" },
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      render: (type) => (
        <Tag
          color={
            type === "congé" ? "green" : type === "maladie" ? "gold" : "blue"
          }
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Date absence",
      dataIndex: "date_absence",
      key: "date_absence",
      sorter: (a, b) => new Date(a.date_absence) - new Date(b.date_absence),
    },
    {
      title: "Justificatif",
      dataIndex: "justificatif",
      key: "justificatif",
      filters: [
        { text: "Justifié", value: "Justifié" },
        { text: "Non justifié", value: "Non justifié" },
      ],
      onFilter: (value, record) => record.justificatif.startsWith(value),
      render: (justificatif) => (
        <Tag color={justificatif === "Justifié" ? "green" : "red"}>
          {justificatif}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            className="text-blue-500 me-2 z-10 hover:text-blue-700"
            onClick={() =>
              router.visit(route("admin.absences.edit", record.key))
            }
            title="Éditer"
          >
            <Edit size={20} color="orange" />
          </Button>
          <Button
            className="text-blue-500 me-2 z-10 hover:text-blue-700"
            onClick={() => ShowDeleteModal(record)}
            title="Supprimer"
          >
            <Trash size={20} color="red" />
          </Button>
        </Space>
      ),
    },
  ];

  const data = absences.map((absence) => ({
    key: absence.id,
    date_absence: absence.date_absence,
    employe_id: absence.employe.id,
    employe: `${absence.employe.nom} ${absence.employe.prenom}`,
    justificatif: absence.justificatif === "oui" ? "Justifié" : "Non justifié",
    type: absence.type,
  }));

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Historique des paiements" />
      <div className="bg-white mt-5 shadow-sm sm:rounded-lg dark:bg-gray-800 w-['80%']">
        <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
          <h2 className="font-bold text-lg">Litse des absences</h2>
          <div className="flex gap-2">
            <Button
              type="primary"
              className="bg-blue-500 hover:bg-blue-600 p-4"
              onClick={() => router.visit(route("admin.absences.create"))}
            >
              Ajouter Absence
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirmer la suppression"
        open={showDeleteModal}
        centered
        onOk={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        okText="Supprimer"
        cancelText="Annuler"
        okButtonProps={{ danger: true }}
      >
        <p>Êtes-vous sûr de vouloir supprimer ce absence ?</p>
      </Modal>
    </AuthenticatedLayout>
  );
};
export default Index;

import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Table, Button, Space, Modal, Input, message } from "antd";
import { Edit, Trash } from "lucide-react";

export default function Index({ auth, departements }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDepartement, setSelectedDepartement] = useState(null);
  const [departementName, setDepartementName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showAddModal = () => {
    setIsEditMode(false);
    setDepartementName("");
    setIsModalOpen(true);
  };

  const showEditModal = (record) => {
    setIsEditMode(true);
    setSelectedDepartement(record);
    setDepartementName(record.nom);
    setIsModalOpen(true);
  };

  const showDeleteModal = (record) => {
    setSelectedDepartement(record);
    setIsDeleteModalOpen(true);
  };

  const handleAddOrEdit = () => {
    if (departementName.trim() === "") {
      message.error("Le nom du département est requis.");
      return;
    }
    if (isEditMode) {
      router.put(route("admin.departements.update", selectedDepartement.key), {
        nom: departementName,
      });
      message.success("Département modifié avec succès!");
    } else {
      router.post(route("admin.departements.store"), { nom: departementName });
      message.success("Département ajouté avec succès!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    router.delete(route("admin.departements.destroy", selectedDepartement.key));
    message.success("Département supprimé avec succès!");
    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
      sorter: (a, b) => a.nom.localeCompare(b.nom),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            className="text-blue-500 me-2 z-10 hover:text-blue-700"
            onClick={() => showEditModal(record)}
            title="Éditer"
          >
            <Edit size={20} color="orange" />
          </Button>
          <Button
            className="text-blue-500 me-2 z-10 hover:text-blue-700"
            onClick={() => showDeleteModal(record)}
            title="Supprimer"
          >
            <Trash size={20} color="red" />
          </Button>
        </Space>
      ),
    },
  ];

  const data = departements.map((departement) => ({
    key: departement.id,
    nom: departement.nom,
  }));

  return (
    <>
      <AuthenticatedLayout user={auth.user}>
        <Head title="Départements" />
        <div className="bg-white mt-5 overflow-auto shadow-sm sm:rounded-lg dark:bg-gray-800 w-full">
          <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
            <h2 className="font-bold text-lg">Départements</h2>
            <Button
              type="primary"
              className="bg-blue-500 hover:bg-blue-600 p-4"
              onClick={showAddModal}
            >
              Ajouter Département
            </Button>
          </div>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowClassName="cursor-pointer"
          />
        </div>

        {/* Add / Edit Modal */}
        <Modal
          title={isEditMode ? "Modifier Département" : "Ajouter un Département"}
          open={isModalOpen}
          centered
          onOk={handleAddOrEdit}
          onCancel={() => setIsModalOpen(false)}
          okText={isEditMode ? "Modifier" : "Ajouter"}
          cancelText="Annuler"
        >
          <Input
            className="mt-2 rounded-lg outline-none border-2 border-gray-300 focus:border-blue-500"
            type="text"
            placeholder="Entrez un nom de département..."
            value={departementName}
            onChange={(e) => setDepartementName(e.target.value)}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Confirmer la suppression"
          open={isDeleteModalOpen}
          centered
          onOk={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText="Supprimer"
          cancelText="Annuler"
          okButtonProps={{ danger: true }}
        >
          <p>Êtes-vous sûr de vouloir supprimer ce département ?</p>
        </Modal>
      </AuthenticatedLayout>
    </>
  );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Button, Input, Modal, Space, Table, Tag } from "antd";
import { useState } from "react";

export default function Index({ auth, conges }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConge, setSelectedConge] = useState(null);
  const [actionType, setActionType] = useState("");
  const [comment, setComment] = useState("");

  const showModal = (record, type) => {
    setSelectedConge(record);
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    router.put(
      route("admin.conges.update", selectedConge.key),
      {
        statut: actionType,
        commentaire_rh: comment,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setComment("");
          setSelectedConge(null);
          setActionType("");
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setComment("");
    setSelectedConge(null);
    setActionType("");
  };

  const columns = [
    {
      title: "Employé",
      dataIndex: "employe",
      key: "employe",
      sorter: (a, b) => a.nom.localeCompare(b.nom),
      filters: conges
        .map((conge) => ({
          text: `${conge.employe.nom} ${conge.employe.prenom}`,
          value: conge.employe.id,
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
        { text: "Autre", value: "autre" },
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      render: (type) => (
        <Tag
          color={
            type === "congé" ? "purple" : type === "maladie" ? "yellow" : "blue"
          }
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Date Début",
      dataIndex: "date_debut",
      key: "date_debut",
      sorter: (a, b) => new Date(a.date_debut) - new Date(b.date_debut),
    },
    {
      title: "Date Fin",
      dataIndex: "date_fin",
      key: "date_fin",
      sorter: (a, b) => new Date(a.date_fin) - new Date(b.date_fin),
    },
    {
      title: "Durée",
      dataIndex: "duree",
      key: "duree",
      render: (_, record) => {
        const startDate = new Date(record.date_debut);
        const endDate = new Date(record.date_fin);
        const duration =
          Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        return `${duration} ${duration > 1 ? "jours" : "jour"}`;
      },
      className: "w-[90px]",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      filters: [
        { text: "Accepté", value: "accepté" },
        { text: "Refusé", value: "refusé" },
        { text: "En Attente", value: "en attente" },
      ],
      onFilter: (value, record) => record.statut.startsWith(value),
      render: (statut) => (
        <Tag
          color={
            statut === "accepté"
              ? "green"
              : statut === "refusé"
              ? "red"
              : "orange"
          }
        >
          {statut}
        </Tag>
      ),
    },
    {
      title: "Joures Congés Restant",
      dataIndex: "joures_conges_restant",
      key: "joures_conges_restant",
      sorter: (a, b) => a.joures_conges_restant - b.joures_conges_restant,
      render: (text) => `${text} ${text > 1 ? "jours" : "jour"}`,
    },
    {
      title: "Créé à",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        record.statut === "en attente" ? (
          <Space>
            <Button
              size="small"
              style={{ color: "#28a745", borderColor: "#28a745" }}
              onClick={(e) => {
                showModal(record, "accepté");
                e.stopPropagation();
              }}
            >
              Accepter
            </Button>
            <Button
              danger
              size="small"
              onClick={(e) => {
                showModal(record, "refusé");
                e.stopPropagation();
              }}
            >
              Refuser
            </Button>
          </Space>
        ) : (
          <span>Aucune action </span>
        ),
    },
  ];

  const data = conges.map((conge) => ({
    key: conge.id,
    employe: `${conge.employe.nom} ${conge.employe.prenom}`,
    employe_id: conge.employe.id,
    type: conge.type,
    date_debut: conge.date_debut,
    date_fin: conge.date_fin,
    statut: conge.statut,
    commentaire: conge.commentaire,
    commentaire_rh: conge.commentaire_rh,
    joures_conges_restant: conge.employe.joures_conges_restant,
    created_at: new Date(conge.created_at).toLocaleDateString("fr-FR"),
  }));

  return (
    <>
      <AuthenticatedLayout user={auth.user}>
        <Head title="Congés" />
        <div className="bg-white mt-5 shadow-sm sm:rounded-lg dark:bg-gray-800 w-full">
          <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
            <h2 className="font-bold text-lg">Congés</h2>
          </div>
          <div className="overflow-x-auto">
            <Table
              dataSource={data}
              columns={columns}
              pagination={{ pageSize: 10 }}
              rowClassName="cursor-pointer"
              expandable={{
                expandedRowRender: (record) => (
                  <div style={{ margin: 0 }}>
                    <p style={{ margin: 0 }}>
                      {" "}
                      <span className="font-bold">Commentaire Employé : </span>
                      {record.commentaire
                        ? record.commentaire
                        : "Aucune commentaire"}
                    </p>
                    <p style={{ margin: 0 }}>
                      {" "}
                      <span className="font-bold">Commentaire RH :</span>{" "}
                      {record.commentaire_rh
                        ? record.commentaire_rh
                        : "Aucune réponse RH"}
                    </p>
                  </div>
                ),
                rowExpandable: (record) =>
                  record.commentaire_rh !== null ||
                  record.commentaire !== undefined,
              }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    router.visit(
                      route("admin.employes.show", record.employe_id)
                    );
                  },
                };
              }}
            />
          </div>
        </div>

        <Modal
          title={`Ajouter un commentaire Pour L'employée - ${
            actionType === "accepté" ? "Accepté" : "Refusé"
          }`}
          open={isModalOpen}
          centered
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Envoyer"
          cancelText="Annuler"
        >
          <Input.TextArea
            className="mt-2"
            rows={4}
            placeholder="Entrez un commentaire RH..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Modal>
      </AuthenticatedLayout>
    </>
  );
}

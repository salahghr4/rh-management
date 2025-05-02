import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Modal, Space, Table, Tag } from "antd";
import { Head, router } from "@inertiajs/react";
import { ExclamationCircleFilled } from "@ant-design/icons";

export default function Index({ auth, conges }) {
  console.log(conges);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "voulez-vous vraiment Annuler cette demande ?",
      icon: <ExclamationCircleFilled />,
      content: "Cette action ne peut pas être annulée.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      width: 500,
      centered: true,
      onOk() {
        router.delete(route("employe.conges.destroy", id), {
          preserveScroll: true,
        });
      },
    });
  };

  const columns = [
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
      title: "Votre Commentaire",
      dataIndex: "commentaire",
      key: "commentaire",
      render: (text) =>
        text ? (
          text?.length > 50 ? (
            text.substring(0, 50) + "..."
          ) : (
            text
          )
        ) : (
          <span className="text-gray-500">Aucun commentaire</span>
        ),
    },
    {
      title: "Commentaire RH",
      dataIndex: "commentaire_rh",
      key: "commentaire_rh",
      render: (text) =>
        text ? (
          text?.length > 50 ? (
            text.substring(0, 50)
          ) : (
            text
          )
        ) : (
          <span className="text-gray-500">Aucun commentaire</span>
        ),
    },
    {
      title: "Créé à",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        record.statut === "en attente" && (
          <Space>
            <Button
              size="small"
              danger
              onClick={() => handleDelete(record.key)}
            >
              Annuler la demande
            </Button>
          </Space>
        ),
    },
  ];

  const data = conges.map((conge) => ({
    key: conge.id,
    date_debut: conge.date_debut,
    date_fin: conge.date_fin,
    type: conge.type,
    statut: conge.statut,
    joures_conges_restant: conge.employe.joures_conges_restant,
    commentaire: conge.commentaire,
    commentaire_rh: conge.commentaire_rh,
    created_at: new Date(conge.created_at).toLocaleDateString("fr-FR"),
  }));

  return (
    <>
      <AuthenticatedLayout user={auth.user}>
        <Head title="Congés" />
        <div className="bg-white mt-5 overflow-auto shadow-sm sm:rounded-lg dark:bg-gray-800 w-['80%']">
          <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
            <h2 className="font-bold text-lg">Congés</h2>
            <div className="flex gap-2">
              <Button
                type="primary"
                className="bg-blue-500 hover:bg-blue-600 p-4"
                onClick={() => router.visit(route("employe.conges.create"))}
              >
                Ajouter Congé
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table
              dataSource={data}
              columns={columns}
              pagination={{ pageSize: 10 }}
              expandable={{
                expandedRowRender: (record) => (
                  <div style={{ margin: 0 }}>
                    <p style={{ margin: 0 }}>
                      {" "}
                      <span className="font-bold">Commentaire RH :</span>{" "}
                      {record.commentaire_rh
                        ? record.commentaire_rh
                        : "Aucune réponse RH"}
                    </p>
                    <p style={{ margin: 0 }}>
                      {" "}
                      <span className="font-bold">Votre Commentaire : </span>
                      {record.commentaire
                        ? record.commentaire
                        : "Aucune commentaire"}
                    </p>
                  </div>
                ),
                rowExpandable: (record) =>
                  record.commentaire_rh !== null ||
                  record.commentaire !== undefined,
              }}
              rowClassName="cursor-pointer"
            />
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}

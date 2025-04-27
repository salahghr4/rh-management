import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Space, Table, Tag, Modal, Input } from 'antd';

export default function Index({ auth, conges }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConge, setSelectedConge] = useState(null);
  const [actionType, setActionType] = useState('');
  const [comment, setComment] = useState('');

  const showModal = (record, type) => {
    setSelectedConge(record);
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    router.put(route('admin.conges.update', selectedConge.key), {
      statut: actionType,
      commentaire_rh: comment,
    }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setComment('');
        setSelectedConge(null);
        setActionType('');
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setComment('');
    setSelectedConge(null);
    setActionType('');
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
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
        <Tag color={statut === "accepté" ? "green" : statut === "refusé" ? "red" : "orange"}>
          {statut}
        </Tag>
      ),
    },
    {
      title: "Commentaire Employé",
      dataIndex: "commentaire",
      key: "commentaire",
      render: (text) => (text?.length > 50 ? text.substring(0, 50) + "..." : text || "Aucun commentaire"),
    },
    {
      title: "Commentaire RH",
      dataIndex: "commentaire_rh",
      key: "commentaire_rh",
      render: (text) => (text?.length > 50 ? text.substring(0, 50) : "Aucune réponse RH"),
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
      render: (_, record) => (
        record.statut === 'en attente' ? (
        <Space>
          <Button
            size="small"
            style={{ color: '#28a745', borderColor: '#28a745' }}
            onClick={() => showModal(record, 'accepté')}
          >
            Accepter
          </Button>
          <Button
            danger
            size="small"
            onClick={() => showModal(record, 'refusé')}
          >
            Refuser
          </Button>
        </Space>
      ) :
      <span>Aucune action </span>
      ),
    },
  ];

  const data = conges.map((conge) => ({
    key: conge.id,
    type: conge.type,
    date_debut: conge.date_debut,
    date_fin: conge.date_fin,
    statut: conge.statut,
    commentaire: conge.commentaire,
    commentaire_rh: conge.commentaire_rh,
    created_at: new Date(conge.created_at).toLocaleDateString('fr-FR'),
  }));

  return (
    <>
      <AuthenticatedLayout user={auth.user}>
        <Head title="Congés" />
        <div className="bg-white mt-5 overflow-auto shadow-sm sm:rounded-lg dark:bg-gray-800 w-full">
          <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
            <h2 className="font-bold text-lg">Congés</h2>
          </div>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowClassName="cursor-pointer"
            expandable={{
              expandedRowRender: record => <div style={{ margin: 0 }}>
                  <p style={{ margin: 0 }}> <span className='font-bold'>Commentaire RH :</span> {record.commentaire_rh ? record.commentaire_rh : "Aucune réponse RH"}</p>
                  <p style={{ margin: 0 }}> <span className='font-bold'>Commentaire Employé : </span>{record.commentaire}</p>
                </div>,
              rowExpandable: record => record.commentaire_rh !== null || record.commentaire !== undefined,
            }}
          />
        </div>

        <Modal
          title={`Ajouter un commentaire Pour L'employée - ${actionType === 'accepté' ? 'Accepté' : 'Refusé'}`}
          open={isModalOpen}
          centered
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Envoyer"
          cancelText="Annuler"
        >
          <Input.TextArea
          className='mt-2'
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

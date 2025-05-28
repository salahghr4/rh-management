import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Button, InputNumber, Table, Tag } from "antd";
import { useState } from "react";

const Create = ({ auth, employes }) => {
  const [paies, setPaies] = useState(
    employes.map((employe) => ({
      employe_id: employe.id,
      date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
      montant: employe.salaire,
      prime: null,
    }))
  );

  console.log("Paies initiales :", paies);
  const handlePrimeChange = (value, employe_id) => {
    setPaies((prevPaies) => {
      return prevPaies.map((p) =>
        p.employe_id === employe_id ? { ...p, prime: value.toFixed(2) } : p
      );
    });
  };
  const handlePaymentLaunch = () => {
    router.post(route("admin.paies.store"), { paies: paies });
  };

  const columns = [
    {
      title: "Employé",
      dataIndex: "employe",
      key: "employe",
      sorter: (a, b) => a.employe.localeCompare(b.employe),
      filters: employes
        .map((employe) => ({
          text: `${employe.nom} ${employe.prenom}`,
          value: employe.id,
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
      title: "Date de paiement",
      dataIndex: "date_de_paiment",
      key: "date_de_paiment",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date_de_paiment) => {
        return <Tag>{date_de_paiment}</Tag>;
      },
    },
    {
      title: "Mois",
      dataIndex: "mois",
      key: "mois",
      render: (mois) => {
        return <Tag>{mois.charAt(0).toUpperCase() + mois.slice(1)}</Tag>;
      },
    },
    {
      title: "Année",
      dataIndex: "annee",
      key: "annee",
      render: (annee) => {
        return <Tag>{annee}</Tag>;
      },
    },
    {
      title: "Salaire (DH)",
      dataIndex: "montant",
      key: "montant",
      sorter: (a, b) => a.montant - b.montant,
      render: (montant) => {
        return (
          <Tag color="green" className="text-sm py-1 font-bold">
            {montant}
          </Tag>
        );
      },
    },
    {
      title: "Prime (DH)",
      dataIndex: "prime",
      key: "prime",
      sorter: (a, b) => a.prime - b.prime,
      render: (prime, record) => {
        return (
          <InputNumber
            defaultValue={prime}
            onChange={(e) => handlePrimeChange(e, record.employe_id)}
          />
        );
      },
    },
  ];

  const data = employes.map((employe) => ({
    key: employe.id,
    employe_id: employe.id,
    employe: `${employe.nom} ${employe.prenom}`,
    date_de_paiment: new Date().toLocaleDateString(),
    mois: new Date().toLocaleString("default", { month: "long" }),
    annee: new Date().getFullYear(),
    montant: employe.salaire,
    prime: null,
  }));
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Historique des paiements" />
      <div className="bg-white mt-5 shadow-sm sm:rounded-lg dark:bg-gray-800 w-['80%']">
        <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
          <h2 className="font-bold text-lg">Lancer les paiements de ce mois</h2>
        </div>
        <div className="flex flex-col px-5">
          <p className="text-gray-600 mb-4">
            Vous pouvez également ajouter une prime pour chaque employé dans le
            tablau ci-dessous.
          </p>
          <p className="text-gray-600 mb-4">
            Une fois les paiements lancés, vous ne pourrez plus les modifier.
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 100 }}
          />
        </div>
        <div className="p-5 flex justify-end">
          <Button
            className="py-5"
            color="green"
            variant="solid"
            onClick={handlePaymentLaunch}
          >
            Lancer les paiements
          </Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Table, Tag } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../../Assest/img/rhLogo.png";

const Index = ({ auth, paies, date_embauche }) => {
  console.log(paies);
  console.log(date_embauche);

  const exportPDF = (data) => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;
    img.onload = () => {
      doc.addImage(img, "PNG", 14, 10, 100, 40);

      // Title and employee info
      doc.setFontSize(12);
      doc.text("Historique des Paiements", 150, 30);
      doc.text("Employé : " + auth.user.nom + " " + auth.user.prenom, 150, 37);
      doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, 150, 44);

      // Table
      autoTable(doc, {
        head: [["Mois", "Année", "Salaire (DH)", "Prime (DH)"]],
        body: data.map((paie) => [
          paie.mois,
          paie.annee,
          paie.montant,
          paie.prime ? paie.prime : "Aucune prime",
        ]),
        startY: 60,
        styles: {
          fontSize: 13,
          cellPadding: 2,
          halign: "center",
          valign: "middle",
        },
      });

      // Footer
      doc.setFontSize(10);
      doc.text(
        "Ce document est généré à titre informatif. Veuillez contacter le département RH pour toute question relative à ce rapport.",
        14,
        doc.internal.pageSize.getHeight() - 10
      );

      doc.save("historique_paie.pdf");
    };
  };

  // display list of the years from the date_embauche to the current year
  const currentYear = new Date().getFullYear();
  const startYear = new Date(date_embauche).getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push({ text: year, value: year });
  }

  const columns = [
    {
      title: "Mois",
      dataIndex: "mois",
      key: "mois",
      filters: [
        { text: "Janvier", value: "janvier" },
        { text: "Février", value: "février" },
        { text: "Mars", value: "mars" },
        { text: "Avril", value: "avril" },
        { text: "Mai", value: "mai" },
        { text: "Juin", value: "juin" },
        { text: "Juillet", value: "juillet" },
        { text: "Août", value: "août" },
        { text: "Septembre", value: "septembre" },
        { text: "Octobre", value: "octobre" },
        { text: "Novembre", value: "novembre" },
        { text: "Décembre", value: "décembre" },
      ],
      onFilter: (value, record) => record.mois.startsWith(value),
      render: (mois) => {
        return <Tag>{mois.charAt(0).toUpperCase() + mois.slice(1)}</Tag>;
      },
    },
    {
      title: "Année",
      dataIndex: "annee",
      key: "annee",
      filters: years,
      onFilter: (value, record) => record.annee.startsWith(value),
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
      render: (prime) => {
        return (
          <Tag color={prime ? "blue" : "red"} className="text-sm py-1">
            {prime}
          </Tag>
        );
      },
    },
  ];
  const data = paies.map((paie) => ({
    key: paie.id,
    date: paie.date,
    mois: new Date(paie.date).toLocaleDateString("fr-FR", {
      month: "long",
    }),
    annee: new Date(paie.date).getFullYear(),
    montant: Number(paie.montant).toFixed(2),
    prime: paie.prime ? Number(paie.prime).toFixed(2) : "Aucune prime",
  }));

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Historique des paiements" />
      <div className="bg-white mt-5 overflow-auto shadow-sm sm:rounded-lg dark:bg-gray-800 w-['80%']">
        <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
          <h2 className="font-bold text-lg">Historique des paiements</h2>
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 p-4"
            onClick={() => exportPDF(data)}
          >
            Exporter en PDF
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};
export default Index;

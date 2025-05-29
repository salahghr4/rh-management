import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { InboxOutlined } from "@ant-design/icons";
import { Head, Link, router } from "@inertiajs/react";
import { Button, message, Modal } from "antd";
import Dragger from "antd/es/upload/Dragger";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Download,
  Edit,
  FileIcon,
  FileText,
  Home,
  ImageIcon,
  Mail,
  Paperclip,
  Phone,
  Trash,
  User,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { useState } from "react";
import logo from "../../../../Assest/img/rhLogo.png";

const Show = ({ auth, employe, documents, paies }) => {
  const [isAddDocModalOpen, setIsAddDocModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

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

  const exportPDF = (data) => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;
    img.onload = () => {
      doc.addImage(img, "PNG", 14, 10, 100, 40);

      // Title and employee info
      doc.setFontSize(12);
      doc.text("Historique des Paiements", 150, 30);
      doc.text("Employé : " + employe.nom + " " + employe.prenom, 150, 37);
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

  const handleDeleteDoc = () => {
    if (!documentToDelete) return;
    router.delete(
      route("admin.employes.documents.destroy", {
        employe: employe.id,
        document: documentToDelete.id,
      }),
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setDocumentToDelete(null);
          message.success("Document supprimé avec succès !");
        },
        onError: (errors) => {
          console.error("Error deleting document:", errors);
          message.error("Erreur lors de la suppression du document.");
        },
      }
    );
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const uploadProps = {
    multiple: true,
    beforeUpload: (file) => {
      setUploadedFiles((prev) => [...prev, file]);
      return false;
    },
    onRemove: (file) => {
      setUploadedFiles((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    fileList: uploadedFiles,
  };

  const handleAddDoc = (e) => {
    e.preventDefault();

    const data = new FormData();

    uploadedFiles.forEach((file) => {
      data.append("documents[]", file);
    });

    router.post(route("admin.employes.documents.store", employe.id), data, {
      forceFormData: true,
      onSuccess: () => router.visit(route("admin.employes.show", employe.id)),
      onFinish: () => {
        setIsAddDocModalOpen(false);
        setUploadedFiles([]);
        message.success("Documents ajoutés avec succès !");
      },
      onError: (errors) => console.error("Form submission errors:", errors),
    });
  };

  const getBadgeColor = (status) => {
    return status === "actif"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  };

  const getContractBadgeColor = (type) => {
    return type === "CDI"
      ? "px-4 bg-indigo-100 text-indigo-600"
      : "bg-sky-100 text-sky-600";
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-600";
      case "rh":
        return "bg-indigo-100 text-indigo-600";
      case "manager":
        return "bg-cyan-100 text-cyan-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  const getAnciennete = (date) => {
    const dateEmb = new Date(date);
    const today = new Date();

    let years = today.getFullYear() - dateEmb.getFullYear();
    let months = today.getMonth() - dateEmb.getMonth();
    let days = today.getDate() - dateEmb.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // récupère les jours du mois précédent
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years <= 0 && months <= 0 && days <= 0) {
      return "Aujourd'hui";
    }

    if (years <= 0 && months <= 0 && days > 0) {
      return `${days} jour${days > 1 ? "s" : ""}`;
    }

    if (years <= 0 && months > 0) {
      return `${months} mois`;
    }

    if (months === 0) {
      return `${years} an${years > 1 ? "s" : ""}`;
    }

    return `${years} an${years > 1 ? "s" : ""} et ${months} mois`;
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`${employe.prenom} ${employe.nom} | Profile`} />

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center space-x-3">
          <Link
            href={route("admin.employes.index")}
            className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Retour
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Profile header */}
          <div className="flex items-center relative bg-gradient-to-r from-indigo-600 to-blue-500 h-48">
            <div className="ml-5 flex items-center">
              <div className="h-32 w-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                <User className="h-20 w-20 text-gray-400" />
              </div>
              <div className="ml-6 text-white">
                <h1 className="text-2xl font-bold">
                  {employe.nom} {employe.prenom}
                </h1>
                <div className="flex gap-2 mt-2">
                  <span
                    className={`px-4 py-1 text-sm font-bold rounded-full ${getRoleBadgeColor(
                      employe.role
                    )}`}
                  >
                    {employe.role === "admin"
                      ? "Admin"
                      : employe.role === "rh"
                      ? "RH"
                      : employe.role === "manager"
                      ? "Manager"
                      : "Employé"}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Link
                href={route("admin.employes.edit", employe.id)}
                className="bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-full flex items-center text-sm font-medium shadow"
              >
                <Edit className="h-4 w-4 mr-2" /> Modifier
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 pb-12 pt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Détails de l'employé
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: employe.email,
                    },
                    {
                      icon: Phone,
                      label: "Téléphone",
                      value: employe.telephone,
                    },
                    {
                      icon: Home,
                      label: "Adresse",
                      value: employe.adresse,
                    },
                    {
                      icon: Briefcase,
                      label: "Poste",
                      value: employe.poste,
                    },
                    {
                      icon: Building2,
                      label: "Département",
                      value: employe.departement?.nom || "Non assigné",
                    },
                    {
                      icon: Calendar,
                      label: "Date d'embauche",
                      value: new Date(employe.date_embauche).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      ),
                    },
                    {
                      icon: DollarSign,
                      label: "Salaire",
                      value: `${employe.salaire} DH`,
                    },
                    {
                      icon: Clock,
                      label: "Jours de congé restants",
                      value: `${employe.joures_conges_restant} jours`,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <item.icon className="h-5 w-5 text-indigo-500 mt-1" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {item.label}
                        </div>
                        <div className="text-base font-medium text-gray-800">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 ">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <Paperclip className="inline h-5 w-5 mr-2 text-gray-600" />
                    Documents
                  </h2>
                  <Button
                    type="primary"
                    className="mb-4"
                    onClick={() => setIsAddDocModalOpen(true)}
                  >
                    <Paperclip className="inline h-4 w-4 mr-2" />
                    Ajouter un document
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  {documents.map((doc) => {
                    const isImage = [
                      "jpg",
                      "jpeg",
                      "png",
                      "gif",
                      "svg",
                      "avif",
                      "webp",
                    ].includes(doc.file_extension);
                    const isPdf = doc.file_extension === "pdf";

                    return (
                      <div
                        key={doc.id}
                        className="group relative flex flex-col gap-2 rounded-lg border bg-white transition-all hover:border-primary/50 hover:shadow-md"
                      >
                        {/* Preview Section */}
                        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg bg-gray-100">
                          {isImage ? (
                            <img
                              src={doc.file_path}
                              alt={doc.file_name}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              {isPdf ? (
                                <FileText className="h-16 w-16 text-muted-foreground" />
                              ) : (
                                <FileIcon className="h-16 w-16 text-muted-foreground" />
                              )}
                            </div>
                          )}

                          {/* Overlay with actions */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                            {(isImage || isPdf) && (
                              <Button
                                variant="solid"
                                color="primary"
                                title="View document"
                                size="sm"
                                className="h-8"
                                onClick={() =>
                                  window.open(doc.file_path, "_blank")
                                }
                              >
                                <ImageIcon className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            )}
                            <a
                              className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md text-sm cursor-pointer"
                              title="Download document"
                              href={route("admin.employes.documents.download", {
                                employe: employe.id,
                                document: doc.id,
                              })}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </a>
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col gap-2 p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-sm font-medium truncate"
                                title={doc.file_name}
                              >
                                {doc.file_name}
                              </p>
                              <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                <span
                                  className="truncate"
                                  title={doc.file_extension}
                                >
                                  {doc.file_extension.toUpperCase()}
                                </span>
                                <span>•</span>
                                <span>{formatFileSize(doc.file_size)}</span>
                              </div>
                            </div>
                            <Button
                              variant="filled"
                              color="danger"
                              icon={<Trash className="h-4 w-4" />}
                              size="icon"
                              className="h-8 w-8 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                              title="Delete document"
                              onClick={() => {
                                setDocumentToDelete(doc);
                                setIsDeleteModalOpen(true);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Statistiques
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Ancienneté</span>
                    <span
                      className={`px-3 py-1 text-sm font-bold rounded-full bg-blue-100 text-blue-600`}
                    >
                      {getAnciennete(employe.date_embauche)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Contrat</span>
                    <span
                      className={`px-3 py-1 text-sm font-bold rounded-full ${getContractBadgeColor(
                        employe.type_contrat
                      )}`}
                    >
                      {employe.type_contrat}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Statut</span>
                    <span
                      className={`px-3 py-1 text-sm font-bold rounded-full ${getBadgeColor(
                        employe.status
                      )}`}
                    >
                      {employe.status === "actif" ? "Actif" : "Inactif"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Actions rapides
                </h3>
                <div className="space-y-4">
                  <Link
                    href={route("admin.employes.edit", employe.id)}
                    className="w-full flex justify-center items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg text-sm"
                  >
                    <Edit className="h-4 w-4" /> Modifier
                  </Link>
                  {employe.status === "actif" ? (
                    <button
                      className="w-full flex justify-center items-center gap-2 text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg text-sm"
                      onClick={() => setIsStatusModalOpen(true)}
                    >
                      <UserRoundX className="h-4 w-4" /> Désactiver
                    </button>
                  ) : (
                    <button
                      className="w-full flex justify-center items-center gap-2 text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg text-sm"
                      onClick={() => setIsStatusModalOpen(true)}
                    >
                      <UserRoundCheck className="h-4 w-4" /> Activer
                    </button>
                  )}
                  <button
                    onClick={() => exportPDF(data)}
                    className="w-full flex justify-center items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg text-sm"
                  >
                    <FileText className="h-4 w-4" /> Télécharger fiche de paie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add document Modal */}
      <Modal
        title="Ajouter un document"
        open={isAddDocModalOpen}
        centered
        onOk={handleAddDoc}
        onCancel={() => {
          setIsAddDocModalOpen(false);
          setUploadedFiles([]);
        }}
        okText={"Ajouter"}
        okButtonProps={{ disabled: uploadedFiles.length === 0 }}
        cancelText="Annuler"
      >
        <Dragger {...uploadProps} style={{ padding: "1rem" }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Cliquez ou glissez les fichiers ici pour les télécharger
          </p>
          <p className="ant-upload-hint">
            Supporte l'upload multiple. Pas de données sensibles, s'il vous
            plaît.
          </p>
        </Dragger>
      </Modal>

      <Modal
        title="Confirmer la suppression"
        open={isDeleteModalOpen}
        centered
        onOk={handleDeleteDoc}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Supprimer"
        cancelText="Annuler"
        okButtonProps={{ danger: true }}
      >
        <p>Êtes-vous sûr de vouloir supprimer ce document ?</p>
      </Modal>

      <Modal
        title={`Confirmer la ${
          employe.status === "actif" ? "désactivation" : "activation"
        }`}
        open={isStatusModalOpen}
        centered
        onCancel={() => setIsStatusModalOpen(false)}
        okText={employe.status === "actif" ? "Désactiver" : "Activer"}
        cancelText="Annuler"
        okButtonProps={{ danger: employe.status === "actif" ? true : false }}
        onOk={() => {
          if (employe.status === "actif") {
            router.delete(route("admin.employes.destroy", employe.id), {
              onSuccess: () => {
                message.success("Employé désactivé avec succès !");
                setIsStatusModalOpen(false);
              },
              onError: (errors) => {
                message.error("Erreur lors de la désactivation de l'employé.");
              },
            });
          } else {
            router.put(
              route("admin.employes.activer", employe.id),
              {},
              {
                onSuccess: () => {
                  message.success("Employé activé avec succès !");
                  setIsStatusModalOpen(false);
                },
                onError: (errors) => {
                  message.error("Erreur lors de l'activation de l'employé.");
                },
              }
            );
          }
        }}
      >
        <p>
          Êtes-vous sûr de vouloir{" "}
          {employe.status === "actif" ? "désactiver" : "activer"} cet employé ?
        </p>
      </Modal>
    </AuthenticatedLayout>
  );
};

export default Show;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Table, Tag } from "antd";
import { Edit, Trash } from "lucide-react";

const Index = ({ auth, employes }) => {
    console.log(employes);
    const departementFilters = [
        ...new Set(employes.map((emp) => emp.departement?.nom)),
    ]
        .filter(Boolean)
        .map((depNom) => ({
            text: depNom,
            value: depNom,
        }));

    const handleDeleteEmploye = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        router.delete(route("admin.employes.destroy", id), {
            preserveScroll: true,
            onSuccess: () => {
                // optional: show a toast or reload data
                console.log("Employee deleted successfully.");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

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
                    text: "Active",
                    value: "active",
                },
                {
                    text: "Inactive",
                    value: "inactive",
                },
            ],
            onFilter: (value, record) => record.status.startsWith(value),
            render: (status) => (
                <Tag color={status === "active" ? "green" : "red"}>
                    {status}
                </Tag>
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
            title: "Joures conges restant",
            dataIndex: "joures_conges_restant",
            key: "joures_conges_restant",
        },
        {
            title: "Actions",
            dataIndex: "key",
            key: "action",
            // sorter: (a, b) => a.adresse.localeCompare(b.adresse),
            render: (text, record) => (
                <div className="w-full flex">
                    <Link
                        href={route("admin.employes.edit", record.key)}
                        className="text-blue-500 me-2 z-10 hover:text-blue-700"
                        onClick={(e) => e.stopPropagation()}
                        title="Editer"
                    >
                        <Edit size={20} color="orange" />
                    </Link>
                    <button
                        onClick={(e) => handleDeleteEmploye(e, record.key)}
                        className="text-red-500 me-2 hover:text-red-700"
                        title="Supprimer"
                    >
                        <Trash size={20} />
                    </button>
                </div>
            ),
        },
    ];

    const data = employes.map((employee) => ({
        key: employee.id,
        nom: employee.nom,
        prenom: employee.prenom,
        email: employee.email,
        role: employee.role,
        status: employee.status,
        adresse: employee.adresse,
        date_embauche: employee.date_embauche,
        departement: employee.departement?.nom,
        joures_conges_restant: employee.joures_conges_restant,
        poste: employee.poste,
        salaire: employee.salaire,
        telephone: employee.telephone,
        type_contrat: employee.type_contrat,
    }));
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Employe" />
            <div className="bg-white mt-5 overflow-auto shadow-sm sm:rounded-lg dark:bg-gray-800 w-['80%']">
                <div className="w-full bg-white flex justify-between p-5 rounded-tr-lg rounded-tl-lg">
                    <h2 className="font-bold text-lg">Employées</h2>
                    <Link
                        href={route("admin.employes.create")}
                        className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
                    >
                        Ajouter Employé
                    </Link>
                </div>
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    onRow={(record) => ({
                        onClick: () => {
                            router.visit(
                                route("admin.employes.show", record.key)
                            );
                        },
                    })}
                    rowClassName="cursor-pointer"
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

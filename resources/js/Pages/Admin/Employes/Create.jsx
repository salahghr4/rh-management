import CreateForm from "@/Components/CreateEmploye";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Create = ({ auth, departements }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Créer un employé" />
            <CreateForm  departements={departements}/>
        </AuthenticatedLayout>
    );
};

export default Create;

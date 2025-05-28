import EditForm from "@/Components/Form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Edit = ({ auth, employe, departements , documents }) => {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Employes" />
            <EditForm employe={employe} departements={departements} documents={documents} />
        </AuthenticatedLayout>
    );
};

export default Edit;

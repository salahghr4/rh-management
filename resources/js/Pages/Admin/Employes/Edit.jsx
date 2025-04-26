import EditForm from "@/Components/Form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Edit = ({ auth, employe, departements }) => {
    console.log(employe);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Employes" />
            <EditForm employe={employe} departements={departements} />
        </AuthenticatedLayout>
    );
};

export default Edit;

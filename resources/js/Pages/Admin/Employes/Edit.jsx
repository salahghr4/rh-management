import EditForm from "@/Components/Form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Edit = ({ auth, employe }) => {
    console.log(employe);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Employes" />
            <EditForm employe={employe} />
        </AuthenticatedLayout>
    );
};

export default Edit;

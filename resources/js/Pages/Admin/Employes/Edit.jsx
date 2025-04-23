import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Edit = ({ auth, employe }) => {
    console.log(employe);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Employes" />
        </AuthenticatedLayout>
    );
};

export default Edit;

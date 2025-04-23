import CreateForm from "@/Components/CreateEmploye";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Create = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Employes" />
            <CreateForm  />
        </AuthenticatedLayout>
    );
};

export default Create;

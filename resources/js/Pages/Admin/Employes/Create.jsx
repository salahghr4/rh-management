import CreateForm from "@/Components/CreateEmploye";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Create = ({ auth, departements }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Employes" />
            <CreateForm  departements={departements}/>
        </AuthenticatedLayout>
    );
};

export default Create;

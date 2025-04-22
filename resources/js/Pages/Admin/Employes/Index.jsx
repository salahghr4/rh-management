import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Index = ({ auth, employes }) => {
    console.log(employes);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Employe" />
        </AuthenticatedLayout>
    );
};

export default Index;

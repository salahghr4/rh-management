import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Show = ({ auth, employe }) => {
    console.log(employe);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Employes" />
        </AuthenticatedLayout>
    );
};

export default Show;

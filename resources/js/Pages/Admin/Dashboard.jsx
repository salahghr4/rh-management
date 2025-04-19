import Chart from '@/Components/Chart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { DollarSign , Package, Users, ShoppingCart } from "lucide-react";
import { Table, Tag } from "antd";

export default function Dashboard({ auth }) {
  const dataSource = [
    {
      key: "1",
      name: "Ahmed El Fassi",
      email: "ahmed@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      key: "2",
      name: "Fatima Zahra",
      email: "fatima@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      key: "3",
      name: "Khalid Benali",
      email: "khalid@example.com",
      role: "User",
      status: "Active",
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "User", value: "User" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <h2 className="text-2xl m-3 font-bold text-gray-800 animate-fade-in dark:text-white">
            Bonjour, <span className="text-blue-600">{auth.user.nom} {auth.user.prenom}</span> 👋
        </h2>


        <div className="grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {/* Total Products */}
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Total Employeés</h3>
          <p className="text-3xl font-bold text-blue-900 dark:text-white">155</p>
        </div>
        <Package className="w-12 h-12 text-blue-500" />
      </div>

      {/* Total Orders */}
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Demande de congés</h3>
          <p className="text-3xl font-bold text-red-900 dark:text-white">10</p>
        </div>
        <ShoppingCart className="w-12 h-12 text-red-500" />
      </div>

      {/* Total Customers */}
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Jours restants de congés</h3>
          <p className="text-3xl font-bold text-yellow-900 dark:text-white">15</p>
        </div>
        <Users className="w-12 h-12 text-yellow-500" />
      </div>

      {/* Traffic Analytics */}
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between dark:bg-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Jours des absence</h3>
          <p className="text-3xl font-bold text-green-900 dark:text-white">10</p>
        </div>
        <DollarSign className="w-12 h-12 text-green-500" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-black">
  {/* Traffic Chart */}
  <div className="bg-white p-6 overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
    <Chart type={"bar"} data={{
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [{ label: "Traffic", data: [2112, 2343, 2545, 3423, 2365, 1985, 987] }]
    }} />
  </div>

  {/* Sales Chart */}
  <div className="bg-white p-6 overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800 ">
    {/* <ReactCalendar /> */}
    <Chart type={"line"} data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ label: "Sales", data: [500, 700, 800, 1200, 1500, 1700], borderColor: "#4F46E5" }]
    }} />
  </div>

  <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
  {/* <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} /> */}
  
  </div>


        </AuthenticatedLayout>
    );
}

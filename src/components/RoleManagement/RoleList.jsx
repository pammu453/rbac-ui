import { useState } from "react";
import { Button, Modal, Table } from "flowbite-react";
import AddRole from "./AddRole";
import { useRole } from "../../context/RoleContext";

const RoleList = () => {
    const { roles, deleteRole } = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const handleAddRoleClick = () => {
        setSelectedRole(null);
        setIsModalOpen(true);
    };

    const handleEditRoleClick = (role) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center md:text-left">
                    Roles
                </h2>
                <Button
                    gradientDuoTone="tealToLime"
                    size="md"
                    className="w-full md:w-auto"
                    onClick={handleAddRoleClick}
                >
                    Add Role
                </Button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <Table hoverable className="border border-gray-300">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300">
                        <Table.HeadCell className="border-r border-gray-300">ID</Table.HeadCell>
                        <Table.HeadCell className="border-r border-gray-300">Role Name</Table.HeadCell>
                        <Table.HeadCell className="border-r border-gray-300">Description</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y divide-gray-300">
                        {roles.map((role) => (
                            <Table.Row
                                key={role.id}
                                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Table.Cell className="border-r border-gray-300">{role.id}</Table.Cell>
                                <Table.Cell className="border-r border-gray-300">{role.name}</Table.Cell>
                                <Table.Cell className="truncate max-w-xs border-r border-gray-300">
                                    {role.description}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            size="xs"
                                            gradientDuoTone="purpleToPink"
                                            onClick={() => handleEditRoleClick(role)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => deleteRole(role.id)}
                                            size="xs"
                                            color="failure"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>


            {/* Add/Edit Role Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>
                    {selectedRole ? "Edit Role" : "Add New Role"}
                </Modal.Header>
                <Modal.Body>
                    <AddRole
                        closeModal={() => setIsModalOpen(false)}
                        roleData={selectedRole}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RoleList;

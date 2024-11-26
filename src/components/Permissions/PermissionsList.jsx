import { useState } from "react";
import { Button, Modal, Table } from "flowbite-react";
import AddPermission from "./AddPermission";
import { usePermission } from "../../context/PermissionContext";

const PermissionsList = () => {
    const { permissions, deletePermission } = usePermission();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState(null); // For edit mode

    const handleAddPermissionClick = () => {
        setSelectedPermission(null); // Clear selected permission for add mode
        setIsModalOpen(true);
    };

    const handleEditPermissionClick = (permission) => {
        setSelectedPermission(permission); // Set selected permission for edit mode
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center md:text-left">
                    Permissions
                </h2>
                <Button
                    gradientDuoTone="tealToLime"
                    size="md"
                    className="w-full md:w-auto"
                    onClick={handleAddPermissionClick}
                >
                    Add Permission
                </Button>
            </div>


            {/* Permissions Table */}
            <div className="overflow-x-auto">
                <Table striped className="border border-gray-300">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300">
                        <Table.HeadCell className="border-r border-gray-300">ID</Table.HeadCell>
                        <Table.HeadCell className="border-r border-gray-300">Permission Name</Table.HeadCell>
                        <Table.HeadCell className="border-r border-gray-300">Role</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {permissions.map((permission) => (
                            <Table.Row
                                key={permission.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800 border-b border-gray-300"
                            >
                                <Table.Cell className="border-r border-gray-300">{permission.id}</Table.Cell>
                                <Table.Cell className="border-r border-gray-300">{permission.name}</Table.Cell>
                                <Table.Cell className="border-r border-gray-300">{permission.role}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-2">
                                        <Button
                                            size="xs"
                                            gradientDuoTone="purpleToPink"
                                            onClick={() => handleEditPermissionClick(permission)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => deletePermission(permission.id)}
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

            {/* Add/Edit Permission Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>
                    {selectedPermission ? "Edit Permission" : "Add New Permission"}
                </Modal.Header>
                <Modal.Body>
                    <AddPermission
                        closeModal={() => setIsModalOpen(false)}
                        permissionData={selectedPermission}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PermissionsList;

import { useState } from "react";
import { Button, Modal, Table } from "flowbite-react";
import AddUser from "./AddUser";
import { useUser } from "../../context/UserContext";

const UserList = () => {
    const { users, deleteUser } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleAddUserClick = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleEditUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center md:text-left">
                    User 
                </h2>
                <Button
                    gradientDuoTone="tealToLime"
                    size="md"
                    className="w-full md:w-auto"
                    onClick={handleAddUserClick}
                >
                    Add User
                </Button>
            </div>

            <div className="overflow-x-auto">
                <Table hoverable className="border border-gray-300">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300">
                        <Table.HeadCell className="border-r border-gray-300">ID</Table.HeadCell>
                        <Table.HeadCell className="border-r border-gray-300">Username</Table.HeadCell>
                        <Table.HeadCell className="border-r border-gray-300">Role</Table.HeadCell>
                        <Table.HeadCell className="border-r border-gray-300">Status</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y divide-gray-300">
                        {users &&
                            users.map((user) => (
                                <Table.Row
                                    key={user.id}
                                    className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <Table.Cell className="border-r border-gray-300">{user.id}</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">{user.name}</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">{user.role}</Table.Cell>
                                    <Table.Cell className="border-r border-gray-300">{user.status}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                size="xs"
                                                gradientDuoTone="purpleToPink"
                                                onClick={() => handleEditUserClick(user)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => deleteUser(user.id)}
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

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>
                    {selectedUser ? "Edit User" : "Add New User"}
                </Modal.Header>
                <Modal.Body>
                    <AddUser
                        closeModal={() => setIsModalOpen(false)}
                        userData={selectedUser}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserList;

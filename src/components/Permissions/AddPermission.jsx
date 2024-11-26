import { Button, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { usePermission } from "../../context/PermissionContext";

const AddPermission = ({ closeModal, permissionData }) => {
    const { addPermission, editPermission } = usePermission();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (permissionData) {
            setName(permissionData.name);
            setRole(permissionData.role);
        }
    }, [permissionData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const permission = { id: permissionData?.id || Date.now(), name, role };

        if (permissionData) {
            editPermission(permission.id, permission);
        } else {
            addPermission(permission);
        }

        closeModal();
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Permission Name"
                    placeholder="Enter permission name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextInput
                    label="Role"
                    placeholder="Enter role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <Button type="submit" gradientDuoTone="tealToLime">
                    {permissionData ? "Update Permission" : "Add Permission"}
                </Button>
            </form>
        </div>
    );
};

export default AddPermission;

import { DataTable } from "@/components/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CreateUserDialog } from "@/features/user/components/CreateUserDialog";
import { EditUserDialog } from "@/features/user/components/EditUserDialog";
import { useUsers } from "@/features/user/queries/user.query";
import type { UserData } from "@/features/user/types/user.types";
import { getInitials } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";

export default function Employee() {
  const { data: allUserData, isLoading } = useUsers();

  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [editData, setEditData] = useState<UserData | null>(null);

  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: (cell) => {
        const name = cell.row.original.name;

        return (
          <div className="flex gap-2 items-center">
            <Avatar className="size-12">
              <AvatarImage src={cell.row.original.photo} />
              <AvatarFallback className="font-bold">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold">{name}</span>
              <span className="text-gray-400 font-medium italic">
                {cell.row.original.position.name}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "No. HP",
    },
    {
      id: "action",
      header: "Aksi",
      cell: (cell) => {
        return (
          <Button
            onClick={() => {
              setEditData(cell.row.original);
              setOpenEditDialog(true);
            }}
          >
            <Edit />
          </Button>
        );
      },
      minSize: 50,
      maxSize: 50,
      meta: {
        align: "center",
      },
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex self-end">
        <Button onClick={() => setOpenCreateDialog(true)}>
          <Plus /> Tambah Karyawan
        </Button>
      </div>
      <DataTable columns={columns} data={allUserData} isFetching={isLoading} />
      <CreateUserDialog open={openCreateDialog} setOpen={setOpenCreateDialog} />
      <EditUserDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        editData={editData}
      />
    </div>
  );
}

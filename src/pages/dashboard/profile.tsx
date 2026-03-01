import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import PhotoUpload from "@/components/utils/PhotoUpload";
import { useUser } from "@/features/auth/queries/auth.query";
import { ChangePasswordDialog } from "@/features/user/components/ChangePasswordDialog";
import { useUpdateUser } from "@/features/user/queries/user.mutation";
import {
  updateUserSchema,
  type UpdateUserType,
} from "@/features/user/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Profile() {
  const { data: userData } = useUser();
  const { mutate, isPending } = useUpdateUser();

  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = (data: UpdateUserType) => {
    const payload = {
      id: userData?.id as string,
      ...data,
    };
    mutate(payload);
  };

  useEffect(() => {
    if (userData) {
      setValue("photo", userData?.photo as string);
      setValue("phone", userData?.phone as string);
    }
  }, [userData, setValue]);

  return (
    <div className="flex w-full justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-100 gap-2 p-4 rounded-md border"
        noValidate
      >
        <FieldGroup className="gap-3">
          <Avatar className="size-28 rounded-full self-center">
            <AvatarImage
              src={uploadedPhoto || userData?.photo}
              alt={userData?.name}
            />
            <AvatarFallback className="rounded-lg">
              {userData?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <PhotoUpload
            onSuccess={(url) => {
              if (url) {
                setUploadedPhoto(url);
                setValue("photo", url);
              }
            }}
          />
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="name">Nama</FieldLabel>
            </div>
            <Input
              id="name"
              placeholder="Name"
              defaultValue={userData?.name}
              disabled
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              placeholder="Email"
              defaultValue={userData?.email}
              disabled
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="position">Posisi</FieldLabel>
            </div>
            <Input
              id="position"
              placeholder="Position"
              defaultValue={userData?.position.name}
              disabled
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="phone">No. HP</FieldLabel>
            </div>
            <Input id="phone" placeholder="Phone" {...register("phone")} />
            {errors.phone && (
              <FieldError className="text-red-500">
                {errors.phone.message}
              </FieldError>
            )}
          </Field>
          <Field className="mt-8">
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setOpenDialog(true)}
            >
              Ganti Password
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <ChangePasswordDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
}

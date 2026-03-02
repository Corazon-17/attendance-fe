import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import PhotoUpload from "@/components/utils/PhotoUpload";
import { useUpdateUserForAdmin } from "@/features/user/queries/user.mutation";
import type { SelectOption } from "@/types/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCircle2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUserPositions } from "../queries/user.query";
import {
  updateUserForAdminSchema,
  type UpdateUserForAdminType,
} from "../schema/user.schema";
import type { UserData, UserPositionData } from "../types/user.types";

type EditUserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: UserData | null;
};

export function EditUserDialog({ editData, ...props }: EditUserDialogProps) {
  const { mutate, isPending } = useUpdateUserForAdmin();

  const { data: userPositions, isLoading: isUserPositionLoading } =
    useUserPositions();
  const userPositionOptions: SelectOption[] = userPositions
    ? userPositions?.map((data: UserPositionData) => ({
        label: data.name,
        value: data.id,
      }))
    : [];

  const [uploadedPhoto, setUploadedPhoto] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateUserForAdminType>({
    resolver: zodResolver(updateUserForAdminSchema),
    defaultValues: {
      photo: "",
    },
  });

  const resetForm = useCallback(() => {
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("photo", "");
    setValue("positionId", "");
  }, [setValue]);

  const onSubmit = (data: UpdateUserForAdminType) => {
    const payload = {
      id: editData?.id as string,
      ...data,
    };

    mutate(payload, {
      onSuccess: () => {
        resetForm();
        props.setOpen(false);
      },
    });
  };

  useEffect(() => {
    if (props.open) {
      setValue("name", editData?.name || "");
      setValue("email", editData?.email || "");
      setValue("phone", editData?.phone || "");
      setValue("photo", editData?.photo || "");
      setValue("positionId", editData?.position.id || "");
    }
  }, [editData, props.open, setValue]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle>Tambah Karyawan</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup className="gap-3">
              <Avatar className="size-28 rounded-full self-center">
                <AvatarImage
                  src={editData?.photo || uploadedPhoto}
                  alt="user-photo"
                />
                <AvatarFallback>
                  <UserCircle2 size={80} />
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
              {errors.photo && (
                <FieldError className="text-red-500">
                  {errors.photo.message}
                </FieldError>
              )}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="name">Nama</FieldLabel>
                </div>
                <Input id="name" placeholder="Name" {...register("name")} />
                {errors.name && (
                  <FieldError className="text-red-500">
                    {errors.name.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" placeholder="Email" {...register("email")} />
                {errors.email && (
                  <FieldError className="text-red-500">
                    {errors.email.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="phone">No. HP</FieldLabel>
                </div>
                <Input
                  id="phone"
                  placeholder="Phone"
                  {...register("phone", {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    },
                  })}
                />
                {errors.phone && (
                  <FieldError className="text-red-500">
                    {errors.phone.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="positionId">Posisi</FieldLabel>
                </div>
                <Controller
                  control={control}
                  name="positionId"
                  render={({ field }) => (
                    <Combobox
                      value={field.value}
                      options={userPositionOptions}
                      isLoading={isUserPositionLoading}
                      defaultValue={editData?.position.id}
                      onChange={(opt) => {
                        field.onChange(opt?.value ?? "");
                      }}
                    />
                  )}
                />
                {errors.positionId && (
                  <FieldError className="text-red-500">
                    {errors.positionId.message}
                  </FieldError>
                )}
              </Field>
              <Field className="mt-8">
                <Button type="submit" disabled={isPending}>
                  Submit
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

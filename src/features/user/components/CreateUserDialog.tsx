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
import { useCreateUser } from "@/features/user/queries/user.mutation";
import type { SelectOption } from "@/types/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUserPositions } from "../queries/user.query";
import { createUserSchema, type CreateUserType } from "../schema/user.schema";
import type { UserPositionData } from "../types/user.types";

type CreateUserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CreateUserDialog(props: CreateUserDialogProps) {
  const { mutate, isPending } = useCreateUser();

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
  } = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      photo: "",
      positionId: "",
    },
  });

  const resetForm = useCallback(() => {
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
    setValue("phone", "");
    setValue("photo", "");
    setValue("positionId", "");
  }, [setValue]);

  const onSubmit = (data: CreateUserType) => {
    mutate(data, {
      onSuccess: () => {
        resetForm();
        props.setOpen(false);
      },
    });
  };

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
                <AvatarImage src={uploadedPhoto} alt="user-photo" />
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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password")}
                />
                {errors.password && (
                  <FieldError className="text-red-500">
                    {errors.password.message}
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

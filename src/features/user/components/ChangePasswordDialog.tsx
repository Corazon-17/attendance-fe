import { Button } from "@/components/ui/button";
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
import { useUser } from "@/features/auth/queries/auth.query";
import { useChangePassword } from "@/features/user/queries/user.mutation";
import {
  changePasswordSchema,
  type ChangePasswordType,
} from "@/features/user/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type ChangePasswordDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function ChangePasswordDialog(props: ChangePasswordDialogProps) {
  const { data: userData } = useUser();
  const { mutate, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordType) => {
    const payload = {
      id: userData?.id as string,
      ...data,
    };
    mutate(payload, {
      onSuccess: () => {
        props.setOpen(false);
      },
    });
  };

  useEffect(() => {
    if (!props.open) {
      setValue("currentPassword", "");
      setValue("newPassword", "");
      setValue("newPassword2", "");
    }
  }, [props.open, setValue]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle>Ganti Password</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup className="gap-3">
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="currentPassword">
                    Password Saat Ini
                  </FieldLabel>
                </div>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Password Saat Ini"
                  {...register("currentPassword")}
                />
                {errors.currentPassword && (
                  <FieldError className="text-red-500">
                    {errors.currentPassword.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="newPassword">Password Baru</FieldLabel>
                </div>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Password Baru"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <FieldError className="text-red-500">
                    {errors.newPassword.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="newPassword2">
                    Konfirmasi Password Baru
                  </FieldLabel>
                </div>
                <Input
                  id="newPassword2"
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                  {...register("newPassword2")}
                />
                {errors.newPassword2 && (
                  <FieldError className="text-red-500">
                    {errors.newPassword2.message}
                  </FieldError>
                )}
              </Field>
              <Field className="mt-4">
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

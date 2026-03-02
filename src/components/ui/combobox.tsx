"use client";

import { ChevronsUpDownIcon, Loader2, PlusIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useElementSize } from "@/hooks/useElementSize";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types/input";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Separator } from "./separator";

interface ComboboxProps {
  id?: string;
  value?: string | null;
  placeholder?: string;
  options?: SelectOption[];
  defaultValue?: string;
  isLoading?: boolean;
  addNewItemLabel?: string;
  onAddNewItemClick?: () => void;
  onChange?: (opt: SelectOption | null) => void;
}

export function Combobox({ id, ...props }: ComboboxProps) {
  const [triggerRef, size] = useElementSize();

  const [open, setOpen] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState<string>(
    props.defaultValue || "",
  );
  const [search, setSearch] = useState<string>("");

  const isControlled = props.value !== undefined;
  const value = isControlled ? props.value : internalValue;

  const filtered = props.options?.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (nextValue: SelectOption | null) => {
    if (!isControlled) {
      setInternalValue(nextValue?.value || "");
    }

    if (!nextValue) {
      props.onChange?.(null);
      return;
    }

    const selected = props.options?.find(
      (opt) => opt.value === nextValue.value,
    ) as SelectOption;

    props.onChange?.(selected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          ref={triggerRef}
          variant="outline"
          role="combobox"
          className="flex gap-2 w-full justify-between"
          aria-expanded={open}
        >
          <span className={cn("truncate", !value && "text-gray-400")}>
            {value
              ? props.options?.find((option) => option.value === value)?.label
              : props.placeholder || "Select..."}
          </span>
          <div className="flex gap-1 shrink-0">
            {value && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange(null);
                }}
              >
                <X className="size-4 shrink-0 opacity-50" />
              </div>
            )}

            {props.isLoading && <Loader2 className="size-4 animate-spin" />}
            <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: size.width }}
        // This is important to allow scroll when combobox is used inside sheet/dialog
        onWheel={(e) => e.stopPropagation()}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {filtered?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    handleChange(option);
                    setOpen(false);
                  }}
                  className={cn(
                    value === option.value && "bg-gray-200 dark:bg-gray-400",
                  )}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {props.onAddNewItemClick && (
            <>
              <Separator />
              <CommandGroup>
                <Button
                  className="w-full justify-start font-normal"
                  variant="ghost"
                  onClick={() => props.onAddNewItemClick!()}
                >
                  <PlusIcon
                    aria-hidden="true"
                    className="-ms-2 opacity-60"
                    size={16}
                  />
                  {props.addNewItemLabel || "New item"}
                </Button>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

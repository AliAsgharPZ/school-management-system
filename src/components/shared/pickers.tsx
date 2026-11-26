"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Check, ChevronDown, AlertTriangle, Info } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/* Select: accessible combobox/listbox built on Radix Popover + cmdk. */
export type SelectOption = {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
};

export function Select({
  value,
  onChange,
  options,
  placeholder = "انتخاب کنید…",
  className = "",
  buttonClassName = "",
  searchable,
  disabled,
  emptyLabel = "گزینه‌ای نیست",
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  searchable?: boolean;
  disabled?: boolean;
  emptyLabel?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  const showSearch = searchable ?? options.length > 9;

  return (
    <div className={`relative inline-flex min-w-0 ${className}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-label={ariaLabel ? `${ariaLabel}: ${selected?.label ?? placeholder}` : undefined}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`b-input flex w-full min-w-0 items-center justify-between gap-2 text-start cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${buttonClassName}`}
        >
          <span className={`min-w-0 truncate ${selected ? "text-ink" : "text-steel"}`}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-steel transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        collisionPadding={8}
        className="w-[var(--radix-popover-trigger-width)] min-w-[12rem] max-w-[calc(100vw-1rem)] overflow-hidden p-0"
      >
        <Command
          dir="rtl"
          className="rounded-xl"
          filter={(searchValue, search) => {
            const normalized = search.trim().toLocaleLowerCase();
            return searchValue.toLocaleLowerCase().includes(normalized) ? 1 : 0;
          }}
        >
          {showSearch && (
            <CommandInput
              placeholder="جستجو…"
              className="h-11"
              aria-label={ariaLabel ? `جستجو در ${ariaLabel}` : "جستجوی گزینه‌ها"}
            />
          )}
          <CommandList className="max-h-72 p-1">
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${option.value} ${option.hint ?? ""}`}
                  disabled={option.disabled}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className="min-h-10 rounded-lg px-3 py-2 text-sm data-[selected=true]:bg-spring-tint data-[selected=true]:text-spring-deep"
                >
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {option.hint && <span className="shrink-0 text-xs text-steel">{option.hint}</span>}
                  {option.value === value && <Check aria-hidden="true" className="h-4 w-4 shrink-0" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* Promise-based confirmation API with managed focus and keyboard behavior. */
type ConfirmOptions = {
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  alert?: boolean;
};

type ConfirmState = ConfirmOptions & {
  resolve: (value: boolean) => void;
};

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function useConfirm(): ConfirmFn {
  const confirm = useContext(ConfirmContext);
  if (!confirm) throw new Error("useConfirm باید داخل ConfirmProvider استفاده شود");
  return confirm;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);

  const confirm = useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      setState((previous) => {
        previous?.resolve(false);
        return { ...options, resolve };
      });
    });
  }, []);

  const settle = useCallback((result: boolean) => {
    setState((current) => {
      current?.resolve(result);
      return null;
    });
  }, []);

  const Icon = state?.danger ? AlertTriangle : Info;

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AlertDialog
        open={Boolean(state)}
        onOpenChange={(open) => {
          if (!open) settle(false);
        }}
      >
        {state && (
          <AlertDialogContent className="max-w-sm gap-5 rounded-2xl p-5">
            <AlertDialogHeader className="flex-row items-start gap-3 text-start">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  state.danger
                    ? "bg-destructive/10 text-destructive"
                    : "bg-spring-tint text-spring-deep"
                }`}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <AlertDialogTitle className="text-base leading-6">
                  {state.title}
                </AlertDialogTitle>
                {state.description && (
                  <AlertDialogDescription className="text-sm leading-6">
                    {state.description}
                  </AlertDialogDescription>
                )}
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row justify-end gap-2">
              {!state.alert && (
                <AlertDialogCancel
                  onClick={() => settle(false)}
                  className="min-h-10 rounded-lg"
                >
                  {state.cancelLabel ?? "انصراف"}
                </AlertDialogCancel>
              )}
              <AlertDialogAction
                onClick={() => settle(true)}
                className={`min-h-10 rounded-lg ${
                  state.danger
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {state.confirmLabel ?? (state.alert ? "متوجه شدم" : "تأیید")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}

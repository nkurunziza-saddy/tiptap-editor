"use client";

import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useState,
  version,
} from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  type Placement,
  type UseFloatingReturn,
  type ReferenceType,
  FloatingDelayGroup,
} from "@floating-ui/react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tooltipVariants = cva([
  "z-[200] overflow-hidden",
  "rounded-md",
  "bg-[var(--tt-tooltip-bg)]",
  "px-2 py-1.5",
  "text-xs font-medium",
  "text-[var(--tt-tooltip-text)]",
  "shadow-md",
  "text-center",
]);

const tooltipKbdVariants = cva([
  "inline-block text-center align-baseline",
  "font-sans capitalize",
  "text-[var(--tt-kbd)]",
]);

// Types
interface TooltipProviderProps {
  children: React.ReactNode;
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delay?: number;
  closeDelay?: number;
  timeout?: number;
  useDelayGroup?: boolean;
}

interface TooltipTriggerProps extends Omit<
  React.HTMLProps<HTMLElement>,
  "ref"
> {
  asChild?: boolean;
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

interface TooltipContentProps extends Omit<
  React.HTMLProps<HTMLDivElement>,
  "ref"
> {
  children?: React.ReactNode;
  portal?: boolean;
  portalProps?: Omit<React.ComponentProps<typeof FloatingPortal>, "children">;
  ref?: React.Ref<HTMLDivElement>;
}

interface TooltipContextValue extends UseFloatingReturn<ReferenceType> {
  open: boolean;
  setOpen: (open: boolean) => void;
  getReferenceProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLDivElement>,
  ) => Record<string, unknown>;
}

// Hook
function useTooltip({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  delay = 600,
  closeDelay = 0,
}: Omit<TooltipProviderProps, "children"> = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] =
    useState<boolean>(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: 4,
      }),
      shift({ padding: 4 }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    mouseOnly: true,
    move: false,
    restMs: delay,
    enabled: controlledOpen == null,
    delay: { close: closeDelay },
  });
  const focus = useFocus(context, { enabled: controlledOpen == null });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return useMemo(
    () => ({ open, setOpen, ...interactions, ...data }),
    [open, setOpen, interactions, data],
  );
}

// Context
const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }
  return context;
}

// Components
function Tooltip({ children, ...props }: TooltipProviderProps) {
  const tooltip = useTooltip(props);

  if (!props.useDelayGroup) {
    return (
      <TooltipContext.Provider value={tooltip}>
        {children}
      </TooltipContext.Provider>
    );
  }

  return (
    <FloatingDelayGroup
      delay={{ open: props.delay ?? 0, close: props.closeDelay ?? 0 }}
      timeoutMs={props.timeout}
    >
      <TooltipContext.Provider value={tooltip}>
        {children}
      </TooltipContext.Provider>
    </FloatingDelayGroup>
  );
}

function TooltipTrigger({
  children,
  asChild = false,
  ref: propRef,
  ...props
}: TooltipTriggerProps) {
  const context = useTooltipContext();
  const childrenRef = isValidElement(children)
    ? parseInt(version, 10) >= 19
      ? (children as { props: { ref?: React.Ref<unknown> } }).props.ref
      : (children as { ref?: React.Ref<unknown> }).ref
    : undefined;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && isValidElement(children)) {
    const dataAttributes = {
      "data-tooltip-state": context.open ? "open" : "closed",
    };

    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(typeof children.props === "object" ? children.props : {}),
        ...dataAttributes,
      }),
    );
  }

  return (
    <button
      data-slot="tooltip-trigger"
      ref={ref}
      data-tooltip-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
}

function TooltipContent({
  className,
  style,
  children,
  portal = true,
  portalProps = {},
  ref: propRef,
  ...props
}: TooltipContentProps) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  const content = (
    <div
      data-slot="tooltip-content"
      ref={ref}
      style={{ ...context.floatingStyles, ...style }}
      className={cn(tooltipVariants(), className)}
      {...context.getFloatingProps(props)}
    >
      {children}
    </div>
  );

  return portal ? (
    <FloatingPortal {...portalProps}>{content}</FloatingPortal>
  ) : (
    content
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  tooltipVariants,
  tooltipKbdVariants,
};

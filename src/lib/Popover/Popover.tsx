import { ComputePositionConfig } from ".pnpm/@floating-ui+core@0.3.1/node_modules/@floating-ui/core";
import { computePosition } from "@floating-ui/dom";
import {
  Accessor,
  children,
  Component,
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  JSX,
  mergeProps,
  onCleanup,
  onMount,
  Setter,
  Show,
  useContext,
} from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
import { useOnClickOutside } from "../useOnClickOutside";

interface PopoverContextInterface {
  id: string;
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
  referenceElement: Accessor<HTMLElement | undefined>;
  setReferenceElement: Setter<HTMLElement | undefined>;
}

const PopoverContext = createContext<PopoverContextInterface>();

const Root: Component = (props) => {
  const id = createUniqueId();
  const [isOpen, setIsOpen] = createSignal(false);
  const [referenceElement, setReferenceElement] = createSignal<
    HTMLElement | undefined
  >();
  const store = {
    id,
    isOpen,
    setIsOpen,
    referenceElement,
    setReferenceElement,
  };

  return (
    <PopoverContext.Provider value={store}>
      {props.children}
    </PopoverContext.Provider>
  );
};

function usePopover() {
  const popoverContext = useContext(PopoverContext);
  if (!popoverContext) {
    throw new Error("Missing Popover.Root");
  }
  return popoverContext;
}

const Trigger: Component<{
  as?: Component | string | keyof JSX.IntrinsicElements;
  class?: string;
  classList?: string[];
  ref?: HTMLElement;
  "aria-label"?: string;
}> = (props) => {
  const merged = mergeProps({ as: "button" }, props);
  const { id, isOpen, setIsOpen, referenceElement, setReferenceElement } =
    usePopover();
  let triggerElement: HTMLElement | undefined = merged.ref;
  const c = children(() => props.children);

  onMount(() => {
    if (!referenceElement() && triggerElement) {
      setReferenceElement(triggerElement);
    }
  });

  return (
    <Dynamic
      component={merged.as}
      aria-label={merged["aria-label"]}
      aria-haspopup="dialog"
      aria-expanded={isOpen()}
      aria-controls={id}
      onClick={() => setIsOpen(!isOpen())}
      class={merged.class}
      ref={triggerElement}
      classList={merged.classList}
    >
      {c()}
    </Dynamic>
  );
};

interface CreateStylesInterface {
  x?: number;
  y?: number;
  strategy?: JSX.CSSProperties["position"];
}

function createStyles({
  x = 0,
  y = 0,
  strategy = "absolute",
}: CreateStylesInterface): JSX.CSSProperties {
  return {
    position: strategy,
    left: `${x}px`,
    top: `${y}px`,
  };
}

const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type ContentBodyRenderProp<T, U> = ({
  ariaProps,
  isOpen,
  contentElement,
  style,
}: {
  ariaProps: JSX.HTMLAttributes<T>;
  isOpen: Accessor<boolean>;
  contentElement: any;
  style: Accessor<JSX.CSSProperties>;
}) => U;

interface ContentBodyProps<T, U> {
  options?: Partial<ComputePositionConfig>;
  children?: U | ContentBodyRenderProp<T, U>;
}

const ContentBody = <T, U extends JSX.Element>(
  props: ContentBodyProps<T, U>
) => {
  const { id, referenceElement, setIsOpen, isOpen } = usePopover();
  let contentElement: HTMLDivElement | undefined;
  const [style, setStyle] = createSignal<JSX.CSSProperties>();

  createEffect(async () => {
    if (!isOpen()) {
      return;
    }
    let floatingElement = referenceElement();
    if (!floatingElement) {
      throw new Error("No floating element found");
    }
    if (!contentElement) {
      throw new Error("No content element found");
    }
    const { x, y, strategy } = await computePosition(
      floatingElement,
      contentElement,
      props.options
    );
    setStyle(createStyles({ x, y, strategy }));
  });

  const ariaProps: JSX.AttrAttributes = {
    id,
    role: "dialog",
    class: "relative",
  };
  const child = props.children;

  if (typeof child === "function") {
    return (child as ContentBodyRenderProp<T, U>)({
      ariaProps,
      isOpen,
      contentElement,
      style,
    });
  }
  return (
    <div {...ariaProps} ref={contentElement} style={style()}>
      {child}
    </div>
  );
};

const ContentBody2: Component<{
  options?: Partial<ComputePositionConfig>;
  children?:
    | JSX.Element
    | (({
        childProps,
        isOpen,
      }: {
        childProps: JSX.HTMLAttributes<any>;
        isOpen: boolean;
      }) => JSX.Element);
}> = (props) => {
  const { id, referenceElement, setIsOpen } = usePopover();
  let contentElement: HTMLDivElement | undefined;
  const [style, setStyle] = createSignal<JSX.CSSProperties>();
  const c = children(() => props.children);

  createEffect(async () => {
    let floatingElement = referenceElement();
    if (!floatingElement) {
      throw new Error("No floating element found");
    }
    if (!contentElement) {
      throw new Error("No content element found");
    }
    const { x, y, strategy } = await computePosition(
      floatingElement,
      contentElement,
      props.options
    );
    setStyle(createStyles({ x, y, strategy }));
  });

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setIsOpen(false);
      e.stopPropagation();
    }
  }

  onMount(() => {
    const firstFocusableChild = contentElement?.querySelectorAll(
      focusableElements
    )[0] as HTMLElement;
    firstFocusableChild?.focus();

    document.addEventListener("keyup", handleKeyUp);
    useOnClickOutside([contentElement, referenceElement()], () => {
      setIsOpen(false);
    });
  });
  onCleanup(() => {
    document.removeEventListener("keyup", handleKeyUp);
    referenceElement()?.focus();
  });

  const childProps: JSX.HTMLAttributes<HTMLDivElement> = {
    id,
    role: "dialog",
    ref: contentElement,
    class: "relative",
    style: style(),
  };

  return (
    <>
      <div tabindex={0}></div>
      <div
        {...childProps}
        // id={id}
        // role="dialog"
        // class="relative"
        // style={style()}
        // ref={contentElement}
      >
        {props.children}
      </div>
      <div tabindex={0}></div>
    </>
  );
};

const Content = <T, U extends JSX.Element>(props: ContentBodyProps<T, U>) => {
  const { isOpen } = usePopover();

  return (
    <Portal>
      {/* {typeof child === "function" ? (
        (child as any)({ isOpen })
      ) : ( */}
      <Show when={isOpen()}>
        <ContentBody {...props} />
      </Show>
      {/* )} */}
    </Portal>
  );
};

const Close: Component = (props) => {
  const { setIsOpen } = usePopover();
  return (
    <button
      aria-label="close"
      class="absolute top-1.5 right-1.5"
      onClick={() => setIsOpen(false)}
    >
      {props.children}
    </button>
  );
};

export { Content, Trigger, Root, Close };

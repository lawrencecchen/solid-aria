import { onCleanup } from "solid-js";

function clickOutside(el, accessor) {
  const onClick = (e: MouseEvent) =>
    !el.contains((e as any).target) && accessor()?.();

  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}

export { clickOutside };

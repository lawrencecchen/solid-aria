import { Component } from "solid-js";
import * as Popover from "~/lib/components/Popover/Popover";

const Root = Popover.Root;
const Trigger = Popover.Trigger;
const Content: Component = (props) => {
  return <Popover.Content {...props} role="menu" />;
};
const Close = Popover.Close;

const Item: Component = (props) => {
  return <div role="menuitem">{props.children}</div>;
};

export { Root, Trigger, Content, Close };

import { flip, offset, shift } from "@floating-ui/dom";
import { Component, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import * as Popover from "~/lib/Popover/Popover";

export default function Home() {
  return (
    <div class="p-20">
      <Popover.Root>
        <Popover.Trigger
          aria-label="Update dimensions"
          class="rounded-full bg-white border p-2"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Popover.Trigger>
        <Popover.Content
          options={{
            placement: "bottom",
            middleware: [offset(6), flip(), shift({ padding: 20 })],
          }}
        >
          <Transition
            onEnter={(el, done) => {
              const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 600,
              });
              a.finished.then(done);
            }}
          >
            <div class="p-2 drop-shadow-lg filter bg-white border rounded max-w-xs">
              <h1 class="text-lg font-semibold">This is a popover</h1>
              <p class="text-xs mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                eget nunc eget nunc efficitur efficitur.
              </p>
              <fieldset class="mt-2 grid grid-cols-2">
                <label class="text-xs" for="width">
                  Width
                </label>
                <input
                  class="text-xs ml-2 p-1 border rounded-sm"
                  id="width"
                  value="100%"
                />
              </fieldset>
              <fieldset class="mt-2 grid grid-cols-2">
                <label class="text-xs" for="height">
                  Heights
                </label>
                <input
                  class="text-xs ml-2 p-1 border rounded-sm"
                  id="height"
                  value="100%"
                />
              </fieldset>
            </div>
            <Popover.Close>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Popover.Close>
          </Transition>
        </Popover.Content>
      </Popover.Root>

      <Popover.Root>
        <Popover.Trigger
          aria-label="Update dimensions"
          class="rounded-full bg-white border p-2"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Popover.Trigger>
        <Popover.Content
          options={{
            placement: "bottom",
            middleware: [offset(6), flip(), shift({ padding: 20 })],
          }}
        >
          {({ ariaProps, isOpen, contentElement, style }) => (
            <Transition
              onEnter={(el, done) => {
                const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
                  duration: 600,
                });
                a.finished.then(done);
              }}
            >
              <Show when={isOpen()}>
                <div
                  {...ariaProps}
                  class="p-2 drop-shadow-lg filter bg-white border rounded max-w-xs"
                  ref={contentElement}
                  style={style()}
                >
                  <h1 class="text-lg font-semibold">
                    This is a popover{isOpen}
                  </h1>
                  <p class="text-xs mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec eget nunc eget nunc efficitur efficitur.
                  </p>
                  <fieldset class="mt-2 grid grid-cols-2">
                    <label class="text-xs" for="width">
                      Width
                    </label>
                    <input
                      class="text-xs ml-2 p-1 border rounded-sm"
                      id="width"
                      value="100%"
                    />
                  </fieldset>
                  <fieldset class="mt-2 grid grid-cols-2">
                    <label class="text-xs" for="height">
                      Height
                    </label>
                    <input
                      class="text-xs ml-2 p-1 border rounded-sm"
                      id="height"
                      value="100%"
                    />
                  </fieldset>
                  <Popover.Close>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Popover.Close>
                </div>
              </Show>
            </Transition>
          )}
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

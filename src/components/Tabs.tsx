import { useSyncExternalStore } from "react";
import type { KeyboardEvent } from "react";

const verticalQuery = "(min-width: 901px)";
const subscribeOrientation = (notify: () => void) => {
  const query = window.matchMedia(verticalQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const desktopOrientation = () => window.matchMedia(verticalQuery).matches;
const serverOrientation = () => false;
type Item = { id: string; label: string };
export function Tabs({
  items,
  value,
  onChange,
  label,
  id,
  verticalOnDesktop = false,
}: {
  items: readonly Item[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
  verticalOnDesktop?: boolean;
}) {
  const desktop = useSyncExternalStore(
    subscribeOrientation,
    desktopOrientation,
    serverOrientation,
  );
  const vertical = verticalOnDesktop && desktop;
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === (vertical ? "ArrowDown" : "ArrowRight"))
      next = (index + 1) % items.length;
    if (event.key === (vertical ? "ArrowUp" : "ArrowLeft"))
      next = (index - 1 + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      onChange(items[next].id);
      const button = document.getElementById(`${id}-tab-${items[next].id}`);
      button?.focus({ preventScroll: true });
      button?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "instant",
      });
    }
  }
  return (
    <div
      className="tabs"
      role="tablist"
      aria-label={label}
      aria-orientation={vertical ? "vertical" : "horizontal"}
    >
      {items.map((item, i) => (
        <button
          key={item.id}
          id={`${id}-tab-${item.id}`}
          role="tab"
          type="button"
          aria-selected={value === item.id}
          aria-controls={`${id}-panel`}
          tabIndex={value === item.id ? 0 : -1}
          onClick={(event) => {
            onChange(item.id);
            event.currentTarget.scrollIntoView({
              block: "nearest",
              inline: "nearest",
              behavior: "instant",
            });
          }}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          <span className="tab-marker" aria-hidden="true" />
          {item.label}
        </button>
      ))}
    </div>
  );
}

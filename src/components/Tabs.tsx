import type { KeyboardEvent } from "react";
type Item = { id: string; label: string };
export function Tabs({
  items,
  value,
  onChange,
  label,
  id,
}: {
  items: readonly Item[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}) {
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    if (event.key === "ArrowLeft")
      next = (index - 1 + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      onChange(items[next].id);
      document.getElementById(`${id}-tab-${items[next].id}`)?.focus();
    }
  }
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((item, i) => (
        <button
          key={item.id}
          id={`${id}-tab-${item.id}`}
          role="tab"
          type="button"
          aria-selected={value === item.id}
          aria-controls={`${id}-panel`}
          tabIndex={value === item.id ? 0 : -1}
          onClick={() => onChange(item.id)}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          <span className="tab-marker" aria-hidden="true" />
          {item.label}
        </button>
      ))}
    </div>
  );
}

import { useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { content } from "../content";
import { previewDemoRequest, validateDemoRequest } from "../demoRequest";
import type { DemoErrors, DemoFields } from "../demoRequest";
const subscribe = () => () => {};
const initial: DemoFields = {
  name: "",
  email: "",
  organization: "",
  message: "",
};
export function DemoSection() {
  const interactive = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [fields, setFields] = useState<DemoFields>(initial),
    [errors, setErrors] = useState<DemoErrors>({}),
    [complete, setComplete] = useState(false);
  function update(field: keyof DemoFields, value: string) {
    setFields((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
    setComplete(false);
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateDemoRequest(fields);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      document.getElementById(`demo-${first}`)?.focus();
      return;
    }
    setComplete(previewDemoRequest().previewComplete);
    setFields(initial);
  }
  return (
    <section
      id="demo"
      className="demo-section section-block container"
      aria-labelledby="demo-heading"
    >
      <div className="demo-copy" data-reveal>
        <p className="eyebrow">{content.demo.eyebrow}</p>
        <h2 id="demo-heading">{content.demo.heading}</h2>
        <p className="section-body">{content.demo.body}</p>
        <div className="demo-direction" aria-hidden="true">
          <ArrowUpRight weight="thin" size={92} />
        </div>
      </div>
      <form
        className="demo-card"
        data-reveal="panel"
        onSubmit={submit}
        noValidate
        autoComplete="off"
        aria-describedby="concept-notice"
      >
        <div className="form-title" data-layer>
          <span>Let’s talk about your work.</span>
          <ArrowUpRight size={19} />
        </div>
        <div className="form-fields" data-layer>
          {(["name", "email", "organization"] as const).map((field) => (
            <div className="form-field" key={field}>
              <label htmlFor={`demo-${field}`}>
                {content.demo[field]} <span aria-hidden="true">*</span>
              </label>
              <input
                id={`demo-${field}`}
                name={field}
                type={field === "email" ? "email" : "text"}
                required
                value={fields[field]}
                onChange={(e) => update(field, e.target.value)}
                aria-invalid={Boolean(errors[field])}
                aria-describedby={
                  errors[field] ? `demo-${field}-error` : undefined
                }
                autoComplete="off"
              />
              {errors[field] && (
                <p className="field-error" id={`demo-${field}-error`}>
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="form-field">
          <label htmlFor="demo-message">
            {content.demo.message}
            <span className="optional">{content.demo.optional}</span>
          </label>
          <textarea
            id="demo-message"
            name="message"
            rows={3}
            value={fields.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={content.demo.placeholder}
          />
        </div>
        <button
          type="submit"
          className="button form-submit"
          disabled={!interactive}
        >
          {content.demo.submit}
          <ArrowRight size={18} />
        </button>
        <p id="concept-notice" className="concept-notice" data-layer>
          {content.demo.notice}
        </p>
        <div role="status" aria-live="polite">
          {complete && (
            <p className="form-success">
              <CheckCircle size={20} />
              {content.demo.success}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

import { content } from "./content";
export type DemoFields = {
  name: string;
  email: string;
  organization: string;
  message: string;
};
export type DemoErrors = Partial<Record<keyof DemoFields, string>>;
export function validateDemoRequest(fields: DemoFields): DemoErrors {
  const errors: DemoErrors = {};
  if (!fields.name.trim()) errors.name = content.demo.errors.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = content.demo.errors.email;
  if (!fields.organization.trim())
    errors.organization = content.demo.errors.organization;
  return errors;
}
/** Isolated future integration point: accepts no personal data, sends no request,
 * and writes no storage. Any production adapter needs separate authorization. */
export function previewDemoRequest(): { previewComplete: true; sent: false } {
  return { previewComplete: true, sent: false };
}

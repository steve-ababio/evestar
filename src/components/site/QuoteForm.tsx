"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { services, whatsappLink } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  service: z.string().min(1, "Please choose a service"),
  type: z.string().trim().max(100).optional(),
  location: z.string().trim().min(2, "Please tell us where in Accra").max(120),
  date: z.string().optional(),
  details: z.string().trim().min(10, "Please describe what you need").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to be contacted" }) }),
});

const fieldHints: Record<string, string> = {
  Property: "Property type, number of rooms, approximate size and condition",
  Commercial: "Business type, premises size, cleaning frequency and preferred schedule",
  Specialist: "Item or area details, materials, condition and any stains",
  Vehicle: "Vehicle type and size, service wanted and where the vehicle is",
  Supplies: "Products needed, quantities and how often",
};

export function QuoteForm({
  defaultService = "",
  embedded = false,
  onServiceChange,
}: {
  defaultService?: string;
  embedded?: boolean;
  onServiceChange?: (slug: string) => void;
}) {
  const [service, setService] = useState(defaultService);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const selected = services.find((s) => s.slug === service);

  function handleServiceChange(value: string) {
    setService(value);
    onServiceChange?.(value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const result = schema.safeParse({ ...fd, service, consent });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    const d = result.data;
    const msg = [
      "New quote request — Polished by Evestair Ghana",
      `Service: ${selected?.title}`,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      `Email: ${d.email}`,
      d.type && `Property/business: ${d.type}`,
      `Location: ${d.location}`,
      d.date && `Preferred date: ${d.date}`,
      `Details: ${d.details}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener");
    setSent(true);
  }

  const err = (k: string) =>
    errors[k] ? <p className="mt-1.5 text-xs text-destructive">{errors[k]}</p> : null;
  const field = embedded
    ? "h-11 rounded-xl border-border/80 bg-muted/40"
    : "h-11 rounded-xl bg-card";

  if (sent) {
    return (
      <div className={embedded ? "py-10 text-center" : "rounded-2xl bg-card p-10 text-center shadow-soft"}>
        <CheckCircle2 className="mx-auto size-10 text-accent" />
        <h3 className="mt-4 text-3xl text-primary">Thank you.</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Your request has been prepared in WhatsApp — press send there and our team will reply with a tailored
          quotation.
        </p>
        <Button variant="soft" className="mt-6" onClick={() => setSent(false)}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={
        embedded
          ? "grid gap-4 md:grid-cols-2"
          : "grid gap-5 rounded-2xl bg-card py-6 px-4 md:grid-cols-2 md:p-10"
      }
    >
      <div className="md:col-span-2">
        <Label htmlFor="service">Service required *</Label>
        <select
          id="service"
          value={service}
          onChange={(e) => handleServiceChange(e.target.value)}
          className={`${field} mt-2 w-full border border-input px-3 text-sm`}
        >
          <option value="">Choose a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
        {err("service")}
      </div>
      <div>
        <Label htmlFor="name">Full name *</Label>
        <Input id="name" name="name" autoComplete="name" className={`${field} mt-2`} />
        {err("name")}
      </div>
      <div>
        <Label htmlFor="phone">Phone / WhatsApp *</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" className={`${field} mt-2`} />
        {err("phone")}
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" name="email" type="email" autoComplete="email" className={`${field} mt-2`} />
        {err("email")}
      </div>
      <div>
        <Label htmlFor="type">Property / business type</Label>
        <Input id="type" name="type" placeholder="e.g. 3-bed apartment, office" className={`${field} mt-2`} />
      </div>
      <div>
        <Label htmlFor="location">Location in Accra *</Label>
        <Input id="location" name="location" placeholder="e.g. East Legon" className={`${field} mt-2`} />
        {err("location")}
      </div>
      <div>
        <Label htmlFor="date">Preferred date</Label>
        <Input id="date" name="date" type="date" className={`${field} mt-2`} />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="details">Tell us about the job *</Label>
        <Textarea
          id="details"
          name="details"
          rows={embedded ? 4 : 5}
          className={embedded ? "mt-2 rounded-xl border-border/80 bg-muted/40" : "mt-2 rounded-xl bg-card"}
          placeholder={
            selected ? fieldHints[selected.category] : "Describe the space, vehicle or event and what you need"
          }
        />
        {err("details")}
      </div>
      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
          <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
          I agree to be contacted by Polished by Evestair Ghana about this enquiry.
        </label>
        {err("consent")}
      </div>
      <div
        className={
          embedded
            ? "flex flex-col gap-3 md:col-span-2"
            : "flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between md:col-span-2"
        }
      >
        {!embedded && (
          <p className="text-xs text-muted-foreground">Photos can be shared in the WhatsApp chat after sending.</p>
        )}
        <Button
          type="submit"
          variant="premium"
          size="xl"
          className={embedded ? "h-12 w-full rounded-xl" : "w-full sm:w-auto"}
        >
          Send request
        </Button>
        {embedded && (
          <p className="text-center text-xs text-muted-foreground">
            Photos can be shared in the WhatsApp chat after sending.
          </p>
        )}
      </div>
    </form>
  );
}

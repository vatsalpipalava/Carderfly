import * as z from "zod";

const LINK_REGEX = /^[a-z0-9_]+$/;

const linkSchema = z.object({
  link: z
    .string()
    .min(2, {
      message: "Link must be at least 2 characters.",
    })
    .regex(new RegExp(LINK_REGEX), {
      message: "Link not match.",
    }),
});

const planSchema = z.object({
  type: z.enum(["starter", "standard", "premium"], {
    required_error: "You need to select a plan type.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export { linkSchema, planSchema };

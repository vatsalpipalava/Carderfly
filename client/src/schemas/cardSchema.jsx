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

const inrPlanSchema = z.object({
  type: z.enum(["inr_starter", "inr_standard", "inr_premium"], {
    required_error: "You need to select a plan type.",
  }),
  // type: z.string().nonempty({
  //   message: "Plan type is required.",
  // }),
  terms: z.boolean().refine((inrVal) => inrVal === true, {
    message: "You must accept the terms and conditions",
  }),
});

const usdPlanSchema = z.object({
  type: z.enum(["usd_starter", "usd_standard", "usd_premium"], {
    required_error: "You need to select a plan type.",
  }),
  // type: z.string().nonempty({
  //   message: "Plan type is required.",
  // }),
  terms: z.boolean().refine((usdVal) => usdVal === true, {
    message: "You must accept the terms and conditions",
  }),
});

export { linkSchema, inrPlanSchema, usdPlanSchema };

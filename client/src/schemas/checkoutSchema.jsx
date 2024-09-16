import * as z from "zod";

const checkoutSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  businessName: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  country: z
    .string({
      required_error: "Please select a country.",
    })
    .nonempty({
      message: "Please select a country.",
    }),
  state: z
    .string({
      required_error: "Please select a state.",
    })
    .nonempty({
      message: "Please select a state.",
    }),
  taxNo: z.string(),
  couponCode: z.string(),
});

export { checkoutSchema };

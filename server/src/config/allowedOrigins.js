const allowedOrigins = [
  `${process.env.FIS_FRONTEND_URL}`,
  `${process.env.SEC_FRONTEND_URL}`,
  `${process.env.FIS_ADMIN_URL}`,
  `${process.env.SEC_ADMIN_URL}`,
];

export { allowedOrigins };

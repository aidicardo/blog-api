export const validate =
  schema =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.errors[0].message });
      return;
    }
    req.body = result.data;
    next();
  };

import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  image: yup.string().url("Must be a valid URL").required("image is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price must be at least 0")
    .required("Price is required"),
});

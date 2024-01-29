import Yup from "yup";

export let addCourseSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .trim()
    .max(55, "Name must be at most of 55 character"),
  price: Yup.number()
    .required("Price is required.")
    .min(0, "Price must be minimum of 0"),
});

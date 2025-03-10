import * as yup from 'yup';
export const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    pollType: yup.string().required("Poll Type is required"),
    options: yup.array().of(
        yup.object().shape({
            text: yup.string().required("Option is required")
        })
    ).min(2, "At least two options are required").required(),
    expirationTime: yup.string().required("Expiration Time is required"),
    hideResults: yup.boolean()
});
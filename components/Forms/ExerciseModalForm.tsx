// import { exerciseTemplateSchema } from "@/constants";
// import { ExerciseTemplate } from "@/types/Exercise";
// import { useFormik } from "formik";
// import { Input } from "../Input";
// import { useEffect } from "react";

// const initialValues = {
//   name: "",
//   reps: 0,
//   sets: 0,
//   restTime: 0,
// };

// export default function ExerciseModalForm({
//   handleSubmit,
//   exercise,
//   setExercise,
//   className,
// }: {
//   handleSubmit: (
//     values: ExerciseTemplate,
//     operation: "insert" | "replace"
//   ) => void;
//   exercise?: ExerciseTemplate;
//   setExercise?: (exercise: ExerciseTemplate | undefined) => void;
//   className?: string;
// }) {
//   const clearForm = () => {
//     if (exercise && setExercise) setExercise(undefined);
//     formik.resetForm();
//   };

//   const formik = useFormik({
//     initialValues: { ...initialValues },
//     validationSchema: exerciseTemplateSchema,
//     onSubmit: async (values, { setSubmitting }) => {
//       setSubmitting(false);
//       const operation = exercise ? "replace" : "insert";

//       const newExercise: ExerciseTemplate = {
//         id: exercise ? exercise.id : Date.now(),
//         ...values,
//       };

//       handleSubmit(newExercise, operation);

//       clearForm();
//     },
//   });

//   useEffect(() => {
//     if (exercise) {
//       Object.keys(exercise).forEach((key) =>
//         formik.setFieldValue(key, (exercise as any)[key])
//       );
//     }
//   }, [exercise]);

//   return (
//     <div className={className}>
//       <input type="checkbox" id="exercise-modal" className="modal-toggle" />
//       <label htmlFor="exercise-modal" className="modal cursor-pointer">
//         <label className="modal-box relative" htmlFor="">
//           <form onSubmit={formik.handleSubmit}>
//             <Input
//               type="text"
//               label="Name"
//               placeholder="Bench Press"
//               formik={formik}
//               fieldName="name"
//               className="mt-4"
//               value={formik.values.name}
//             />
//             <div className="flex justify-between mt-4">
//               <Input
//                 type="number"
//                 min={0}
//                 label="Sets"
//                 placeholder="4"
//                 formik={formik}
//                 fieldName="sets"
//                 className="mr-4"
//                 value={formik.values.sets}
//               />
//               <Input
//                 type="number"
//                 min={0}
//                 label="Reps"
//                 placeholder="10"
//                 formik={formik}
//                 fieldName="reps"
//                 value={formik.values.reps}
//               />
//             </div>
//             <Input
//               type="number"
//               min={0}
//               label="Rest Time in Seconds (optional)"
//               placeholder="180"
//               formik={formik}
//               fieldName="restTime"
//               className="pt-4"
//               value={formik.values.restTime}
//             />
//             <div className="flex justify-between mt-4">
//               <label
//                 onClick={clearForm}
//                 htmlFor={"exercise-modal"}
//                 className="btn btn-warning mt-4"
//               >
//                 Cancel
//               </label>

//               <label
//                 onClick={() => formik.handleSubmit()}
//                 htmlFor={
//                   Object.keys(formik.errors).length === 0
//                     ? "exercise-modal"
//                     : ""
//                 }
//                 className="btn btn-primary mt-4"
//               >
//                 Save
//               </label>
//             </div>
//           </form>
//         </label>
//       </label>
//     </div>
//   );
// }

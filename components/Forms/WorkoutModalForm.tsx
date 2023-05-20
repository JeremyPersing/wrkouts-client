// import { useFormik } from "formik";
// import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
// import { useRef, useState } from "react";

// import ExerciseModalForm from "@/components/Forms/ExerciseModalForm";
// import { Input } from "@/components/Input";
// import { workoutSchema } from "@/constants";
// import { Exercise, ExerciseTemplate } from "@/types/Exercise";
// import { WorkoutTemplate } from "@/types/Workout";

// export default function WorkoutModalForm() {
//   const exerciseModalButtonRef = useRef<HTMLLabelElement | null>(null);
//   const [exerciseProp, setExerciseProp] = useState<
//     ExerciseTemplate | undefined
//   >(undefined);

//   const formik = useFormik<WorkoutTemplate>({
//     initialValues: { name: "", exercises: [] },
//     validationSchema: workoutSchema,
//     onSubmit: async (values, { setSubmitting }) => {
//       setSubmitting(false);
//       console.log(values);
//     },
//   });

//   const modifyExercises = (
//     exercise: ExerciseTemplate,
//     operation: "insert" | "replace"
//   ) => {
//     const prevExercises = [...formik.values.exercises];

//     if (operation === "insert") prevExercises.push(exercise);
//     else {
//       const index = prevExercises.findIndex((i) => i.id === exercise.id);
//       prevExercises[index] = { ...exercise };
//     }

//     formik.setFieldValue("exercises", prevExercises);
//   };

//   const editExercise = (exercise: ExerciseTemplate) => {
//     setExerciseProp(exercise);
//     exerciseModalButtonRef?.current?.click();
//   };

//   const deleteExercise = (id: number) => {
//     // going by index because 2 exercises could have the same name
//     const remainingExercises = formik.values.exercises.filter(
//       (item: Exercise) => id !== item.id
//     );

//     formik.setFieldValue("exercises", remainingExercises);
//   };

//   return (
//     <div>
//       <input type="checkbox" id="workout-modal" className="modal-toggle" />
//       <div className="modal">
//         <div className="modal-box relative">
//           <label
//             htmlFor="workout-modal"
//             className="btn btn-sm btn-circle absolute right-2 top-2"
//           >
//             ✕
//           </label>

//           <h3 className="text-lg font-bold">Create Template</h3>
//           <form onSubmit={formik.handleSubmit}>
//             <Input
//               type="text"
//               label="Workout Name"
//               placeholder="Workout A"
//               className="mt-4"
//               formik={formik}
//               fieldName="name"
//             />

//             <div>
//               {formik.values.exercises &&
//                 formik.values.exercises.length > 0 &&
//                 formik.values.exercises.map((exercise: Exercise) => (
//                   <div
//                     key={exercise.id}
//                     className="flex border-b-2 py-3 px-2 items-center justify-between"
//                   >
//                     <div>
//                       <span className="font-semibold">{exercise.name}</span>
//                       <span> - {exercise.sets} sets</span>
//                       <span> - {exercise.reps} reps</span>
//                     </div>
//                     <div className="flex">
//                       <BsFillPencilFill
//                         className="text-zinc-500 mr-5 hover:cursor-pointer"
//                         onClick={() => editExercise(exercise)}
//                       />
//                       <BsFillTrashFill
//                         className="text-error hover:cursor-pointer"
//                         onClick={() => deleteExercise(exercise.id)}
//                       />
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             <div className="flex justify-between pt-4">
//               <div>
//                 <label
//                   htmlFor="exercise-modal"
//                   className="btn"
//                   ref={exerciseModalButtonRef}
//                 >
//                   Add Exercise
//                 </label>
//                 {formik.errors.exercises && (
//                   <p className="text-xs text-error">
//                     {formik.errors.exercises as string}
//                   </p>
//                 )}
//               </div>
//               <label
//                 onClick={() => formik.handleSubmit()}
//                 className="btn btn-primary"
//                 htmlFor={
//                   Object.keys(formik.errors).length > 0 ? "" : "workout-modal"
//                 }
//               >
//                 Save
//               </label>
//             </div>
//           </form>
//         </div>
//       </div>

//       <ExerciseModalForm
//         handleSubmit={modifyExercises}
//         setExercise={setExerciseProp}
//         exercise={exerciseProp}
//       />
//     </div>
//   );
// }

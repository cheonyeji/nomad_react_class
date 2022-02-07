import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log(data.toDo);
    setValue("toDo", "");
  };
  console.log(formState.errors?.toDo?.message);
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;

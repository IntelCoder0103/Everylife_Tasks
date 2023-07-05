import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export interface ITaskFormProps {
  task?: Task;
  onSave: (task: Task) => void;
  onDelete?: (id: number) => void;
}
type TaskFormType = Pick<Task, "name" | "description">;
export default function TaskForm(props: ITaskFormProps) {
  const { task = {} as Task, onSave, onDelete } = props;
  const { id, name, description, type } = task;
  const { register, setValue, handleSubmit } = useForm<TaskFormType>({
    defaultValues: {
      name,
      description,
    },
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    setValue("name", name);
    setValue("description", description);
  }, [name, description]);

  const onSubmit = handleSubmit((value: TaskFormType) => {
    onSave({ ...task, ...value });
  });
  const handleDelete = () => {
    if(confirm("Are you sure to delete this task?"))
      onDelete && onDelete(id);
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <form
      className="task-form m-auto flex gap-3 flex-col items-center"
      onSubmit={onSubmit}
    >
      <div className="flex gap-3 items-center">
        <h3 className="text-xl">Edit Task</h3>
        {type && <img src={`icons/${type}.png`} />}
      </div>
      <input
        {...register("name")}
        className="form-control"
        placeholder="Enter Name"
      />
      <textarea
        {...register("description")}
        className="form-control !rounded-lg"
        placeholder="Enter Description"
        rows={8}
      ></textarea>
      <div className="flex gap-3 items-center w-full">
        <button type="button" className="mx-4 text-red-500" onClick={handleDelete}>Delete</button>
        <div className="grow"></div>
        <button type="submit" className="bg-teal-600 px-6 py-2 rounded-full">Save</button>
        <button
          className="border-2 border-teal-600 px-6 py-2 rounded-full"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </form>
  );
}

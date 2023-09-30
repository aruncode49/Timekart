import React from "react";

const CreateCategoryForm = ({ name, setName, handleCreateCategorySubmit }) => {
  return (
    <div>
      <form onSubmit={handleCreateCategorySubmit} className="flex gap-4">
        <input
          className="w-[300px] px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 selection:bg-green-400 rounded-lg placeholder:text-sm"
          type="text"
          placeholder="Enter new category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          spellCheck="false"
          autoComplete="off"
          required
        />
        <input
          className="bg-slate-900 px-3 py-2 text-white text-lg cursor-pointer hover:text-green-400 rounded-lg"
          type="submit"
          value="New"
        />
      </form>
    </div>
  );
};

export default CreateCategoryForm;

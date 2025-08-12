import React, { useState } from "react";
import styles from "./TagCategoryForm.module.scss";
import { precisionType, type ITagCategory } from "../../types/interfaces";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSubmit: (category: ITagCategory) => void;
  initialData?: ITagCategory;
}

export default function TagCategoryForm({ onSubmit, initialData }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [status, setStatus] = useState(initialData?.status || "active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: ITagCategory = {
      id: initialData?.id || uuidv4(),
      name,
      status: status as "active" | "inactive",
      precisionType: precisionType.HIGH,
      group: "Default",
      metadataConfig: [],
      subCategories: [],
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      deleted: false,
    };
    onSubmit(newCategory);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button type="submit">{initialData ? "Update" : "Create"}</button>
    </form>
  );
}

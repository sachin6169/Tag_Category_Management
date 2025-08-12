import { useState } from "react";
import styles from "./TagCategoryForm.module.scss";
import type { ITagCategory, StatusType } from "../../types/interfaces";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSubmit: (category: ITagCategory) => void;
  initialData?: ITagCategory;
}

export default function TagCategoryForm({ onSubmit, initialData }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [status, setStatus] = useState<StatusType>(
    (initialData?.status as StatusType) || "active"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory: ITagCategory = {
      id: initialData?.id || uuidv4(),
      name,
      status,
      precisionType: initialData?.precisionType || "High", // isko interfaces.ts me string union define karo
      group: initialData?.group || { label: "Default", value: "default" },
      metadataConfig: initialData?.metadataConfig || [],
      subCategories: initialData?.subCategories || {}, // empty object default
      createdAt: initialData?.createdAt || new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      deleted: false,
      gameId: initialData?.gameId || "",
      isParentTag: initialData?.isParentTag ?? false,
      isReplay: initialData?.isReplay ?? false,
      nameStructure: initialData?.nameStructure || [],
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

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as StatusType)}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
      </select>

      <button type="submit">{initialData ? "Update" : "Create"}</button>
    </form>
  );
}

import React from "react";
import styles from "./TagCategoryCard.module.scss";
import type { ITagCategory } from "../../types/interfaces";

interface Props {
  category: ITagCategory;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TagCategoryCard({ category, onEdit, onDelete }: Props) {
  return (
    <div className={styles.card}>
      <h2>{category.name}</h2>
      <p>Status: {category.status}</p>
      <p>Precision: {category.precisionType}</p>
      <p>Group: {category.group?.label}</p> {/* ✅ fix */}
      <div className={styles.actions}>
        <button onClick={() => onEdit(category.id)}>Edit</button>
        <button onClick={() => onDelete(category.id)}>Delete</button>
      </div>
    </div>
  );
}

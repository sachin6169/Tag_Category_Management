import { useState } from "react";
import styles from "./App.module.scss";
import sampleDataRaw from "./data/sampleData.json";
import type { ITagCategory, StatusType } from "./types/interfaces";
import TagCategoryCard from "./components/TagCategoryCard/TagCategoryCard";
import TagCategoryForm from "./components/TagCategoryForm/TagCategoryForm";


const sampleData: ITagCategory[] = sampleDataRaw.map((cat) => ({
  ...cat,
  status: cat.status as StatusType, // ✅ cast to StatusType
  createdAt: cat.createdAt || new Date().toISOString(),
  lastUpdatedAt: cat.lastUpdatedAt || new Date().toISOString(),
}));

export default function App() {
  const [categories, setCategories] = useState<ITagCategory[]>(sampleData);
  const [editingCategory, setEditingCategory] = useState<ITagCategory | null>(null);

  const handleCreateOrUpdate = (category: ITagCategory) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === category.id ? { ...category, lastUpdatedAt: new Date().toISOString() } : c
        )
      );
      setEditingCategory(null);
    } else {
      setCategories((prev) => [...prev, category]);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (category) setEditingCategory(category);
  };

  return (
    <div className={styles.container}>
      <h1>Tag Category Management</h1>
      <TagCategoryForm onSubmit={handleCreateOrUpdate} initialData={editingCategory || undefined} />
      <div className={styles.cardGrid}>
        {categories.map((category) => (
          <TagCategoryCard
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

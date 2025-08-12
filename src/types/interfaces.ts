// interfaces.ts
export type StatusType = "active" | "inactive" | "ACTIVE" | "INACTIVE";

export interface IGroup {
  label: string;
  value: string;
}

export interface ISubCategory {
  label: string;
  config: any[];
}

export interface ITagCategory {
  id: string;
  gameId: string;
  group: IGroup;
  isParentTag: boolean;
  isReplay: boolean;
  metadataConfig: any[];
  name: string;
  nameStructure: string[];
  precisionType: string;
  status: StatusType;
  subCategories: Record<string, ISubCategory>;
  createdAt: string;
  lastUpdatedAt?: string;
  deleted: boolean;
}

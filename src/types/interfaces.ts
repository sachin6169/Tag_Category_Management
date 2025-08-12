export interface IBaseModel {
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  deleted?: boolean;
}

export enum precisionType {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

export interface IMetadataConfig {
  key: string;
  value: string;
}

export interface ISubCategory {
  id: string;
  name: string;
}

export interface ITagCategory extends IBaseModel {
  name: string;
  status: "active" | "inactive";
  precisionType: PrecisionType;
  group: string;
  metadataConfig: IMetadataConfig[];
  subCategories: ISubCategory[];
}

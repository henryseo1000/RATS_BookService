import { Id } from "../../../convex/_generated/dataModel";

export interface FileModalProps {
  _id?: Id<"file_list">;
  _creationTime?: number;
  description?: string;
  format?: string;
  author?: string;
  file_name?: string;
  file_size?: number;
  storageId?: Id<"_storage">;
  date?: string;
}
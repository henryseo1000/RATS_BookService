import { FileModalProps } from '@/types/common/FileModalProps';
import { UserDataType } from '@/types/common/UserDataType';
import { atom } from 'recoil';
import { Id } from '../../convex/_generated/dataModel';

export const fileState = atom<FileModalProps>({
    key: 'file',
    default: {
      _id: "" as Id<"file_list">,
      _creationTime: 1,
      description: "",
      format: "",
      author: "",
      file_name: "",
      file_size: 1,
      storageId: "" as Id<"_storage">,
      date: "",
    }
})
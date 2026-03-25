import React, { useRef, useState } from 'react'

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { LoaderCircleIcon } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';

import st from "./FileEditModal.module.scss";
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { toast } from 'sonner';

interface FileModalProps {
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

function FileEditModal({data} : {data : FileModalProps}) {
  const editFileDataById = useMutation(api.files.editFileDataById);

  const [sentReq, setSentReq] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(data?.description);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    const editPromise = editFileDataById({
      description : description,
      file_id : data?._id
    })
    .then(() => {
      setSentReq(false);
      buttonRef.current.click();
    })

    toast.promise(editPromise, {
      success: "내용이 수정되었습니다!",
      loading: "파일 수정 시도중...",
      error: "파일 수정 도중 문제 발생!"
    })
  }

  return (
    <Dialog>
              <DialogTrigger ref={buttonRef}>
                <Button className={st.modal_button}>수정</Button>
              </DialogTrigger>
              <DialogContent ref={dialogRef} className={st.modal_content}>
                <DialogHeader>
                  <DialogTitle className={st.dialog_title}>
                    <span>파일 수정</span>
                  </DialogTitle>
                  
                  <DialogDescription>
                    <span>업로드한 파일은 수정할 수 없으며, 설명만 수정가능합니다.</span>
                  </DialogDescription>
                </DialogHeader>

                <div className={st.input_area}>
                    <Input
                      value={data?.file_name}
                      type="text"
                      disabled
                    />

                    <Textarea
                      className={st.file_description}
                      placeholder="파일에 대한 설명, 사용 방법 등을 적어주세요!"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      disabled={sentReq}
                    />

                      <Button
                        disabled={sentReq || description === data?.description}
                        className={st.upload_button}
                        onClick={() => {
                          setSentReq(true);
                          handleEdit();
                        }}
                      >
                        {sentReq ? (<div className={st.uploading}>수정중<LoaderCircleIcon className={st.spinner}/></div>) : "수정"}
                      </Button>

                  </div>
              </DialogContent>
            </Dialog>
  )
}

export default FileEditModal;
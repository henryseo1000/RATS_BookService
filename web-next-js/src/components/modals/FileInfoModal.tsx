import React, { Dispatch, SetStateAction, useRef, useState } from 'react'

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '../ui/textarea';
import { LoaderCircleIcon } from 'lucide-react';
import { handleDownload } from '@/utils/handleDownload';

import st from "./FileInfoModal.module.scss";
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRecoilState } from 'recoil';
import { fileState } from '@/stores/useFileState';

function FileInfoModal({isOpen, setOpen} : {isOpen : boolean, setOpen?: Dispatch<SetStateAction<boolean>>}) {
  const generateDownloadURL = useMutation(api.files.generateDownloadURL);

  const [fileData, setFileData] = useRecoilState(fileState);
  const [sentReq, setSentReq] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

    const downloadFile = async () => {
        await generateDownloadURL({ key: fileData?.storageId })
        .then((url) => {
            handleDownload(url, fileData?.file_name);
        })
        .then(() => {
            setSentReq(false);
        })
    }

  return (
    <Dialog open={isOpen} onOpenChange={() => {setOpen(false)}}>
        <DialogTrigger ref={buttonRef}>
        </DialogTrigger>

        <DialogContent ref={dialogRef} className={st.modal_content}>
            <DialogHeader>
                <DialogTitle className={st.dialog_title}>
                    <span>파일 정보</span>
                </DialogTitle>
                  
                <DialogDescription>
                    <span>게시자 : {fileData?.author}</span><br/>
                    <span>업로드 날짜 : {fileData?.date}</span><br/>
                    <span>파일 크기 : {fileData?.file_size}KB</span><br/>
                    <span>파일 형식 : {fileData?.format}</span>
                </DialogDescription>
            </DialogHeader>

            <div className={st.input_area}>
                <Button
                    className={st.download_button}
                    onClick={() => {
                        downloadFile();
                        setSentReq(true);
                    }}
                    disabled={sentReq}
                >
                    <span>{fileData?.file_name}</span>
                </Button>

                <Textarea
                    className={st.description}
                    disabled
                >
                    {fileData?.description ? fileData?.description : "입력된 설명란이 없습니다."}
                </Textarea>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default FileInfoModal;
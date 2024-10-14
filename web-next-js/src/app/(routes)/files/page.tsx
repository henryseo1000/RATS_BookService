"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import st from "./Files.module.scss";
import { RotateCcw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { handleDownload } from '@/utils/handleDownload';

function Files() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const uploadFile = useMutation(api.files.uploadFile);
  const getFileList = useMutation(api.files.getFileList);
  const generateDownloadURL = useMutation(api.files.generateDownloadURL);

  const [file, setFile] = useState<File>();
  const [input, setInput] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleFileList = () => {
    const listPromise = getFileList().then((data) => {
      setFileList(data);
    })

    toast.promise(listPromise, {
      loading: "파일 리스트 가져오는 중...",
      success: "파일 리스트를 가져왔습니다!",
      error: "앗, 무언가 잘못된 것 같군요..."
    })
  }

  const handleUpload = async (file : File) => {
    const url = await generateUploadUrl();
    const result = await fetch(url, {
      method: "POST",
      headers: {"Content-type": file.type},
      body: file
    })

    const json = result.json()
    .then((data) => {
      const { storageId } = data;
      uploadFile({
        author: "60211579",
        file_name: file.name,
        file_size: file.size,
        description: "test",
        storageId: storageId,
        format: file.type
      })
    }).then(() => {
      handleFileList();
      setFile(undefined);
    })

    toast.promise(json, {
      loading: "업로드 중...",
      success: "업로드 성공!",
      error: "앗... 업로드 도중 문제가 발생했습니다."
    })
  }

  useEffect(() => {
    handleFileList();
  }, []);

  return (
    <div className={st.page_container}>
      <Card className={st.filter}>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="notBorrowed">이미지</SelectItem>
            <SelectItem value="borrowed">문서</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="분류" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">임베디드</SelectItem>
            <SelectItem value="dark">교양</SelectItem>
            <SelectItem value="system">물리</SelectItem>
          </SelectContent>
        </Select>       

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="예약 여부" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reserved">예약자 있음</SelectItem>
            <SelectItem value="notReserved">예약자 없음</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className={st.input}
          type="text"
          placeholder='파일 이름으로 검색'
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <Button
          className={st.button}
        >
          검색
          <Search size={15}/>
        </Button>

        <Button
          onClick={handleFileList}
          className={st.button}
        >
          새로고침
          <RotateCcw size={15}/>
        </Button>
      </Card>

      <Card className={st.files}>
        <CardHeader>
          <CardTitle>공유된 파일</CardTitle>
          <CardDescription>구성원들이 공유한 파일들을 확인해보세요!</CardDescription>
        </CardHeader>

        <CardContent className={st.file_content}>
            <Table>
              <TableHeader className={st.table_header}>
                <TableRow>
                  <TableCell>유형</TableCell>
                  <TableCell>파일 크기</TableCell>
                  <TableCell>날짜</TableCell>
                  <TableCell>파일 이름</TableCell>
                  <TableCell>파일 번호</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fileList.map((item, index) => {
                  return (
                  <TableRow key={index}>
                    <TableCell>{item?.format?.split("/")[0]}</TableCell>
                    <TableCell>{item?.file_size}KB</TableCell>
                    <TableCell>{new Date(item?._creationTime).toDateString()}</TableCell>
                    <TableCell
                      className={st.file_name}
                      onClick={async () => {
                        await generateDownloadURL({ key: item?.storageId })
                        .then((url) => {
                          handleDownload(url, item?.file_name);
                        })
                      }}
                    >
                      {item?.file_name}
                    </TableCell>
                    <TableCell>NO.13</TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter>
            <Dialog>
              <DialogTrigger>
                <Button>파일 등록</Button>
              </DialogTrigger>
              <DialogContent ref={dialogRef}>
                <DialogHeader>
                  <DialogTitle className={st.dialog_title}>
                    <span>업로드할 파일을 선택해주세요</span>
                  </DialogTitle>
                  
                  <DialogDescription>
                    <span>업로드한 파일은 Mr.Story 구성원 모두에게 공유됩니다.</span>
                    <div>
                      <Input
                        type="file"
                        placeholder='파일 이름으로 검색'
                        onChange={(e) => {
                          setFile(e.target.files![0]);
                        }}
                      />

                      { file && 
                        <Button
                          onClick={() => {
                            handleUpload(file);
                          }}
                        >
                          업로드
                        </Button>
                      }
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardFooter>
      </Card>
    </div>
  )
}

export default Files;
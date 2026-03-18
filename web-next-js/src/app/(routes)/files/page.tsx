"use client";

import React, { useEffect, useRef, useState } from 'react'

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
import { RotateCcw, Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { handleDownload } from '@/utils/handleDownload';
import { Textarea } from '@/components/ui/textarea';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Loading from '@/app/loading';
import { useRouter, useSearchParams } from 'next/navigation';

function Files() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const uploadFile = useMutation(api.files.uploadFile);
  const getFileListByFilter = useMutation(api.files.getFileListByFilter);
  const generateDownloadURL = useMutation(api.files.generateDownloadURL);

  const [file, setFile] = useState<File>();
  const [input, setInput] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [typeFilter, setTypeFiler] = useState<string>("all");
  const [description, setDescription] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [searched, setSearched] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleUpload = async (file : File) => {
    const url = await generateUploadUrl();
    const result = await fetch(url, {
      method: "POST",
      headers: {"Content-type": file.type},
      body: file
    })

    result.json()
    .then((data) => {
      const { storageId } = data;
      const uploadPromise = uploadFile({
        author: "60211579",
        file_name: file.name,
        file_size: file.size,
        description: description,
        storageId: storageId,
        format: file.type
      })

      toast.promise(uploadPromise, {
        loading: "업로드 중...",
        success: "업로드 성공!",
        error: "앗... 업로드 도중 문제가 발생했습니다."
      })
    }).then(() => {
      handleFileSearch();
      setFile(undefined);
      setOpen(!open);
      setDescription("");
    })
  }

  const handleFileSearch = () => {
    const inputParam = searchParams.get('searchInput');
    const typeParam = searchParams.get('type');

    const searchResult = getFileListByFilter({
      input: inputParam ? inputParam : "",
      searchType: typeParam ? typeParam : "all",
      pageNum: currentPage
    }).then((data) => {
      setFileList(data.filteredList);
      setPageCount(data.totalPages);
      setSearched(true);
    })

    toast.promise(searchResult, {
      loading: "파일 리스트 가져오는 중...",
      success: "파일 리스트를 가져왔습니다!",
      error: "앗, 무언가 잘못된 것 같군요..."
    })
  }

  const handleReset = () => {
    router.replace(`/files`);
    setTypeFiler("all");
    setInput("");
    setCurrentPage(1);
    setSearched(false);
  }

  const onEnter = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        setCurrentPage(1);
        handleFileSearch();
      }
  }

  const pagination = () => {
          const arr = []
          let startIdx = 1;
          let endIdx = 1;
  
          if (currentPage + 9 <= pageCount) {
              startIdx = currentPage;
              endIdx = currentPage + 9;
          }
          else {
              if (pageCount < 10) {
                  startIdx = 1;
                  endIdx = pageCount;
              }
              else {
                  startIdx = pageCount - 9;
                  endIdx = pageCount;
              }
          }
  
          for (let i = startIdx; i <= endIdx; i++) {
              arr.push(
                  <PaginationItem key={i}>
                      <PaginationLink
                          onClick={() => {
                              setCurrentPage(i);
                              setSearched(false);
                          }}
                          isActive={i === currentPage}
                      >
                          {i}
                      </PaginationLink>
                  </PaginationItem>
              );
          }
          
          return arr;
      }

  useEffect(() => {
    if(searchParams.get('searchInput')) {
      setInput(searchParams.get('searchInput'));
    }

    if(searchParams.get('type')) {
      setTypeFiler(searchParams.get('type'));
    }

    handleFileSearch();
  }, [searched]);

  if (!searched) {
    return <Loading/>
  }

  return (
    <div className={st.page_container}>
      <Card className={st.filter}>
        <Select value={typeFilter} onValueChange={(value) => setTypeFiler(value)}>
          <SelectTrigger className={st.select_filter}>
            <SelectValue
              placeholder="파일 유형"
              defaultValue="all"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="image">이미지</SelectItem>
            <SelectItem value="docs">문서</SelectItem>
            <SelectItem value="zip">압축파일</SelectItem>
            <SelectItem value="etc">기타</SelectItem>
          </SelectContent>
        </Select>   

        <Input
          className={st.input}
          value={input}
          type="text"
          placeholder='파일 이름으로 검색'
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyUp={onEnter}
        />

        <Button
          onClick={()=> {
            setCurrentPage(1);
            router.replace(`/files?searchInput=${input=="" ? "" :input}&type=${typeFilter}`);
            setSearched(false);
          }}
          className={st.button}
        >
          검색
          <Search size={15}/>
        </Button>

        <Button
          onClick={handleReset}
          className={st.button}
        >
          초기화
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
                  <TableCell>파일 번호</TableCell>
                  <TableCell>유형</TableCell>
                  <TableCell>파일 크기</TableCell>
                  <TableCell>날짜</TableCell>
                  <TableCell>파일 이름</TableCell>
                  <TableCell>작성자</TableCell>
                  <TableCell>삭제/수정</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fileList.map((item, index) => {
                  return (
                  <TableRow key={index}>
                    <TableCell>NO.{index + 1}</TableCell>
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
                      <Download className={st.icon} />
                    </TableCell>
                    <TableCell>{item?.author}</TableCell>
                    <TableCell>
                      {item?.author === "60211579" ? <Button className={st.button}>삭제/수정</Button> : ""}
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>

            <Pagination>
                    <PaginationContent
                        onChange={(e) => {e.currentTarget.ariaValueText}}
                    >
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={(e) => {
                                    setCurrentPage((currentPage) => {
                                        if(currentPage > 1) {
                                            return currentPage - 1;
                                        }
                                        else {
                                            return currentPage;
                                        }
                                    })
                                    setSearched(false);
                                }   
                              }
                            />
                        </PaginationItem>
                        {
                            pagination().map((page, index) => (page))
                        }
                        <PaginationItem>
                            <PaginationNext
                            onClick={(e) => {
                                setCurrentPage((currentPage) => {
                                if(currentPage < pageCount) {
                                    return currentPage + 1;
                                }
                                else {
                                    return currentPage;
                                }
                            })
                            setSearched(false);
                            }}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
          </CardContent>

          <CardFooter>
            <Dialog>
              <DialogTrigger ref={buttonRef}>
                <Button className={st.modal_button}>파일 등록</Button>
              </DialogTrigger>
              <DialogContent ref={dialogRef}>
                <DialogHeader>
                  <DialogTitle className={st.dialog_title}>
                    <span>업로드할 파일을 선택해주세요</span>
                  </DialogTitle>
                  
                  <DialogDescription>
                    <span>업로드한 파일은 Mr.Story 구성원 모두에게 공유됩니다.</span>
                  </DialogDescription>
                </DialogHeader>

                <div className={st.input_area}>
                    <Input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files![0]);
                      }}
                    />

                    <Textarea 
                      className={st.file_description}
                      placeholder="파일에 대한 설명, 사용 방법 등을 적어주세요!" 
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                    />

                      <Button
                        disabled={file === undefined}
                        className={st.upload_button}
                        onClick={() => {
                          handleUpload(file)
                          .then(() => {handleFileSearch()})
                          .then(() => buttonRef.current.click())
                        }}
                      >
                        업로드
                      </Button>

                  </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
      </Card>
    </div>
  )
}

export default Files;
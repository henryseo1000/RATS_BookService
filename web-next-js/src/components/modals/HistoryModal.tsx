import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import st from "./HistoryModal.module.scss";
import { useUser } from "@clerk/clerk-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useRouter } from "next/navigation";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useRecoilValue } from "recoil";
import { userDataState } from "@/stores/userDataState";
import Loading from "@/app/loading";
import { toast } from "sonner";

function HistoryModal() {
  const getBookHistoryByFilter = useMutation(api.books.getBookHistoryByFilter);

  const [historyData, setHistoryData] = useState<any[]>(null);
  const [isSearched, setSearched] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const userData = useRecoilValue(userDataState);

  const { user } = useUser();
  const router = useRouter();

  const handleHistoryData = async () => {
    const historyPromise = getBookHistoryByFilter({
      student_id: userData.student_id,
      pageNum: currentPage
    })
    .then((data) => {
        setHistoryData(data.filteredList);
        console.log(data.filteredList)
        setPageCount(data.totalPages);
    })
    .then(() => {
        setSearched(true);
    });

    toast.promise(historyPromise, {
      success: "데이터 로딩 성공!",
      loading: "유저 히스토리 로딩중...",
      error: "앗, 문제가 발생했어요!",
    });
  };

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
    if (!isSearched) {
      handleHistoryData();
    }
  }, [isSearched]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className={st.modal_button}>더보기</Button>
      </DialogTrigger>
      <DialogContent className={st.modal_content}>
        <DialogHeader>
          <DialogTitle className={st.dialog_title}>
            <span>{user?.username}님의 히스토리 목록</span>
          </DialogTitle>

          <DialogDescription>
            <span>대출/반납/예약/연장 기록을 확인할 수 있습니다.</span>
          </DialogDescription>
        </DialogHeader>
        <Table className={st.history_table}>
          <TableHeader>
            <TableRow>
              <TableCell>유형</TableCell>
              <TableCell>날짜</TableCell>
              <TableCell>시간</TableCell>
              <TableCell>책 이름</TableCell>
              <TableCell>ISBN</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData?.map((item, index) => {
              return (
                <TableRow className={st.table_row} key={index}>
                  <TableCell>{item?.type}</TableCell>
                  <TableCell>{item?.date}</TableCell>
                  <TableCell>{item?.time}</TableCell>
                  <TableCell
                    onClick={(e) => {
                      router.push(`/booklist/${item?.book_id}`);
                    }}
                  >
                    {item?.book_title}
                  </TableCell>
                  <TableCell>{item?.book_isbn}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Pagination className={st.pagination}>
          <PaginationContent
            onChange={(e) => {
              e.currentTarget.ariaValueText;
            }}
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
                    }}
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
      </DialogContent>
    </Dialog>
  );
}

export default HistoryModal;

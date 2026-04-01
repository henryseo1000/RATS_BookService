"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import ChartCard from "@/components/common/ChartCard";
import BookCard from "@/components/common/BookCard";

import st from "./Dashboard.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleDownload } from "@/utils/handleDownload";
import { Download } from "lucide-react";
import { ColProps } from "@/types/common/ColProps";
import { Id } from "../../../../convex/_generated/dataModel";
import Loading from "@/app/loading";
import utcToKorea from "@/utils/utcToKorea";
import { useRecoilValue } from "recoil";
import { userDataState } from "@/stores/userDataState";
import HistoryModal from "@/components/modals/HistoryModal";

function Dashboard() {
  const getUserBorrowed = useMutation(api.books.getUserBorrowed);
  const getUserReserved = useMutation(api.books.getUserReserved);
  const getUserHistory = useMutation(api.books.getUserHistory);
  const getFileList = useMutation(api.files.getFileList);
  const generateDownloadURL = useMutation(api.files.generateDownloadURL);
  const extendDeadline = useMutation(api.books.extendDeadline);
  const cancelReservation = useMutation(api.books.cancelReservation);
  const getUserEventByDate = useMutation(api.event.getUserEventByDate);
  const bookRecommendationApi = useAction(api.books.bookRecommendationApi);

  const [borrowedData, setBorrowedData] = useState<any>({});
  const [reservedData, setReservedData] = useState<any>({});
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const [date, setDate] = useState<Date>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const userData = useRecoilValue(userDataState);
  const [recommandData, setRecommandData] = useState<any[]>([]);
  const [eventData, setEventData] = useState<any[]>();

  const router = useRouter();

  const borrowCol: ColProps[] = [
    {
      label: "책 이름",
    },
    {
      label: "대출 날짜",
    },
    {
      label: "저자",
    },
    {
      label: "연장",
    },
  ];

  const reserveCol: ColProps[] = [
    {
      label: "책 이름",
    },
    {
      label: "날짜",
    },
    {
      label: "저자",
    },
    {
      label: "예약 취소",
    },
  ];

  const handleExtend = (id : string) => {
    const extendPromise = extendDeadline({book_id: id as Id<"book_info">, student_id: userData.student_id})
    .then(() => {
      setUpdated(true);
    })

    toast.promise(extendPromise, {
      success: "연장되었습니다!",
      loading: "책 연장을 시도하고 있습니다...",
      error: "이미 연장된 책입니다!"
    })
  }

  const handelCancelReservation = (id: string) => {
    const cancelPromise = cancelReservation({book_id: id as Id<"book_info">, student_id: userData.student_id})
    .then(() => {
      setUpdated(true);
    })

    toast.promise(cancelPromise, {
      success: "예약 취소되었습니다!",
      loading: "예약 취소를 시도하고 있습니다...",
      error: "앗, 문제가 생겼어오!"
    })
  }

  const handleDashboard = () => {
    const totalPromise = getUserBorrowed({
      student_id: userData.student_id,
    })
    .then((data) => setBorrowedData(data))

    .then(() =>
      getUserReserved({
        student_id: userData.student_id,
      }).then((data) => {
        setReservedData(data);
      })
    )

    .then(() =>
      getUserHistory({
        student_id: userData.student_id
      }).then((data) => {
        const len = data.historyList.length;
        if (len >= 5) {
          setHistoryData(data.historyList.splice(0, 5));
        }
        else {
          setHistoryData(data.historyList.splice(0, len));
        }
      })
    )

    .then(() =>
      getFileList().then((data) => {
        const len = data.length;
        if (len >= 5) {
          setFileList(data.splice(0, 5));
        }
        else {
          setFileList(data.splice(0, len));
        }
      })
    )
    .then(() => {
      getUserEventByDate({
        student_id: userData.student_id,
        date: Math.floor(new Date().getTime())
      })
      .then((data) => {
        setEventData(data?.filteredList);
      })
    })

    .then(() => {
      bookRecommendationApi().then((data) => {
        setRecommandData(data);
      })
    })

    .finally(() => {
      setUpdated(true);
    })

    toast.promise(totalPromise, {
      loading: "로딩중...",
      success: "데이터를 가져왔습니다.",
      error: "서버에서 에러가 발생했습니다."
    });
  }

  useEffect(() => {
    getUserEventByDate({
      student_id: userData.student_id,
      date: Math.floor(date?.getTime())
    })
    .then((data) => {
      setEventData(data?.filteredList);
    })
  }, [date])

  useEffect(() => {
    handleDashboard();
  }, [updated]);

  if (!updated) {
    return <Loading/>
  }

  return (
    <div className={st.page_container}>
      <div className={st.status}>
        <ChartCard
          title={"대출된 책 권수"}
          description={`${userData.login_id}님의 대출 현황입니다`}
          maxVal={5}
          countVal={borrowedData.totalBorrowed}
          chartInsideText="대출됨"
          useTable
          tableData={borrowedData.borrowedList ? borrowedData.borrowedList : []}
          columnData={borrowCol}
          buttonText="연장"
          onButtonClick={(id) => {
            setUpdated(false);
            handleExtend(id);
          }}
          onClickTitle={(id) => router.push(`/booklist/${id}`)}
        />
        <ChartCard
          title={"예약된 책 권수"}
          description={`${userData.login_id}님의 예약 현황입니다`}
          maxVal={5}
          countVal={reservedData.totalReserved}
          chartInsideText="예약됨"
          useTable
          tableData={reservedData.reservedList ? reservedData.reservedList : []}
          columnData={reserveCol}
          buttonText="예약 취소"
          onButtonClick={(id) => {
            setUpdated(false);
            handelCancelReservation(id);
          }}
          onClickTitle={(id) => router.push(`/booklist/${id}`)}
        />
      </div>

      <div>
        <Card className={st.history}>
          <CardHeader>
            <CardTitle>{userData.login_id}님의 히스토리입니다.</CardTitle>
            <CardDescription>
              대출/반납/예약/연장 기록을 확인할 수 있습니다.
            </CardDescription>
          </CardHeader>

          <CardContent className={st.history_content}>
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
                      <TableCell>
                        {item?.date}
                      </TableCell>
                      <TableCell>{item?.time}</TableCell>
                      <TableCell onClick={(e) => {
                        router.push(`/booklist/${item?.book_id}`);
                      }}>{item?.book_title}</TableCell>
                      <TableCell>{item?.book_isbn}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter>
            <HistoryModal/>
          </CardFooter>
        </Card>
      </div>

      <div className={st.status}>
        <Card className={st.calendar}>
          <CardHeader className={st.calendar_header}>
            <CardTitle>오늘의 일정은?</CardTitle>
            <CardDescription>
              책 반납 예정일, 연장일, 대출일 등을 알려드려요!
            </CardDescription>
          </CardHeader>
          <CardContent className={st.calendar_content}>
            <Calendar
              className={st.calendar_main}
              mode="single"
              selected={date}
              onSelect={(e) => {
                setDate(e);
              }}
              captionLayout="dropdown"
            />
            <div className={st.event_list}>
              {eventData?.length === 0
              ?
                <div className={st.no_results}>
                  <p>조회된 일정 없음</p>
                </div>
              :
              eventData?.map((item, index) => {
                return(
                <div className={st.event_item} key={index}>
                  <div className={st.event_title}>
                    <div className={item.type === "book_borrow" ? st.dot_blue : st.dot_red}></div>
                    <span>{item?.title}</span>
                  </div>
                  <p className={st.description}>{item?.description}</p>
                </div>
                )
              })}
            </div>
          </CardContent>
          <CardFooter />
        </Card>

        <Card className={st.recommand}>
          <CardHeader className={st.recommand_header}>
            <CardTitle>이 달의 추천도서</CardTitle>
            <CardDescription>알라딘 추천 도서</CardDescription>
          </CardHeader>
          <CardContent className={st.recommand_content}>
            <Swiper
              className={st.swiper}
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={true}
              onSwiper={setSwiper}
              pagination={{
                horizontalClass: st.swiper_pagination,
                clickable: true
              }}
            >
              {recommandData.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <BookCard data={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </CardContent>
        </Card>
      </div>

      <Card className={st.files}>
        <CardHeader className={st.file_header}>
          <CardTitle>공유된 파일</CardTitle>
          <CardDescription>
            구성원들이 공유한 파일들을 확인해보세요!
          </CardDescription>
        </CardHeader>

        <CardContent className={st.file_content}>
          <Table className={st.file_table}>
            <TableHeader>
              <TableRow>
                <TableCell>유형</TableCell>
                <TableCell>파일 크기</TableCell>
                <TableCell>게시 날짜</TableCell>
                <TableCell>파일 이름</TableCell>
                <TableCell>작성자</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fileList.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item?.format?.split("/")[0]}</TableCell>
                    <TableCell>{item?.file_size}MB</TableCell>
                    <TableCell>
                      {utcToKorea(item?._creationTime, "onlyDate")}
                    </TableCell>
                    <TableCell
                      className={st.file_name}
                      onClick={() => {
                        generateDownloadURL({
                          key: item?.storageId,
                        }).then((url) => {
                          handleDownload(url, item?.file_name);
                        });
                      }}
                    >
                      {item?.file_name}
                      <Download className={st.icon} />
                    </TableCell>
                    <TableCell>{item?.author}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <Button
            className={st.button}
            onClick={() => {
              router.push("/files");
            }}
          >
            더보기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Dashboard;

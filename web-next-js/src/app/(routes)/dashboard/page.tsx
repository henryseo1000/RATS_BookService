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
import { useUser } from "@clerk/clerk-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import ChartCard from "@/components/common/ChartCard";
import { BookData } from "@/types/common/BookData";
import BookCard from "@/components/common/BookCard";

import st from "./Dashboard.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useMutation } from "convex/react";
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

function Dashboard() {
  const getUserBorrowed = useMutation(api.books.getUserBorrowed);
  const getUserReserved = useMutation(api.books.getUserReserved);
  const getUserHistory = useMutation(api.books.getUserHistory);
  const getFileList = useMutation(api.files.getFileList);
  const generateDownloadURL = useMutation(api.files.generateDownloadURL);
  const extendDeadline = useMutation(api.books.extendDeadline);

  const [borrowedData, setBorrowedData] = useState<any>({});
  const [reservedData, setReservedData] = useState<any>({});
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [updated, setUpdated] = useState<boolean>(false);

  const { user } = useUser();
  const router = useRouter();
  const [swiper, setSwiper] = useState<SwiperCore>();

  const bookData: BookData[] = [
    {
      title: "과학책 읽어주는 공대생",
      description:
        "‘요즘 공대생’의 마음을 훔친 ‘과학 고전’ 18권을 소개하는 가이드북! 과학은 수식과 이론이 가득하고 첨단을 달리는 분야인데, 짧게는 수십 년, 길게는 수백 년 전에 쓰인 과학 고전들이 공대생의 마음을 사로잡은 이유는 무엇일까? 과학 고전 속엔 과학자들의 인간미 넘치는 이야기부터 지금의 이 세계를 만든 거대한 발견의 순간까지 지금껏 빛을 보지 못한 원석 같은 이야기들이 숨겨져 있다.과학 고전 읽기의 어려움을 잘 알고 있는 작가는 독자들이 자신과 같은 혼란을 겪지 않도록 18권의 과학책을 꼼꼼히 해설한다. 어렵게 느껴질 수 있는 과학 용어와 개념 설명은 물론, 소개하는 책의 작가와 시대적 배경에 대한 정보를 상세히 담았다. 공대생다운 발칙하고 신선한 발상들도 함께 느낄 수 있다. 이 책을 읽는 독자들은 친절한 공대생의 안내를 따라 지금의 세계를 만든 거대한 과학 지식들을 습득할 뿐만 아니라 매력적인 과학자의 세계를 들여다볼 수 있을 것이다.",
      imgPath:
        "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280",
    },
    {
      title: "책 이름2",
      description: "책에 대한 설명입니다. 참고해주세요.",
      imgPath:
        "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280",
    },
    {
      title: "책 이름3",
      description: "책에 대한 설명입니다. 참고해주세요.",
      imgPath:
        "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280",
    },
    {
      title: "책 이름4",
      description: "책에 대한 설명입니다. 참고해주세요.",
      imgPath:
        "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280",
    },
    {
      title: "책 이름5",
      description:
        "책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.책에 대한 설명입니다. 참고해주세요.",
      imgPath:
        "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280",
    },
  ];

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
    const extendPromise = extendDeadline({book_id: id as Id<"book_info">, student_id:"60211579"})
    .then(() => {
      setUpdated(true);
    })

    toast.promise(extendPromise, {
      success: "연장되었습니다!",
      loading: "책 연장을 시도하고 있습니다...",
      error: "이미 연장된 책입니다!"
    })
  }

  const handleDashboard = () => {
    const totalPromise = getUserBorrowed({
      student_id: "60211579",
    })
    .then((data) => setBorrowedData(data))

    .then(() =>
      getUserReserved({
        student_id: "60211579",
      }).then((data) => {
        setReservedData(data);
      })
    )

    .then(() =>
      getUserHistory().then((data) => {
        const len = data.historyList.length;
        if (len >= 5) {
          setHistoryData(data.historyList.splice(0, 5));
        }
        else {
          setFileList(data.historyList.splice(0, len));
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
          description={`${user?.username}님의 대출 현황입니다`}
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
        />
        <ChartCard
          title={"예약된 책 권수"}
          description={`${user?.username}님의 예약 현황입니다`}
          maxVal={5}
          countVal={reservedData.totalReserved}
          chartInsideText="예약됨"
          useTable
          tableData={reservedData.reservedList ? reservedData.reservedList : []}
          columnData={reserveCol}
          buttonText="예약 취소"
        />
      </div>

      <div>
        <Card className={st.history}>
          <CardHeader>
            <CardTitle>{user?.username}님의 히스토리입니다.</CardTitle>
            <CardDescription>
              대출, 반납 기록을 확인할 수 있습니다.
            </CardDescription>
          </CardHeader>

          <CardContent className={st.history_content}>
            <Table>
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
            <Button className={st.button}>더보기</Button>
          </CardFooter>
        </Card>
      </div>

      <div className={st.status}>
        <Card className={st.calendar}>
          <CardHeader className={st.calendar_header}>
            <CardTitle>오늘의 일정은?</CardTitle>
            <CardDescription>
              책 반납 예정일, 이벤트 날짜 등을 알려드려요!
            </CardDescription>
          </CardHeader>
          <CardContent className={st.calendar_content}>
            <Calendar
              className={st.calendar_main}
              mode="single"
              selected={date}
              onSelect={setDate}
            />
            <div className={st.no_results}>조회된 일정 없음</div>
          </CardContent>
          <CardFooter />
        </Card>

        <Card className={st.recommand}>
          <CardHeader className={st.recommand_header}>
            <CardTitle>이 달의 추천도서</CardTitle>
            <CardDescription>크롤링을 통한 추천 도서</CardDescription>
          </CardHeader>
          <CardContent className={st.recommand_content}>
            <Swiper
              className={st.swiper}
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={true}
              onSwiper={setSwiper}
              pagination={true}
            >
              {bookData.map((item, index) => {
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
          <Table>
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

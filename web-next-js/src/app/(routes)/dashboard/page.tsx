"use client";

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from "swiper/modules";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/clerk-react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import ChartCard from "@/components/common/ChartCard";
import { BookData } from '@/types/common/BookData';
import BookCard from '@/components/common/BookCard';

import st from './Dashboard.module.scss';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

function Dashboard() {
  const getUserBorrowed = useMutation(api.books.getUserBorrowed);
  const [borrowedData, setBorrowedData] = useState<any>({});

  const { user } = useUser();
  const [ swiper, setSwiper ] = useState<SwiperCore>();

  const bookData : BookData[] = [
    {
      title: "책 이름1",
      description: "lorem ipsum",
      imgPath: "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280"
    },
    {
      title: "책 이름2",
      description: "lorem ipsum",
      imgPath: "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280"
    },
    {
      title: "책 이름3",
      description: "lorem ipsum",
      imgPath: "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280"
    },
    {
      title: "책 이름4",
      description: "lorem ipsum",
      imgPath: "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280"
    },
    {
      title: "책 이름5",
      description: "lorem ipsumdffsdfsdfsadfdfdsdfsdfadfasdfdsfsdfsdfsdfsdfsdfsdfsdfsdfasdfasdfasdfsdfsdfsdfdfsdfsdfdfsdf",
      imgPath: "https://books.google.co.kr/books/publisher/content?id=bazDDwAAQBAJ&hl=ko&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0O_l6LQQsVHjySdQyyxwtGHErZBQ&w=1280"
    }
  ];

  const handleBorrowedData = () => {
    
  }

  useEffect(() => {
    getUserBorrowed({
      student_id:"60211579"
    }).then((data) => 
      setBorrowedData(data)
    );
  }, []);

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
          tableData={ borrowedData.borrowedList ? borrowedData.borrowedList : []}
        />
        <ChartCard 
          title={"예약된 책 권수"}
          description={`${user?.username}님의 예약 현황입니다`}
          maxVal={5}
          countVal={3}
          chartInsideText="예약됨"
          useTable
          tableData={[]}
        />
        <ChartCard 
          title={"대출된 책 권수"}
          description={`${user?.username}님이 1개월동안 대출한 책 현황입니다`}
          countVal={30}
          chartInsideText="1개월 동안 대출 권수"
        />
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              {user?.username}'s History
            </CardTitle>
          </CardHeader>

          <CardContent>
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
                <TableRow>
                  <TableCell>대출</TableCell>
                  <TableCell>2024.10.01</TableCell>
                  <TableCell>16:55</TableCell>
                  <TableCell>총, 균, 쇠</TableCell>
                  <TableCell>1234567890</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter>
            <span>더보기</span>
          </CardFooter>
        </Card>
      </div>

      <div className={st.status}>
        <Card className={st.calendar}>
          <CardHeader className={st.calendar_header}>
            <CardTitle>오늘의 일정은?</CardTitle>
            <CardDescription>책 반납 예정일, 이벤트 날짜 등을 알려드려요!</CardDescription>
          </CardHeader>
          <CardContent className={st.calendar_content}>
              <Calendar className={st.calendar_main}/>
              <div className={st.no_results}>
                조회된 일정 없음
              </div>
          </CardContent>
          <CardFooter/>
        </Card>

        <Card className={st.recommand}>
          <CardHeader className={st.recommand_header}>
            <CardTitle>이 달의 추천도서</CardTitle>
            <CardDescription>크롤링을 통한 추천 도서</CardDescription>
          </CardHeader>
          <CardContent className={st.recommand_content}>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={true}
              onSwiper={setSwiper}
              pagination={true}
            >
              { bookData.map((item, index) => {
                  return (
                      <SwiperSlide key={index}>
                        <BookCard data={item}/>
                      </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
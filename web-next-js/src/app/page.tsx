"use client";
import AOS from "aos";
import 'aos/dist/aos.css';

import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from 'recoil';

import st from "./Home.module.scss";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { userDataState } from "@/stores/userDataState";
import MainNav from "@/layout/MainNav";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const checkRequired = useMutation(api.user.checkRequired);
  const getUserData = useMutation(api.user.getUserData);

  const router = useRouter();
  
  const [checked, setChecked] = useState<boolean>(false);
  const [checkRes, setCheckRes] = useState<boolean>();
  const setUserData = useSetRecoilState(userDataState);

  const checkForCurrentUser = async () => {
    const checkResult = await checkRequired({user_id : userId})
    .then((res) => {
      setChecked(true);
      setCheckRes(res);

      return res;
    })

    
    return checkResult;
  }

  useEffect(() => {
    if (isSignedIn && !checked) {
      const userPromise = checkForCurrentUser();

      toast.promise(userPromise, {
        success: "유저 확인 완료!",
        loading: "유저 정보 확인중입니다.",
        error: "앗, 유저 확인 중 문제 발생!"
      })
    }
  }, [isSignedIn, checked])

  useEffect(() => {
    AOS.init();
  }, [])

  if (!isLoaded) {
    return <Loading/>
  }

  if(isSignedIn) {
    if (checkRes && checked) {
      getUserData({user_id : userId})
      .then((data) => setUserData({
        name: data?.real_name,
        login_id: data?.username,
        user_id: userId,
        student_id: data?.student_id,
        major: data?.major,
        grade : data?.grade
      }))
    }

    else if (!checkRes && checked) {
      return router.push('/onboarding');
    }

    else {
      return <Loading/>
    }
  }

  return (
    <div className={st.page_container}>
      <MainNav isSignedIn={isSignedIn}/>

      <div className={st.section_1}>
        <span data-aos="fade-up" data-aos-delay={100}>MR.STORY</span>
        <span data-aos="fade-up" data-aos-delay={500}>동아리 파일 공유, 도서 관리 시스템 Mr.story에 오신 것을 환영합니다!</span>
        <ArrowDown className={st.scroll_down}/>
      </div>

      <div className={st.section_2}>
        <span 
          className={st.section_title} 
          data-aos="fade-left" 
        >
          Features Of MR.STORY
        </span>
        <div className={st.list}>
          <div className={st.list_section} data-aos="fade-right" data-aos-delay={100}>
            <span className={st.list_title}>Return, Borrow Books</span>
            <span className={st.list_description}>자유로운 책 반납, 대출이 가능합니다.</span>
          </div>
          <div className={st.list_section} data-aos="fade-right" data-aos-delay={150}>
            <span className={st.list_title}>Book Reservation</span>
            <span className={st.list_description}>대출중인 책을 예약하여 예약한 책을 사람들이 대출할 수 없게 막을 수 있습니다.</span>
          </div>
          <div className={st.list_section} data-aos="fade-right" data-aos-delay={200}>
            <span className={st.list_title}>Dashboard</span>
            <span className={st.list_description}>대시보드를 통해 히스토리, 반납 예정일 등을 확인할 수 있습니다.</span>
          </div>
          <div className={st.list_section} data-aos="fade-right" data-aos-delay={250}>
            <span className={st.list_title}>Book Informations</span>
            <span className={st.list_description}>Naver API를 통해 책 정보를 쉽게 확인할 수 있습니다.</span>
          </div>
          <div className={st.list_section} data-aos="fade-right" data-aos-delay={300}>
            <span className={st.list_title}>Bookmark</span>
            <span className={st.list_description}>북마크를 통해 원하는 책을 북마크하고, 쉽게 접근할 수 있습니다.</span>
          </div>
        </div>
      </div>

      <div 
        className={st.section_3}
      >
        <div 
          data-aos="fade-up" 
          data-aos-delay={100} 
          className={st.title_area}
        >
          <span className={st.section_title}>Notice</span>
          <span className={st.section_description}>Mr.Story 기본 규칙</span>
        </div>
        <div className={st.list}>
          <div 
            className={st.list_section}
            data-aos="flip-down" 
            data-aos-delay={250}
          >
            <img src="/image/notice_1.png" alt="notice_1" />

            <div className={st.notice_section}>
              <span className={st.notice_title}>도서 목록 페이지</span>
              <ul className={st.notice_description}>
                <li>도서 목록 페이지에서 책을 대출하고 반납할 수 있습니다.</li>
                <li>대출하면 대출 버튼이 반납 버튼으로 바뀝니다.</li>
                <li>만약 특정 책을 반납했다면, 해당 책은 24시간 이내 재대출이 불가능합니다.</li>
              </ul>
            </div>
          </div>

          <div 
            className={st.list_section}
            data-aos="flip-down" 
            data-aos-delay={250}
          >
            <div className={st.notice_section}>
              <span className={st.notice_title}>반납일</span>
              <ul className={st.notice_description}>
                <li>반납일은 대출일로부터 7일입니다.</li>
                <li>연장하시면 7일 더 연장되어 최대 14일까지 대출 가능하고, 연장은 대시보드의 대출 목록에서 할 수 있습니다.</li>
                <li>반납 기록은 히스토리에서 확인 가능합니다.</li>
                <li>추가로, 반납 시에는 캘린더에 있던 반납 예정일과 대출일이 사라집니다.</li>
              </ul>
            </div>

            <img src="/image/notice_2.png" alt="notice_1" />
          </div>

          <div 
            className={st.list_section}
            data-aos="flip-down" 
            data-aos-delay={250}
          >
            <img src="/image/notice_3.png" alt="notice_1" />

            <div className={st.notice_section}>
              <span className={st.notice_title}>북마크</span>
              <ul className={st.notice_description}>
                <li>북마크는 도서 목록 페이지에서 할 수 있습니다.</li>
                <li>북마크 모양 버튼을 클릭하면 북마크되고, 한 번 더 누르면 취소됩니다.</li>
                <li>추가로 유저들이 얼마나 북마크했는지도 확인 가능합니다.</li>
              </ul>
            </div>
          </div>

          <div 
            className={st.list_section}
            data-aos="flip-down" 
            data-aos-delay={250}
          >
            <div className={st.notice_section}>
              <span className={st.notice_title}>파일 공유</span>
              <ul className={st.notice_description}>
                <li>파일 페이지에서 파일 공유가 가능합니다.</li>
                <li>파일은 한 번에 하나씩 공유가 가능하고, 한 번에 올릴 수 있는 파일 용량이 정해져 있습니다.</li>
                <li>본인이 파일을 올린 경우, 파일 페이지의 해당 파일 게시물에 수정/삭제 버튼이 나타납니다.</li>
                <li>파일 게시물 내용만 수정 가능합니다.</li>
              </ul>
            </div>

            <img src="/image/notice_4.png" alt="notice_1" />
          </div>
        </div>
      </div>

      <div className={st.footer}>
        <div className={st.line}/>
        <span>Copyright @ 2026 by henryseo1000. All rights reserved.</span>
        <span>Created by @서호준,  Powered by @서호준</span>
      </div>
    </div>
  );
  
}

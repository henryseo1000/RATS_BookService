"use client"

import ChartCard from "@/components/common/ChartCard";

import st from './Dashboard.module.scss';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/clerk-react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

function Dashboard() {
  const { user } = useUser();

  return (
    <div className={st.page_container}>
      <div className={st.status}>
        <ChartCard 
          title={"대출된 책 권수"} 
          description={`${user?.username}님의 대출 현황입니다`}
          maxVal={5}
          countVal={2}
          chartInsideText="대출됨"
          useTable
        />
        <ChartCard 
          title={"예약된 책 권수"}
          description={`${user?.username}님의 예약 현황입니다`}
          maxVal={5}
          countVal={3}
          chartInsideText="예약됨"
          useTable
        />
        <ChartCard 
          title={"대출된 책 권수"}
          description={`${user?.username}님이 1개월동안 반납한 책 현황입니다`}
          countVal={30}
          chartInsideText="1개월 동안 반납한 권수"
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
                  <TableCell>Test1</TableCell>
                  <TableCell>Test1</TableCell>
                  <TableCell>Test1</TableCell>
                  <TableCell>Test1</TableCell>
                  <TableCell>Test1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter>
            <span></span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

import st from './EventResults.module.scss';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

function EventResults() {
  const getOfficialEvents = useMutation(api.event.getOfficialEvents);
  const [officialEvent, setOfficialEvent] = useState<any[]>();

  useEffect(() => {
    getOfficialEvents()
    .then((data) => {
      setOfficialEvent(data.officialList);
    })
  }, [officialEvent])

  return (
    <Card>
          <CardHeader>
            <CardTitle>공지사항</CardTitle>
            <CardDescription>
              Mr.Story 공지사항입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className={st.event_result_list}>
            {
              officialEvent?.map((item, index) => {
                return <div key={index} className={st.event_item}>
                  <div className={st.event_title}>
                    <div className={st.dot_green}></div>
                    <span>{item?.title}</span>
                  </div>
                  <p className={st.description}>{item?.description}</p>
                </div>
              })
            }
          </CardContent>
          <CardFooter />
    </Card>
  )
}

export default EventResults
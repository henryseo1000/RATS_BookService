"use client";

import React, { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';

import st from './BookList.module.scss';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

function BookList() {
    const getBooks = useMutation(api.api.getBooks);
    const [list, setList] = useState<any[]>([]);

    function handleBooks() {
        const bookPromise = getBooks().then(data => {
            setList(data);
            console.log(data);
        });
        toast.promise(bookPromise, {
            loading: "Getting Books...",
            success: "Got Book List From Database!",
            error: "Oops, Something Went Wrong..."
        })
    }

    useEffect(() => {
        handleBooks();
    }, [])

    return (
        <div className={st.page_container}>
            <Card className={st.status}>
                TEST
                <Button
                    onClick={handleBooks}
                >
                    Refresh
                </Button>
            </Card>
            <Card className={st.table_container}>
                {list.length >= 1 ? 
                    <Table>
                        <TableHeader color='#000000'>
                            <TableRow>
                                <TableCell>상태</TableCell>
                                <TableCell>등록 날짜</TableCell>
                                <TableCell>책 이름</TableCell>
                                <TableCell>ISBN</TableCell>
                                <TableCell>예약자</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {list.map((item, index) => {
                            return (
                                <TableRow>
                                    <TableCell width={16.3}>{item?.title}</TableCell>
                                    <TableCell width={16.3}>{new Date(item?._creationTime).toLocaleDateString()}</TableCell>
                                    <TableCell width={16.3}>{item?.title}</TableCell>
                                    <TableCell width={16.3}>{item?.isbn}</TableCell>
                                    <TableCell width={16.3}>{item?.reservation ? item?.reservation : "(예약자 없음)"}</TableCell>
                                </TableRow>
                            )
                        }) 
                        }
                        </TableBody>
                  </Table>
                  :
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
                    <div className={st.no_data}>
                        No Data Found
                    </div>
                  </Table>
                }
            </Card>
        </div>
    )
}

export default BookList;
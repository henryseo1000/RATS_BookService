"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import pathToTitle from '@/utils/pathToTitle';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';

import st from './SearchBar.module.scss';

function SearchBar() {
    const [input, setInput] = useState<string>('');
    const pathname = usePathname();

    return (
        <div className={st.search_container}>
            <span>{pathToTitle(pathname)}</span>

            <div className={st.bar_menu}>
                <Button>
                    
                </Button>

                <div className={st.input_area}>
                    <div
                        onClick={() => {
                            // Search API
                        }}
                    >
                        <Search/>
                    </div>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                        placeholder='Search For Book Name, ISBN...'
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBar;
"use client";

import React, { useEffect, useState } from 'react';

import st from "./Barcode.module.scss";
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

import { Download, Link } from 'lucide-react';
import { handleDownload } from '@/utils/handleDownload';

function Barcode() {
  const [url, setUrl] = useState<string>();
  const [size, setSize] = useState<number>(200);

  const getBarcode = () => {
    if (!url){
      setUrl("http://bwipjs-api.metafloor.com/?bcid=code128&text=AB1234567890&scale=3&includetext&backgroundcolor=ffffff&padding=10");
    }
    else {
      setUrl(undefined)
    }
  }

  useEffect(() => {
    console.log(Number(size));
  }, [size])

  return (
    <div className={st.page_container}>
      {url &&
        <>
          <img src={url} alt="user_barcode" width={size}/>
          <div className={st.input_area}>
            <span>Barcode Size</span>
            <Slider
              className={st.slider}
              max={700}
              value={[size]}
              step={1}
              onValueChange={(e) => {
                setSize(e[0]);
              }}
            />
          </div>
        </>
      }

      <Button
        className={st.button}
        onClick={() => {
          getBarcode();
        }}
      >
        Generate URL
        <Link className={st.icon}/>
      </Button>

      { url &&
          <Button
          className={st.button}
          onClick={() => {
            handleDownload(url)
          }}
        >
          Download Image
          <Download className={st.icon}/>
        </Button>
      }
    </div>
  )
}

export default Barcode
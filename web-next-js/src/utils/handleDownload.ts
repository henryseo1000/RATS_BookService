import { toast } from 'sonner';

export const handleDownload = (url : string, file_name?: string) => {
    if (!url) {
      alert("URL을 먼저 생성해주세요!!");
      return;
    }

    const urlPromise = fetch(url)
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    })
    .then((dataURL) => {
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = file_name ?? "untitled";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })

    toast.promise(urlPromise, {
      loading: "다운로드 URL 생성중...",
      success: "다운로드 URL 생성 완료!",
      error: "앗... 뭔가 문제가 발생했어요"
    })
}
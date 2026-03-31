const utcToKorea = (creationTime : number, options = "default") => {
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    const koreaNow = new Date(creationTime + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

    if (options == "default") {
        return koreaNow.getFullYear() + "년 " + (koreaNow.getMonth() + 1) + "월 " + koreaNow.getDate() + "일, " + koreaNow.getHours() + "시 " + koreaNow.getMinutes() + "분";
    }
    else if (options == "onlyDate") {
        return koreaNow.getFullYear() + "년 " + (koreaNow.getMonth() + 1) + "월 " + koreaNow.getDate() + "일";
    }
    else {
        return koreaNow.getHours() + "시 " + koreaNow.getMinutes() + "분";
    }
}

export default utcToKorea;
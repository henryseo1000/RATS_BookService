import { UserDataType } from '@/types/common/UserDataType';
import { atom } from 'recoil';

export const userDataState = atom<UserDataType>({
    key: 'user',
    default: {
        name: "",
        login_id: "",
        user_id: "",
        student_id: "",
        major: "",
        grade : null
    }
});
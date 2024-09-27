import { atom } from "recoil";

const navState = atom<boolean>({
    key : 'navState',
    default: false
}); 
import {create} from 'zustand';

interface UserInfo {
    username: string,
    password: string,
    setUsername: (username : string) => void,
    setPassword: (password : string) => void
}

const useUserInfoStore = create<UserInfo>(set => ({
    username: "",
    password: "",
    setUsername: (username : string) => set({username: username}),
    setPassword: (password : string) => set({password: password})
}))

export {useUserInfoStore};
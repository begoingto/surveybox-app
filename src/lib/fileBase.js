import {avatarDefault} from "@/lib/siteConfig";

export const fileImgUrl = (path) => process.env.NEXT_PUBLIC_IMG_BASE_URL + path

export const getUserAvatar = (avatar) => avatar ?  ((avatar.startsWith('https')||avatar.startsWith('blob')) ? avatar : fileImgUrl(avatar)) :  avatarDefault.src
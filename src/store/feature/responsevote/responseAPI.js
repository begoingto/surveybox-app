import {redirect} from "next/navigation";

export async function getVoteBy(uuid){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/votes/uuid/${uuid}`).then((res) => {
        if (!res.ok) {
            redirect('/404')
        }

        return res.json()
    })
    return res.data

}
import {redirect} from "next/navigation";

export async function getSurveyBy(uuid){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/surveys/uuid/${uuid}`).then((res) => {
        if (!res.ok) {
            redirect('/404')
        }
        return res.json()
    })
    return res.data
}
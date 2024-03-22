'use client'

import { useRouter } from 'next/navigation'
import {Button} from "@/app/components/button";

export default function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <>
            <Button icon={{iconName: "close"}} className="sticky top-6 m-6"/>
            {children}
        </>
    )
}
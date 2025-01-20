"use client"
import { CubeSpinner } from "react-spinners-kit";

export default function loading() {
  return (
    <div className="w-full h-full flex items-center justify-center  loadBox">
        <CubeSpinner size={55} frontColor="white" backColor="black"/>
    </div>
  )
}

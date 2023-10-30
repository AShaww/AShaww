
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const imageWidth = 220;
  const imageHeight = 220; 

  return (
    <>
    <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="-mt-52"> 
          <Image
            src={`https://via.placeholder.com/${imageWidth}x${imageHeight}`}
            alt="Placeholder"
            width={imageWidth}
            height={imageHeight}
            className=""
          />
        </div>
        <div className="mt-4">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}

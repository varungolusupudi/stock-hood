"use client";
import Navbar from "@/components/ui/Navbar";
import { useState, useEffect } from "react";
import LeftPanel from "./_dashboard/leftPanel";
import RightPanel from "./_dashboard/rightPanel";
import MiddlePanel from "./_dashboard/middlePanel";
import CreatePost from "./_dashboard/_middlePanel/createPost";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  async function handleModalSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const post = formData.get("post");

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
              content: post,
              sentiment: sentiment,
            }),
          });
          const data = await response.json();
          console.log("Response:", data);

          form.reset();
          setIsModalOpen(false);
          setSentiment(null);
          setRefreshKey(prevKey => prevKey + 1);
      } catch (error) {
          console.error(error);
      }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    isLoading ? (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-900"></div>
      </div>
    ) : (
    <div className="flex flex-col h-screen">
      {isModalOpen && 
      <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setIsModalOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
          <CreatePost handleSubmit={handleModalSubmit} sentiment={sentiment} setSentiment={setSentiment} />
        </div>
      </div>
      }
      <Navbar/>
      <div className="flex flex-row flex-1 overflow-hidden">
        <LeftPanel onPostClick={() => setIsModalOpen(true)}/>
        <MiddlePanel refreshKey={refreshKey} />
        <RightPanel />
      </div>
    </div>
    )
  );
}
  
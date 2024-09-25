"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";
import { useLink } from "./LinkContext";
import React, { useState } from "react";

// Utility function to convert a Blob to an MP4 file
const downloadMp4File = async (link: string) => {
    const response = await fetch(link);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log("Video downloaded and converted successfully.");
    return url;
};

interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string; // Assuming this is the link of the video to convert
}

const MeetingCard = ({
    title,
    date,
    icon,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
    const { setLink } = useLink();
    const { toast } = useToast();
    const [isConverting, setIsConverting] = useState(false);
    const [summary, setSummary] = useState("");

    const handleConvert = async () => {
        setIsConverting(true);
        try {
            // Convert video link to .mp4 and log the output
            const mp4Url = await downloadMp4File(link);
            console.log("MP4 URL:", mp4Url);

            // Here you would integrate video summarization or other processing logic
            // For now, let's assume you generate a summary based on the mp4Url
            const result = "Generated summary for the video.";
            setSummary(result);
            toast({ title: "Summary fetched successfully!" });
            console.log(result);
        } catch (error) {
            console.error("Error during conversion:", error);
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
            <article className="flex flex-col gap-5">
                <Image src={icon} alt="upcoming" width={28} height={28} />
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative")}>
                <div className="relative flex w-full max-sm:hidden">
                    {avatarImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt="attendees"
                            width={40}
                            height={40}
                            className={cn("rounded-full", { absolute: index > 0 })}
                            style={{ top: 0, left: index * 28 }}
                        />
                    ))}
                    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleConvert} className="bg-blue-500" disabled={isConverting}>
                            {isConverting ? "Converting..." : "Summary"}
                        </Button>
                        <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
                            {buttonIcon1 && <Image src={buttonIcon1} alt="feature" width={20} height={20} />}
                            &nbsp; {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast({ title: "Link Copied" });
                                setLink(link);
                            }}
                            className="bg-dark-4 px-6"
                        >
                            <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
            {summary && ( // Display summary if exists
                <div className="mt-4 p-2 border border-gray-200 bg-gray-100">
                    <h2 className="font-bold">Summary:</h2>
                    <p>{summary}</p>
                </div>
            )}
        </section>
    );
};

export default MeetingCard;

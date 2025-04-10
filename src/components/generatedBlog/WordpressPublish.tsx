"use client"

import { marked } from 'marked';
import React, { useState } from 'react'
import { FaWordpress } from 'react-icons/fa';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ImInfo } from "react-icons/im";

type WordpressPublishProps = {
    markdown: string;
    blogTitle: string;
}

// const baseWpUrl = "https://desiertotours.es";
// const username = "elouazzani.m.a@gmail.com";
// const appPassword = "uS6E 0IJK CAAw Xna5 rFPU Hozt";

const WordpressPublish = ({ markdown, blogTitle }: WordpressPublishProps) => {

    const [postNeededInfo, setPostNeededInfo] = useState<{
        username: string,
        appPassword: string;
        baseWpUrl: string;
    }>({
        username: "",
        appPassword: "",
        baseWpUrl: ""
    })

    const [isLoading, setIsLoading] = useState<boolean>(false);


    async function publishPost(usern: string, appWp: string, url: string, title: string, markdownContent: string) {
        const htmlContent = marked(markdownContent);
        const username = usern;
        const appPassword = appWp;
        const auth = btoa(`${username}:${appPassword}`);

        try {
            setIsLoading(true);
            const response = await fetch(`${url}/wp-json/wp/v2/posts`, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${auth}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    content: htmlContent,
                    status: "draft",
                    date: "2025-03-13T10:00:00"
                })
            });

            if (!response.ok) {
                setIsLoading(false);
                alert("Error publishing post. Please check your credentials and try again.");
                return;
            }

        } catch (error) {
            setIsLoading(false);
            alert("Error publishing post. Please check your credentials and try again : " + error);
        }
        finally {
            setIsLoading(false);
        }
    }


    const handleSubmit = () => {
        if (postNeededInfo.username === "" || postNeededInfo.appPassword === "") {
            alert("Please fill in all fields.");
            return;
        }

        publishPost(postNeededInfo.username, postNeededInfo.appPassword, postNeededInfo.baseWpUrl, blogTitle, markdown);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-2 px-4 py-2 bg-[#076d81] text-white rounded cursor-pointer hover:bg-[#076d81]">Publish to Wordpress <FaWordpress size={23} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Publish to Wordpress</DialogTitle>

                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="baseWpUrl" className="text-right">
                            Base Url
                            <div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ImInfo />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div>
                                                Base Url Of Your Wordpress Account (https://example.com)
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </Label>
                        <Input
                            id="baseWpUrl"
                            value={postNeededInfo.baseWpUrl}
                            onChange={(e) => setPostNeededInfo({ ...postNeededInfo, baseWpUrl: e.target.value })}
                            name="baseWpUrl"
                            className="col-span-3"
                            placeholder='https://example.com'
                        />
                    </div>


                    <div className="flex flex-col gap-2 mt-5">
                        <Label htmlFor="username" className="text-right">
                            Username
                            <div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ImInfo />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div>
                                                Username Of Your Wordpress Account
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </Label>
                        <Input
                            id="username"
                            value={postNeededInfo.username}
                            onChange={(e) => setPostNeededInfo({ ...postNeededInfo, username: e.target.value })}
                            name="username"
                            className="col-span-3"
                            placeholder='@username'
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <Label htmlFor="appPassword" className="text-right">
                            Application Password
                            <div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ImInfo />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div>
                                                Application Password Of Your Wordpress Account
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </Label>
                        <Input
                            id="appPassword"
                            value={postNeededInfo.appPassword}
                            onChange={(e) => setPostNeededInfo({ ...postNeededInfo, appPassword: e.target.value })}
                            name="appPassword"
                            className="col-span-3"
                            placeholder='Example : aX3G 2LMN ZB8w Tqv7 jP4U Kdqs'
                        />
                    </div>
                </div>


                <DialogFooter>
                    {
                        !isLoading
                            ? <Button className="mt-2 px-4 py-2 bg-[#652293] hover:bg-[#652293] text-white rounded cursor-pointer" onClick={handleSubmit} type="submit">Publish It</Button>
                            : <div>
                                <Button className="mt-2 px-4 py-2 bg-[#a87fc4] text-white rounded cursor-not-allowed" type="submit">Loading ...</Button>
                            </div>
                    }

                </DialogFooter>
            </DialogContent>
        </Dialog>
        // <button 
        //     onClick={publishWP}
        //     className="mt-2 px-4 py-2 bg-[#2271b1] text-white rounded cursor-pointer flex items-center gap-3">
        //     Publish to Wordpress <FaWordpress size={23} />
        // </button>
    )
}

export default WordpressPublish

// pwd:simo123
// user:belalia
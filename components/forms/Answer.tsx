"use client"

import React, { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form"
import { z } from "zod"
import { AnswerSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { Editor } from "@tinymce/tinymce-react"
import { useRef, useState } from "react"
import { useTheme } from "@/context/ThemeProvider"
import { Button } from "../ui/button"
import Image from "next/image"

// interface AnswerProps {
// }

const Answer = () => {
    const editorRef = useRef(null);
    const [submitting, setSubmitting] = useState(false)

    const { mode } = useTheme()
    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues: {
            answer: ''
        }
    })
    const handleCreateAnswer = () => {
        console.log('create answer')
    }
    return (
        <div>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <h4 className="paragraph-semibold text-dark400_light800 ">Write your answer here</h4>
                <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
                    <Image
                        src="/assets/icons/stars.svg"
                        alt="star"
                        width={12}
                        height={12}
                        className="object-contain "
                    />
                    Generate an AI answer
                </Button>
            </div>
            <Form {...form}>
                <form className="mt-6 flex w-full flex-col gap-10"
                    onSubmit={form.handleSubmit(handleCreateAnswer)}
                >
                    <FormField
                        control={form.control}
                        name="answer"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-3">
                                <FormControl className="mt-3.5">
                                    <Editor
                                        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                                        onInit={(_evt, editor) => {
                                            // @ts-ignore
                                            editorRef.current = editor;
                                        }}
                                        onBlur={field.onBlur}
                                        onEditorChange={(content) => field.onChange(content)}
                                        init={{
                                            height: 350,
                                            menubar: false,
                                            plugins: [
                                                "anchor",
                                                "autolink",
                                                "charmap",
                                                "codesample",
                                                "emoticons",
                                                "image",
                                                "link",
                                                "lists",
                                                "media",
                                                "searchreplace",
                                                "table",
                                                "visualblocks",
                                                "wordcount",
                                                "checklist",
                                                "mediaembed",
                                                "casechange",
                                                "export",
                                                "formatpainter",
                                                "pageembed",
                                                "linkchecker",
                                                "a11ychecker",
                                                "tinymcespellchecker",
                                                "advtable",
                                                "advcode",
                                                "advtemplate",
                                                "ai",
                                                "mentions",
                                                "tinycomments",
                                                "tableofcontents",
                                                "footnotes",
                                                "mergetags",
                                                "autocorrect",
                                                "typography",
                                                "inlinecss",
                                                "markdown",
                                                "codeSample",
                                            ],
                                            toolbar:
                                                "undo redo | codeSample | blocks fontfamily fontsize | bold italic forecolor underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                            tinycomments_mode: "embedded",
                                            tinycomments_author: "Simon Julius",
                                            mergetags_list: [
                                                { value: "First.Name", title: "First Name" },
                                                { value: "Email", title: "Email" },
                                            ],
                                            content_style: "body { font-family:Inter; font-size:16px }",
                                            skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                                            content_css: mode === 'dark' ? 'dark' : 'light',
                                            ai_request: (
                                                _request: any,
                                                respondWith: {
                                                    string: (arg0: () => Promise<never>) => any;
                                                }
                                            ) =>
                                                respondWith.string(() =>
                                                    // eslint-disable-next-line prefer-promise-reject-errors
                                                    Promise.reject("See docs to implement AI Assistant")
                                                ),
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className="body-regular mt-2.5 text-light-500">
                                    Introduce the problem and expand on what you put in the title.
                                    Minimum 20 characters.
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            className="primary-gradient w-fit text-white"
                            disabled={submitting}
                            onClick={() => setSubmitting(!submitting)}
                        >
                            {
                                submitting ? 'Submitting' : 'Submit'
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Answer
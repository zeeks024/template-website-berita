"use client";

import { useEffect, useRef, useState } from 'react';
import { readFileAsDataURL } from '@/lib/imageUtils';
import {
    Undo2, Redo2, Heading2, Heading3, Pilcrow,
    Bold, Italic, Underline, Strikethrough,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    ListOrdered, List, Quote, Minus, Link2, ImagePlus,
    RotateCcw
} from 'lucide-react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    autosaveKey?: string;
}

interface ToolbarButtonProps {
    cmd: string;
    arg?: string;
    label: string;
    icon: React.ReactNode;
    onExec: (cmd: string, arg?: string) => void;
}

const ToolbarButton = ({ cmd, arg, label, icon, onExec }: ToolbarButtonProps) => (
    <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onExec(cmd, arg); }}
        title={label}
        className="p-1.5 rounded hover:bg-gray-100 active:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center min-w-[28px]"
    >
        {icon}
    </button>
);

const ToolbarDivider = () => (
    <span className="w-px h-6 bg-gray-200 mx-1" />
);

export default function RichTextEditor({ value, onChange, autosaveKey = 'editor_autosave' }: Props) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [hasDraft, setHasDraft] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(autosaveKey);
            setHasDraft(!!(saved && saved.length > 20));
        }
    }, [autosaveKey]);

    useEffect(() => {
        if (isMounted && editorRef.current && value && editorRef.current.innerHTML !== value) {
            const currentHTML = editorRef.current.innerHTML;
            if (currentHTML === '<br>' || currentHTML === '' || currentHTML !== value) {
                if (document.activeElement !== editorRef.current) {
                    editorRef.current.innerHTML = value;
                }
            }
        }
    }, [isMounted, value]);

    const exec = (command: string, val: string | undefined = undefined) => {
        document.execCommand(command, false, val);
        editorRef.current?.focus();
        handleInput();
    };

    const handleInput = () => {
        if (editorRef.current) {
            const val = editorRef.current.innerHTML;
            onChange(val);
            localStorage.setItem(autosaveKey, val);
        }
    };

    const restoreDraft = () => {
        const saved = localStorage.getItem(autosaveKey);
        if (saved && confirm("Pulihkan draft terakhir? Konten saat ini akan tertimpa.")) {
            onChange(saved);
            if (editorRef.current) editorRef.current.innerHTML = saved;
            setHasDraft(false);
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const dataUrl = await readFileAsDataURL(file);
                exec('insertImage', dataUrl);
                if (fileInputRef.current) fileInputRef.current.value = '';
            } catch (err) {
                alert("Gagal membaca gambar");
                console.error(err);
            }
        }
    };

    const handleLinkInsert = () => {
        const url = prompt("Masukkan URL:");
        if (url) exec("createLink", url);
    };

    return (
        <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white">
            <div className="px-2 sm:px-3 py-2 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center gap-0.5 sticky top-0 z-10 overflow-x-auto">
                {hasDraft && (
                    <>
                        <button
                            type="button"
                            onClick={restoreDraft}
                            className="px-2 py-1 rounded text-xs font-medium text-amber-600 border border-amber-300 bg-amber-50 hover:bg-amber-100 transition-colors flex items-center gap-1 mr-2"
                            title="Pulihkan draft tersimpan"
                        >
                            <RotateCcw size={12} />
                            Pulihkan Draft
                        </button>
                        <ToolbarDivider />
                    </>
                )}

                <ToolbarButton cmd="undo" label="Undo" icon={<Undo2 size={16} />} onExec={exec} />
                <ToolbarButton cmd="redo" label="Redo" icon={<Redo2 size={16} />} onExec={exec} />
                <ToolbarDivider />

                <ToolbarButton cmd="formatBlock" arg="H2" label="Heading 2" icon={<Heading2 size={16} />} onExec={exec} />
                <ToolbarButton cmd="formatBlock" arg="H3" label="Heading 3" icon={<Heading3 size={16} />} onExec={exec} />
                <ToolbarButton cmd="formatBlock" arg="p" label="Paragraph" icon={<Pilcrow size={16} />} onExec={exec} />
                <ToolbarDivider />

                <ToolbarButton cmd="bold" label="Bold (Ctrl+B)" icon={<Bold size={16} />} onExec={exec} />
                <ToolbarButton cmd="italic" label="Italic (Ctrl+I)" icon={<Italic size={16} />} onExec={exec} />
                <ToolbarButton cmd="underline" label="Underline (Ctrl+U)" icon={<Underline size={16} />} onExec={exec} />
                <ToolbarButton cmd="strikeThrough" label="Strikethrough" icon={<Strikethrough size={16} />} onExec={exec} />
                <ToolbarDivider />

                <ToolbarButton cmd="justifyLeft" label="Align Left" icon={<AlignLeft size={16} />} onExec={exec} />
                <ToolbarButton cmd="justifyCenter" label="Align Center" icon={<AlignCenter size={16} />} onExec={exec} />
                <ToolbarButton cmd="justifyRight" label="Align Right" icon={<AlignRight size={16} />} onExec={exec} />
                <ToolbarButton cmd="justifyFull" label="Justify" icon={<AlignJustify size={16} />} onExec={exec} />
                <ToolbarDivider />

                <ToolbarButton cmd="insertOrderedList" label="Numbered List" icon={<ListOrdered size={16} />} onExec={exec} />
                <ToolbarButton cmd="insertUnorderedList" label="Bullet List" icon={<List size={16} />} onExec={exec} />
                <ToolbarDivider />

                <ToolbarButton cmd="formatBlock" arg="blockquote" label="Quote" icon={<Quote size={16} />} onExec={exec} />
                <ToolbarButton cmd="insertHorizontalRule" label="Horizontal Line" icon={<Minus size={16} />} onExec={exec} />

                <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleLinkInsert(); }}
                    className="p-1.5 rounded hover:bg-gray-100 active:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center min-w-[28px]"
                    title="Insert Link"
                >
                    <Link2 size={16} />
                </button>

                <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
                    className="p-1.5 rounded hover:bg-gray-100 active:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center min-w-[28px]"
                    title="Insert Image"
                >
                    <ImagePlus size={16} />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </div>

            <div 
                className="bg-gray-100 p-6 md:p-8 cursor-text min-h-[500px]" 
                onClick={() => editorRef.current?.focus()}
            >
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    spellCheck={false}
                    className="min-h-[400px] max-w-3xl mx-auto p-8 md:p-12 bg-white shadow-lg rounded-sm outline-none prose prose-gray prose-lg max-w-none
                        [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-gray-900 [&_h2]:border-b [&_h2]:border-gray-200 [&_h2]:pb-2
                        [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-gray-800
                        [&_p]:mb-4 [&_p]:leading-relaxed
                        [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:list-disc
                        [&_ol]:ml-6 [&_ol]:mb-4 [&_ol]:list-decimal
                        [&_li]:mb-1
                        [&_blockquote]:border-l-4 [&_blockquote]:border-cyan-500 [&_blockquote]:my-5 [&_blockquote]:py-2 [&_blockquote]:px-5 [&_blockquote]:bg-gray-50 [&_blockquote]:text-gray-600 [&_blockquote]:italic
                        [&_a]:text-cyan-600 [&_a]:underline [&_a]:cursor-pointer
                        [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4 [&_img]:rounded [&_img]:shadow-md
                        [&_hr]:border-none [&_hr]:border-t [&_hr]:border-gray-300 [&_hr]:my-6"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                />
            </div>
        </div>
    );
}

"use client";

import { useEffect, useRef, useState } from 'react';
import { readFileAsDataURL } from '@/lib/imageUtils';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [hasDraft, setHasDraft] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Check for draft
        const saved = localStorage.getItem('editor_autosave_temp');
        if (saved && saved.length > 20) { // Only if significant content
            setHasDraft(true);
        }
    }, []);

    // Sync initial value once
    useEffect(() => {
        if (isMounted && editorRef.current && value && editorRef.current.innerHTML !== value) {
            const currentHTML = editorRef.current.innerHTML;
            // Only update if significantly different or empty to avoid cursor jumps
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
        handleInput(); // Force sync
    };

    const handleInput = () => {
        if (editorRef.current) {
            const val = editorRef.current.innerHTML;
            onChange(val);
            // Auto-save logic
            localStorage.setItem('editor_autosave_temp', val);
        }
    };

    const restoreDraft = () => {
        const saved = localStorage.getItem('editor_autosave_temp');
        if (saved && confirm("Apakah Anda yakin ingin memulihkan draft terakhir? Konten saat ini akan tertimpa.")) {
            onChange(saved);
            if (editorRef.current) editorRef.current.innerHTML = saved;
            setHasDraft(false); // Hide button after restore
        }
    };

    // New Image Handler
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const dataUrl = await readFileAsDataURL(file);
                // Insert image at cursor
                exec('insertImage', dataUrl);
                // Clear input
                if (fileInputRef.current) fileInputRef.current.value = '';
            } catch (err) {
                alert("Gagal membaca gambar");
                console.error(err);
            }
        }
    };

    const ToolbarButton = ({ cmd, arg, label, icon }: { cmd: string, arg?: string, label: string, icon: React.ReactNode }) => (
        <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); exec(cmd, arg); }} // onMouseDown prevents focus loss
            title={label}
            className="btn-toolbar"
        >
            {icon}
        </button>
    );

    const ToolbarDivider = () => (
        <span style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 4px' }}></span>
    );

    return (
        <div className="rich-text-editor-container" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #e5e5e5', background: 'white' }}>

            {/* Toolbar - Sticky */}
            <div style={{
                padding: '10px 14px', background: 'white',
                borderBottom: '1px solid #e5e5e5',
                display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 10
            }}>
                {/* Draft Restore Button */}
                {hasDraft && (
                    <>
                        <button
                            type="button"
                            onClick={restoreDraft}
                            className="btn-toolbar"
                            style={{ color: 'var(--accent-orange)', fontWeight: 'bold', marginRight: '8px', border: '1px solid var(--accent-orange)' }}
                            title="Pulihkan draft yang tersimpan otomatis"
                        >
                            📂 Pulihkan Draft
                        </button>
                        <ToolbarDivider />
                    </>
                )}

                {/* History */}
                <ToolbarButton cmd="undo" label="Undo" icon="↩" />
                <ToolbarButton cmd="redo" label="Redo" icon="↪" />
                <ToolbarDivider />

                {/* Text Style */}
                <ToolbarButton cmd="formatBlock" arg="H2" label="Heading 2" icon={<span style={{ fontWeight: 700 }}>H2</span>} />
                <ToolbarButton cmd="formatBlock" arg="H3" label="Heading 3" icon={<span style={{ fontWeight: 700, fontSize: '12px' }}>H3</span>} />
                <ToolbarButton cmd="formatBlock" arg="p" label="Paragraph" icon="¶" />
                <ToolbarDivider />

                {/* Inline Formatting */}
                <ToolbarButton cmd="bold" label="Bold (Ctrl+B)" icon={<strong style={{ fontFamily: 'serif' }}>B</strong>} />
                <ToolbarButton cmd="italic" label="Italic (Ctrl+I)" icon={<em style={{ fontFamily: 'serif' }}>I</em>} />
                <ToolbarButton cmd="underline" label="Underline (Ctrl+U)" icon={<u style={{ fontFamily: 'serif' }}>U</u>} />
                <ToolbarButton cmd="strikeThrough" label="Strikethrough" icon={<s style={{ fontFamily: 'serif' }}>S</s>} />
                <ToolbarDivider />

                {/* Alignment */}
                <ToolbarButton cmd="justifyLeft" label="Align Left" icon="⇤" />
                <ToolbarButton cmd="justifyCenter" label="Align Center" icon="⫷⫸" />
                <ToolbarButton cmd="justifyRight" label="Align Right" icon="⇥" />
                <ToolbarButton cmd="justifyFull" label="Justify" icon="≣" />
                <ToolbarDivider />

                {/* Lists & Indent */}
                <ToolbarButton cmd="insertOrderedList" label="Numbered List" icon="1." />
                <ToolbarButton cmd="insertUnorderedList" label="Bullet List" icon="•" />
                <ToolbarDivider />

                {/* Inserts */}
                <ToolbarButton cmd="formatBlock" arg="blockquote" label="Quote" icon="❞" />
                <ToolbarButton cmd="insertHorizontalRule" label="Horizontal Line" icon="―" />

                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        const url = prompt("Masukkan URL Link:");
                        if (url) exec("createLink", url);
                    }}
                    className="btn-toolbar"
                    title="Insert Link"
                >
                    🔗
                </button>

                {/* Image Upload Button */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        fileInputRef.current?.click();
                    }}
                    className="btn-toolbar"
                    title="Insert Image (Upload)"
                >
                    🖼️
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
            </div>

            {/* Editor Area - "Paper" Look */}
            <div style={{ background: '#f5f5f5', padding: '2rem', flex: 1, cursor: 'text' }} onClick={() => editorRef.current?.focus()}>
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    className="rich-editor-content document-page"
                    spellCheck={false}
                    style={{
                        minHeight: '600px',
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '3rem',
                        background: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        outline: 'none',
                        color: '#1a1a1a', // Force black text on "paper"
                    }}
                />
            </div>

            <style jsx global>{`
                .btn-toolbar {
                    padding: 6px 8px;
                    border-radius: 4px;
                    border: 1px solid transparent;
                    border-radius: 4px;
                    border: 1px solid transparent;
                    background: transparent;
                    color: #333;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 32px;
                    font-size: 14px;
                    transition: all 0.1s;
                }
                .btn-toolbar:hover {
                    background: rgba(0,0,0,0.05);
                    border-color: var(--glass-border);
                }
                .btn-toolbar:active {
                    background: rgba(0,0,0,0.1);
                    transform: translateY(1px);
                }

                /* Document Typography */
                .document-page { font-family: 'Times New Roman', serif; line-height: 1.6; font-size: 16px; }
                .document-page h2 { font-family: 'Arial', sans-serif; font-size: 24px; font-weight: 700; margin-top: 24px; margin-bottom: 12px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 6px; }
                .document-page h3 { font-family: 'Arial', sans-serif; font-size: 18px; font-weight: 700; margin-top: 20px; margin-bottom: 10px; color: #333; }
                .document-page p { margin-bottom: 16px; }
                .document-page ul, .document-page ol { margin-left: 24px; margin-bottom: 16px; }
                .document-page li { margin-bottom: 4px; }
                .document-page blockquote { 
                    border-left: 4px solid var(--accent-blue); 
                    margin: 20px 0; padding: 10px 20px; 
                    background: #f8f9fa; color: #555; 
                    font-style: italic;
                }
                .document-page a { color: #2563eb; text-decoration: underline; cursor: pointer; }
                .document-page img { max-width: 100%; height: auto; margin: 10px 0; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .document-page hr { border: none; border-top: 1px solid #ccc; margin: 24px 0; }
                
                /* Dark mode manual override for Paper if needed, but docs are usually white. 
                   Keeping it white for "Word" feel even in dark mode */
            `}</style>
        </div>
    );
}

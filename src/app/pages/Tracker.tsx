import { useState, useEffect, useRef } from "react";
import {
  Plus, Search, Tag, Trash2, Lock, Users, BookmarkMinus,
  ExternalLink, X, ChevronDown, ChevronRight, GripVertical,
  FileText, Calendar, Hash, Edit3, Check
} from "lucide-react";
import { Link } from "react-router";
import { services } from "../data/servicesData";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  serviceId?: string;
  timestamp: string;
  updatedAt: string;
  isShared: boolean;
  isPinned: boolean;
  color?: string;
}

const STORAGE_KEY = "sb-tracker-notes";
const BOOKMARKS_KEY = "sb-bookmarks";

const NOTE_COLORS = [
  { id: "none", label: "None", class: "" },
  { id: "stone", label: "Stone", class: "border-l-4 border-l-stone-300 dark:border-l-stone-600" },
  { id: "blue", label: "Blue", class: "border-l-4 border-l-blue-200 dark:border-l-blue-800" },
  { id: "green", label: "Green", class: "border-l-4 border-l-green-200 dark:border-l-green-800" },
  { id: "amber", label: "Amber", class: "border-l-4 border-l-amber-200 dark:border-l-amber-700" },
  { id: "rose", label: "Rose", class: "border-l-4 border-l-rose-200 dark:border-l-rose-800" },
];

function loadNotes(): Note[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveNotes(notes: Note[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }
  catch { /* no-op */ }
}
function loadBookmarkIds(): string[] {
  try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]"); }
  catch { return []; }
}
function removeBookmark(id: string) {
  try {
    const saved = loadBookmarkIds().filter((b) => b !== id);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(saved));
  } catch { /* no-op */ }
}

// Inline editable title
function EditableTitle({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft.trim()) onChange(draft.trim());
    else setDraft(value);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
        className="text-foreground bg-transparent border-b border-border focus:outline-none text-base w-full"
      />
    );
  }
  return (
    <button
      onClick={() => { setDraft(value); setEditing(true); }}
      className="text-foreground text-left hover:opacity-70 transition-opacity flex items-center gap-1.5 group"
    >
      {value}
      <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
    </button>
  );
}

export function Tracker() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [bookmarkIds, setBookmarkIds] = useState<string[]>(loadBookmarkIds);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [showNewNote, setShowNewNote] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newServiceId, setNewServiceId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [contentDraft, setContentDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { saveNotes(notes); }, [notes]);
  useEffect(() => {
    if (editingContent && textareaRef.current) textareaRef.current.focus();
  }, [editingContent]);

  const handleAddNote = () => {
    if (!newTitle.trim() && !newContent.trim()) return;
    const now = new Date().toISOString();
    const note: Note = {
      id: Date.now().toString(),
      title: newTitle.trim() || "Untitled",
      content: newContent.trim(),
      tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
      serviceId: newServiceId || undefined,
      timestamp: now,
      updatedAt: now,
      isShared: false,
      isPinned: false,
      color: "none",
    };
    const updated = [note, ...notes];
    setNotes(updated);
    setActiveNote(note.id);
    setNewTitle(""); setNewContent(""); setNewTags(""); setNewServiceId("");
    setShowNewNote(false);
  };

  const updateNote = (id: string, patch: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n)
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeNote === id) setActiveNote(null);
  };

  const togglePin = (id: string) => {
    setNotes((prev) => prev.map((n) => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const handleUnbookmark = (serviceId: string) => {
    removeBookmark(serviceId);
    setBookmarkIds((prev) => prev.filter((id) => id !== serviceId));
  };

  const filteredNotes = notes
    .filter((n) => {
      const q = searchQuery.toLowerCase();
      return !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const bookmarkedServices = bookmarkIds.map((id) => services.find((s) => s.id === id)).filter(Boolean) as typeof services;

  const openNote = notes.find((n) => n.id === activeNote);

  const formatDate = (ts: string) => {
    const d = new Date(ts);
    const now = new Date();
    const diffH = Math.floor((now.getTime() - d.getTime()) / 3600000);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    if (diffH < 48) return "Yesterday";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const colorClass = (color?: string) =>
    NOTE_COLORS.find((c) => c.id === color)?.class || "";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Page header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl text-foreground mb-1.5">Personal Tracker</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Stored locally in your browser. Nothing leaves your device.
          </p>
        </div>
        <button
          onClick={() => { setShowNewNote(true); setActiveNote(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          New note
        </button>
      </div>

      <div className="flex gap-6 items-start">

        {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
        <div className="w-64 shrink-0 hidden md:block">

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Bookmarks section */}
          {bookmarkedServices.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowBookmarks(!showBookmarks)}
                className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-foreground mb-1.5 px-1"
              >
                <span className="flex items-center gap-1.5 uppercase tracking-wide font-medium">
                  <Hash className="w-3 h-3" /> Bookmarks
                </span>
                {showBookmarks ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
              {showBookmarks && (
                <div className="space-y-0.5">
                  {bookmarkedServices.map((s) => (
                    <div key={s.id} className="group flex items-center justify-between px-2 py-1.5 rounded hover:bg-muted transition-colors">
                      <Link to={`/services/${s.id}`} className="text-sm text-muted-foreground hover:text-foreground truncate flex-1">
                        {s.name}
                      </Link>
                      <button
                        onClick={() => handleUnbookmark(s.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0"
                      >
                        <BookmarkMinus className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notes list */}
          <div>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-foreground mb-1.5 px-1"
            >
              <span className="flex items-center gap-1.5 uppercase tracking-wide font-medium">
                <FileText className="w-3 h-3" /> Notes
                {filteredNotes.length > 0 && <span className="text-muted-foreground/60">{filteredNotes.length}</span>}
              </span>
              {showNotes ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>

            {showNotes && (
              <div className="space-y-0.5">
                {filteredNotes.length === 0 && (
                  <p className="text-xs text-muted-foreground px-2 py-2">
                    {searchQuery ? "No results." : "No notes yet."}
                  </p>
                )}
                {filteredNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => { setActiveNote(note.id); setShowNewNote(false); }}
                    className={`w-full text-left px-2 py-2 rounded transition-colors group flex items-start gap-1.5 ${
                      activeNote === note.id
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <GripVertical className="w-3 h-3 mt-0.5 shrink-0 opacity-0 group-hover:opacity-30" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{note.isPinned ? "📌 " : ""}{note.title}</p>
                      <p className="text-xs opacity-50 mt-0.5">{formatDate(note.updatedAt)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── MAIN PANE ─────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* New note form */}
          {showNewNote && (
            <div className="bg-card rounded-lg border border-border p-6 mb-4">
              <h2 className="text-lg text-foreground mb-5">New note</h2>
              <div className="space-y-3">
                <input
                  autoFocus
                  type="text"
                  placeholder="Title…"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") document.getElementById("new-note-content")?.focus(); }}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <textarea
                  id="new-note-content"
                  placeholder="Write anything… notes, questions, reminders, observations."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none leading-relaxed"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Tags — comma separated…"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <select
                    value={newServiceId}
                    onChange={(e) => setNewServiceId(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Link to a service (optional)…</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleAddNote}
                    disabled={!newTitle.trim() && !newContent.trim()}
                    className="px-5 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 text-sm disabled:opacity-40 transition-opacity"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setShowNewNote(false); setNewTitle(""); setNewContent(""); setNewTags(""); setNewServiceId(""); }}
                    className="px-5 py-2 border border-border text-muted-foreground rounded-md hover:bg-muted text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Open note — Notion-style editor */}
          {openNote && !showNewNote && (
            <div className={`bg-card rounded-lg border border-border ${colorClass(openNote.color)}`}>
              {/* Note toolbar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-border">
                <div className="flex items-center gap-1">
                  {/* Color picker */}
                  <div className="flex items-center gap-0.5">
                    {NOTE_COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => updateNote(openNote.id, { color: c.id })}
                        title={c.label}
                        className={`w-4 h-4 rounded-full border transition-all ${
                          c.id === "none"
                            ? "border-border bg-muted"
                            : c.id === "stone" ? "bg-stone-300 dark:bg-stone-600 border-transparent"
                            : c.id === "blue" ? "bg-blue-200 dark:bg-blue-800 border-transparent"
                            : c.id === "green" ? "bg-green-200 dark:bg-green-800 border-transparent"
                            : c.id === "amber" ? "bg-amber-200 dark:bg-amber-700 border-transparent"
                            : "bg-rose-200 dark:bg-rose-800 border-transparent"
                        } ${openNote.color === c.id ? "ring-2 ring-offset-1 ring-ring scale-110" : "hover:scale-110"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Pin */}
                  <button
                    onClick={() => togglePin(openNote.id)}
                    title={openNote.isPinned ? "Unpin" : "Pin"}
                    className={`p-1.5 rounded text-sm transition-colors ${openNote.isPinned ? "text-foreground bg-secondary" : "text-muted-foreground hover:bg-muted"}`}
                  >
                    📌
                  </button>
                  {/* Share toggle */}
                  <button
                    onClick={() => updateNote(openNote.id, { isShared: !openNote.isShared })}
                    title={openNote.isShared ? "Mark private" : "Mark shareable"}
                    className={`p-1.5 rounded transition-colors ${openNote.isShared ? "text-foreground bg-secondary" : "text-muted-foreground hover:bg-muted"}`}
                  >
                    {openNote.isShared ? <Users className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => deleteNote(openNote.id)}
                    className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Note body */}
              <div className="px-6 py-6">
                {/* Title */}
                <div className="mb-5">
                  <EditableTitle
                    value={openNote.title}
                    onChange={(v) => updateNote(openNote.id, { title: v })}
                  />
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Created {new Date(openNote.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  {openNote.updatedAt !== openNote.timestamp && (
                    <span className="flex items-center gap-1">
                      <Edit3 className="w-3 h-3" />
                      Edited {formatDate(openNote.updatedAt)}
                    </span>
                  )}
                  {openNote.serviceId && services.find((s) => s.id === openNote.serviceId) && (
                    <Link
                      to={`/services/${openNote.serviceId}`}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {services.find((s) => s.id === openNote.serviceId)?.name}
                    </Link>
                  )}
                  <span className="flex items-center gap-1">
                    {openNote.isShared ? <><Users className="w-3 h-3" /> Shareable</> : <><Lock className="w-3 h-3" /> Private</>}
                  </span>
                </div>

                {/* Content — click to edit */}
                {editingContent === openNote.id ? (
                  <div>
                    <textarea
                      ref={textareaRef}
                      value={contentDraft}
                      onChange={(e) => setContentDraft(e.target.value)}
                      rows={12}
                      className="w-full bg-transparent text-foreground text-sm leading-relaxed focus:outline-none resize-none border-b border-border pb-2"
                      placeholder="Write anything…"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => { updateNote(openNote.id, { content: contentDraft }); setEditingContent(null); }}
                        className="flex items-center gap-1 text-xs text-foreground hover:opacity-70"
                      >
                        <Check className="w-3.5 h-3.5" /> Done
                      </button>
                      <button
                        onClick={() => setEditingContent(null)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => { setEditingContent(openNote.id); setContentDraft(openNote.content); }}
                    className="cursor-text group min-h-24"
                  >
                    {openNote.content ? (
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap group-hover:text-foreground transition-colors">
                        {openNote.content}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground/40 italic">
                        Click to add notes…
                      </p>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="mt-8 pt-4 border-t border-border">
                  <div className="flex flex-wrap items-center gap-2">
                    {openNote.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full group"
                      >
                        <Hash className="w-2.5 h-2.5" />{tag}
                        <button
                          onClick={() => updateNote(openNote.id, { tags: openNote.tags.filter((t) => t !== tag) })}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                    {/* Add tag inline */}
                    <AddTagInline onAdd={(tag) => {
                      if (!openNote.tags.includes(tag)) updateNote(openNote.id, { tags: [...openNote.tags, tag] });
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!openNote && !showNewNote && (
            <div className="bg-card rounded-lg border border-border p-16 text-center">
              <FileText className="w-8 h-8 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {filteredNotes.length === 0
                  ? "No notes yet. Create one to get started."
                  : "Select a note to open it, or create a new one."}
              </p>
              <button
                onClick={() => setShowNewNote(true)}
                className="text-sm text-foreground underline underline-offset-2 hover:opacity-70"
              >
                Create your first note
              </button>
            </div>
          )}

          {/* Mobile note list — shown when no note open on small screens */}
          <div className="md:hidden mt-6">
            {filteredNotes.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Your notes</p>
                {filteredNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => { setActiveNote(note.id); setShowNewNote(false); }}
                    className="w-full text-left bg-card p-4 rounded-lg border border-border hover:border-muted-foreground transition-colors"
                  >
                    <p className="text-sm text-foreground mb-1">{note.isPinned ? "📌 " : ""}{note.title}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(note.updatedAt)}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stats bar */}
          {(notes.length > 0 || bookmarkIds.length > 0) && (
            <div className="mt-6 p-3 rounded-md text-xs text-muted-foreground flex gap-4">
              {notes.length > 0 && <span>{notes.length} note{notes.length !== 1 ? "s" : ""}</span>}
              {bookmarkIds.length > 0 && <span>{bookmarkIds.length} bookmark{bookmarkIds.length !== 1 ? "s" : ""}</span>}
              <span className="ml-auto flex items-center gap-1"><Lock className="w-3 h-3" /> Local only</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Tiny inline tag adder
function AddTagInline({ onAdd }: { onAdd: (tag: string) => void }) {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (active) inputRef.current?.focus(); }, [active]);

  const commit = () => {
    if (value.trim()) onAdd(value.trim());
    setValue("");
    setActive(false);
  };

  if (!active) {
    return (
      <button
        onClick={() => setActive(true)}
        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 px-2 py-0.5 rounded-full border border-dashed border-border hover:border-muted-foreground transition-colors"
      >
        <Plus className="w-2.5 h-2.5" /> tag
      </button>
    );
  }

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setValue(""); setActive(false); } }}
      placeholder="tag name…"
      className="text-xs bg-input-background border border-border rounded-full px-2 py-0.5 focus:outline-none w-24 text-foreground"
    />
  );
}

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, MessageSquare } from "lucide-react";

interface Reply {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

interface Thread {
  id: string;
  title: string;
  author: string;
  category: string;
  region: string;
  timestamp: string;
  replyCount: number;
  preview: string;
}

const COMMUNITY_KEY = "sb-community-threads";
const REPLIES_KEY = "sb-thread-replies";

function loadThreads(): Thread[] {
  try {
    return JSON.parse(localStorage.getItem(COMMUNITY_KEY) || "[]");
  } catch { return []; }
}

function loadReplies(threadId: string): Reply[] {
  try {
    const all = JSON.parse(localStorage.getItem(REPLIES_KEY) || "{}");
    return all[threadId] || [];
  } catch { return []; }
}

function saveReply(threadId: string, reply: Reply) {
  try {
    const all = JSON.parse(localStorage.getItem(REPLIES_KEY) || "{}");
    all[threadId] = [...(all[threadId] || []), reply];
    localStorage.setItem(REPLIES_KEY, JSON.stringify(all));
  } catch { /* no-op */ }
}

export function ThreadDetail() {
  const { id } = useParams();
  const [thread] = useState<Thread | undefined>(() =>
    loadThreads().find((t) => t.id === id)
  );
  const [replies, setReplies] = useState<Reply[]>(() => loadReplies(id || ""));
  const [newReply, setNewReply] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const formatDate = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const h = Math.floor(diff / (1000 * 60 * 60));
    if (h < 1) return "Just now";
    if (h < 24) return `${h}h ago`;
    if (h < 48) return "Yesterday";
    return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleReply = () => {
    if (!newReply.trim()) return;
    const reply: Reply = {
      id: Date.now().toString(),
      content: newReply.trim(),
      author: isAnonymous ? "Anonymous" : "You",
      timestamp: new Date().toISOString(),
    };
    saveReply(id || "", reply);
    setReplies((prev) => [...prev, reply]);
    setNewReply("");
  };

  if (!thread) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <h2 className="text-2xl text-foreground mb-4">Thread Not Found</h2>
          <Link to="/community" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Community
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/community" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 text-sm">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Community
      </Link>

      <div className="bg-card rounded-lg border border-border p-6 mb-4">
        <div className="flex flex-wrap gap-2 items-center mb-3">
          <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
            {thread.category}
          </span>
          {thread.region !== "General" && (
            <span className="text-xs text-muted-foreground">{thread.region}</span>
          )}
        </div>
        <h1 className="text-2xl text-foreground mb-3">{thread.title}</h1>
        <p className="text-muted-foreground mb-4">{thread.preview}</p>
        <p className="text-xs text-muted-foreground">
          Posted {formatDate(thread.timestamp)} · {thread.author}
        </p>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="space-y-3 mb-6">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-card rounded-lg border border-border p-5">
              <p className="text-sm text-foreground mb-3 whitespace-pre-wrap leading-relaxed">{reply.content}</p>
              <p className="text-xs text-muted-foreground">
                {reply.author} · {formatDate(reply.timestamp)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Reply form */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-foreground mb-3 flex items-center gap-2 text-sm">
          <MessageSquare className="w-4 h-4" />
          Reply to this thread
        </h3>
        <textarea
          placeholder="Share your thoughts or experience…"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-3"
        />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded"
            />
            Reply anonymously
          </label>
          <button
            onClick={handleReply}
            disabled={!newReply.trim()}
            className="px-5 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 text-sm disabled:opacity-40 transition-opacity"
          >
            Post Reply
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          This is a peer discussion space. Do not post personal identifying information.
          For immediate support, see the{" "}
          <Link to="/services?category=Crisis+%26+Mental+Health" className="underline hover:text-foreground">
            crisis services directory
          </Link>.
        </p>
      </div>
    </div>
  );
}

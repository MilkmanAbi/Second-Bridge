import { useState, useMemo } from "react";
import {
  ChevronLeft, ChevronRight, Plus, Trash2, Clock, CheckSquare,
  Square, RotateCcw, X, Hash
} from "lucide-react";

// ── Shared localStorage helpers ───────────────────────────────────────────
function ls<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; }
  catch { return fallback; }
}
function lsSet(key: string, val: unknown) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* no-op */ }
}

// ── Types ─────────────────────────────────────────────────────────────────
interface CalEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  color: "stone" | "blue" | "green" | "amber" | "rose";
}
interface Task {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

const EVENT_COLORS = {
  stone: "bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-200",
  blue:  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  rose:  "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
} as const;

const DOT_COLORS = {
  stone: "bg-stone-400", blue: "bg-blue-400", green: "bg-green-400",
  amber: "bg-amber-400", rose: "bg-rose-400",
} as const;

function padDate(n: number) { return String(n).padStart(2, "0"); }
function toDateStr(y: number, m: number, d: number) {
  return `${y}-${padDate(m + 1)}-${padDate(d)}`;
}

// ── Calendar ──────────────────────────────────────────────────────────────
function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<CalEvent[]>(() => ls("sb-cal-events", []));
  const [selected, setSelected] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState<CalEvent["color"]>("blue");

  const saveEvents = (e: CalEvent[]) => { setEvents(e); lsSet("sb-cal-events", e); };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const weeks: (number | null)[][] = [];
  let day = 1 - firstDay;
  while (day <= daysInMonth) {
    const week: (number | null)[] = [];
    for (let i = 0; i < 7; i++, day++) week.push(day >= 1 && day <= daysInMonth ? day : null);
    weeks.push(week);
  }

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const selectedEvents = selected ? events.filter(e => e.date === selected) : [];

  const addEvent = () => {
    if (!newTitle.trim() || !selected) return;
    const ev: CalEvent = { id: Date.now().toString(), date: selected, title: newTitle.trim(), color: newColor };
    saveEvents([...events, ev]);
    setNewTitle("");
  };

  const deleteEvent = (id: string) => saveEvents(events.filter(e => e.id !== id));

  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <button onClick={prevMonth} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <h2 className="text-foreground">{monthName} {year}</h2>
        </div>
        <button onClick={nextMonth} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-7 mb-2">
            {days.map(d => (
              <div key={d} className="text-center text-xs text-muted-foreground py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {weeks.flat().map((d, i) => {
              if (!d) return <div key={i} />;
              const dateStr = toDateStr(year, month, d);
              const dayEvents = events.filter(e => e.date === dateStr);
              const isToday = dateStr === todayStr;
              const isSelected = selected === dateStr;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(isSelected ? null : dateStr)}
                  className={`relative min-h-[52px] rounded-md p-1.5 text-left transition-colors border ${
                    isSelected ? "border-foreground/40 bg-muted" :
                    isToday ? "border-foreground/20 bg-muted/40" :
                    "border-transparent hover:bg-muted"
                  }`}
                >
                  <span className={`text-xs block mb-1 w-5 h-5 flex items-center justify-center rounded-full ${
                    isToday ? "bg-foreground text-background font-medium" : "text-foreground"
                  }`}>{d}</span>
                  <div className="flex flex-wrap gap-0.5">
                    {dayEvents.slice(0, 3).map(ev => (
                      <span key={ev.id} className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[ev.color]}`} />
                    ))}
                    {dayEvents.length > 3 && <span className="text-muted-foreground" style={{fontSize: "9px"}}>+{dayEvents.length - 3}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day panel */}
        <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-border p-4">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-foreground">
                  {new Date(selected + "T12:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </p>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedEvents.length === 0 && (
                <p className="text-xs text-muted-foreground mb-3">No events.</p>
              )}
              <div className="space-y-1.5 mb-4">
                {selectedEvents.map(ev => (
                  <div key={ev.id} className={`flex items-center justify-between px-2 py-1.5 rounded text-xs group ${EVENT_COLORS[ev.color]}`}>
                    <span className="truncate flex-1">{ev.title}</span>
                    <button onClick={() => deleteEvent(ev.id)} className="opacity-0 group-hover:opacity-100 ml-1 shrink-0 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Add event…"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addEvent()}
                  className="w-full px-2.5 py-1.5 border border-border rounded text-xs bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="flex items-center gap-1.5">
                  {(Object.keys(EVENT_COLORS) as CalEvent["color"][]).map(c => (
                    <button key={c} onClick={() => setNewColor(c)}
                      className={`w-4 h-4 rounded-full transition-all ${DOT_COLORS[c]} ${newColor === c ? "ring-2 ring-offset-1 ring-ring scale-125" : "hover:scale-110"}`} />
                  ))}
                  <button onClick={addEvent} disabled={!newTitle.trim()}
                    className="ml-auto flex items-center gap-1 px-2.5 py-1 bg-primary text-primary-foreground rounded text-xs hover:opacity-90 disabled:opacity-40">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Select a date to view or add events.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Task list ─────────────────────────────────────────────────────────────
function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(() => ls("sb-tasks", []));
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");

  const save = (t: Task[]) => { setTasks(t); lsSet("sb-tasks", t); };

  const add = () => {
    if (!newTask.trim()) return;
    const t: Task = { id: Date.now().toString(), text: newTask.trim(), done: false, createdAt: new Date().toISOString() };
    save([t, ...tasks]);
    setNewTask("");
  };

  const toggle = (id: string) => save(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id: string) => save(tasks.filter(t => t.id !== id));
  const clearDone = () => save(tasks.filter(t => !t.done));

  const filtered = tasks.filter(t =>
    filter === "all" ? true : filter === "open" ? !t.done : t.done
  );

  const doneCount = tasks.filter(t => t.done).length;

  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground flex items-center gap-2">
          <CheckSquare className="w-4 h-4" /> Tasks
        </h3>
        <div className="flex gap-1">
          {(["all", "open", "done"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                filter === f ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New task…"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          className="flex-1 px-3 py-2 border border-border rounded-md bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button onClick={add} disabled={!newTask.trim()}
          className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-40 transition-opacity">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          {filter === "done" ? "Nothing done yet." : "No tasks."}
        </p>
      ) : (
        <div className="space-y-1.5">
          {filtered.map(task => (
            <div key={task.id} className="flex items-center gap-2.5 group py-1">
              <button onClick={() => toggle(task.id)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                {task.done ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              </button>
              <span className={`flex-1 text-sm ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.text}
              </span>
              <button onClick={() => remove(task.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {doneCount > 0 && (
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{doneCount} completed</span>
          <button onClick={clearDone} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="w-3 h-3" /> Clear done
          </button>
        </div>
      )}
    </div>
  );
}

// ── Quick Notes (scratchpad) ──────────────────────────────────────────────
function Scratchpad() {
  const [text, setText] = useState(() => ls<string>("sb-scratchpad", ""));
  const save = (v: string) => { setText(v); lsSet("sb-scratchpad", v); };

  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-foreground flex items-center gap-2">
          <Hash className="w-4 h-4" /> Scratchpad
        </h3>
        <span className="text-xs text-muted-foreground">Auto-saved</span>
      </div>
      <textarea
        value={text}
        onChange={e => save(e.target.value)}
        placeholder="Quick notes, clipboard, rough thoughts — anything. Cleared when you clear your browser."
        rows={8}
        className="w-full bg-input-background border border-border rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none leading-relaxed"
      />
    </div>
  );
}

// ── Timer ─────────────────────────────────────────────────────────────────
function Timer() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    setIntervalId(id);
  };
  const pause = () => {
    setRunning(false);
    if (intervalId) clearInterval(intervalId);
  };
  const reset = () => {
    pause();
    setSeconds(0);
  };

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <h3 className="text-foreground flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4" /> Timer
      </h3>
      <div className="text-center">
        <div className="font-mono text-4xl text-foreground mb-6 tracking-wide">
          {h > 0 && <>{fmt(h)}:</>}{fmt(m)}:{fmt(s)}
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={running ? pause : start}
            className="px-5 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity"
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            onClick={reset}
            className="px-5 py-2 border border-border text-muted-foreground rounded-md text-sm hover:bg-muted transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export function Tools() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Tools</h1>
        <p className="text-sm text-muted-foreground">
          Lightweight utilities. Everything stored locally in your browser.
        </p>
      </div>

      <div className="space-y-6">
        <Calendar />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskList />
          <div className="space-y-6">
            <Timer />
            <Scratchpad />
          </div>
        </div>
      </div>
    </div>
  );
}

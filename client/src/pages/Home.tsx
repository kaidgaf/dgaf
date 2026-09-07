import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  AudioLines,
  ChevronDown,
  CircleHelp,
  Command,
  Copy,
  Cpu,
  Download,
  Film,
  Image as ImageIcon,
  Layers3,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Play,
  Plus,
  Search,
  Send,
  Settings2,
  Sparkles,
  SquarePen,
  WandSparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

type Workspace = "Chat" | "Image Studio" | "Video Studio";

const navItems: { label: Workspace; icon: typeof MessageSquare }[] = [
  { label: "Chat", icon: MessageSquare },
  { label: "Image Studio", icon: ImageIcon },
  { label: "Video Studio", icon: Film },
];

const gallery = [
  { title: "Neon monolith", meta: "Flux 1.1 · 2m ago", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85", tall: true },
  { title: "Chrome ritual", meta: "SDXL · 14m ago", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=85", tall: false },
  { title: "Soft machinery", meta: "Flux 1.1 · 21m ago", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85", tall: false },
];

export default function Home() {
  const [workspace, setWorkspace] = useState<Workspace>("Chat");
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState("OpenRouter");
  const [sent, setSent] = useState(false);
  const [showProviders, setShowProviders] = useState(false);

  const greeting = useMemo(() => (sent ? "That prompt is queued in the studio. Your provider adapter is ready for the API key when you are." : "Good evening, Kai."), [sent]);

  function submitPrompt() {
    if (!prompt.trim()) {
      toast("Describe what you want to make first.");
      return;
    }
    setSent(true);
    setMessage(prompt);
    setPrompt("");
    toast("Prompt sent to the studio");
  }

  function switchWorkspace(next: Workspace) {
    setWorkspace(next);
    setSent(false);
    toast(`${next} workspace selected`);
  }

  return (
    <main className="studio-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark"><span>DG</span></div>
          <div><div className="brand-name">dgaf</div><div className="brand-sub">studio / 01</div></div>
        </div>

        <button className="new-thread" onClick={() => { setWorkspace("Chat"); setSent(false); toast("New thread started"); }}><Plus size={16} /> New thread <span>⌘ K</span></button>

        <div className="sidebar-section-label">Workspace</div>
        <nav className="workspace-nav">
          {navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => switchWorkspace(label)} className={`nav-item ${workspace === label ? "active" : ""}`}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{label === "Image Studio" && <span className="nav-count">3</span>}</button>)}
        </nav>

        <div className="sidebar-section-label recent-label">Recent threads</div>
        <div className="thread-list">
          <button className="thread active-thread"><span className="thread-dot" />Brand worldbuilding <small>Now</small></button>
          <button className="thread"><span className="thread-dot muted" />The quiet machine <small>2h</small></button>
          <button className="thread"><span className="thread-dot muted" />Launch notes / v0.1 <small>Yesterday</small></button>
        </div>

        <div className="sidebar-bottom">
          <div className="credit-card"><div className="credit-top"><span>Available credits</span><Zap size={14} /></div><div className="credit-value">2,480 <span>/ 5,000</span></div><div className="progress-track"><div className="progress-fill" /></div><button onClick={() => toast("Top-up flow coming soon")}>Top up credits <ArrowUpRight size={13} /></button></div>
          <button className="side-link" onClick={() => toast("Settings panel coming soon")}><Settings2 size={16} /> Settings</button>
          <button className="side-link" onClick={() => toast("Help center coming soon")}><CircleHelp size={16} /> Help center</button>
          <div className="profile"><div className="avatar">K</div><div><strong>Kai D.</strong><span>Pro workspace</span></div><MoreHorizontal size={16} className="profile-more" /></div>
        </div>
      </aside>

      <section className="main-stage">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><span className="slash">/</span><strong>{workspace}</strong></div><div className="top-actions"><button className="icon-btn" onClick={() => toast("Search opened")}><Search size={17} /></button><button className="command-btn" onClick={() => toast("Command palette coming soon")}><Command size={14} /> <span>Command</span> <kbd>⌘ K</kbd></button><button className="status-pill"><span className="status-dot" />All systems operational</button></div></header>

        <div className="stage-content">
          <div className="headline-row"><div><div className="eyebrow"><span className="eyebrow-line" />{workspace === "Chat" ? "Private intelligence" : "Creative workspace"}</div><h1>{greeting}</h1><p className="subhead">{workspace === "Chat" ? "A clear mind makes better work. What are we exploring today?" : `Build, refine, and ship your next ${workspace === "Image Studio" ? "visual" : "motion study"}.`}</p></div><div className="headline-meta"><span className="live-dot" />Live workspace<br /><small>Last synced just now</small></div></div>

          {workspace === "Chat" && <div className="chat-layout">
            <div className="conversation-panel panel-surface">
              <div className="panel-header"><div className="panel-title"><Sparkles size={16} /> <span>New conversation</span></div><button className="ghost-btn" onClick={() => toast("Conversation options coming soon")}><MoreHorizontal size={17} /></button></div>
              <div className="conversation-body">
                {!sent ? <div className="empty-conversation"><div className="orbital-mark"><div className="orbital-core"><Sparkles size={21} /></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div><h2>Start with a signal.</h2><p>Ask anything, sketch a direction, or bring a half-formed thought. We’ll make it sharper together.</p><div className="suggestion-row"><button onClick={() => setPrompt("Help me shape a launch concept for a quiet, tactile AI studio")}>Shape an idea <ArrowUpRight size={13} /></button><button onClick={() => setPrompt("Give me three unexpected creative directions")}>Find a direction <ArrowUpRight size={13} /></button></div></div> : <div className="sent-conversation"><div className="message user-message"><div className="message-label">You <span>just now</span></div><p>{message}</p></div><div className="message assistant-message"><div className="message-label"><span className="mini-logo">DG</span> dgaf <span>streaming</span></div><p>Your prompt is in motion. I’m shaping a response with <strong>{provider}</strong> as the primary route and Together AI ready as a fallback. This is where the real work begins.</p><div className="response-actions"><button onClick={() => navigator.clipboard?.writeText("Your prompt is in motion.")}><Copy size={13} /> Copy</button><button onClick={() => toast("Response regenerated")}><WandSparkles size={13} /> Regenerate</button></div></div></div>}
              </div>
              <div className="composer-wrap"><div className="composer"><button className="composer-icon" onClick={() => toast("Attachment picker coming soon")}><Paperclip size={18} /></button><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitPrompt(); } }} placeholder="Describe what you want to explore..." rows={1} /><button className={`send-btn ${prompt ? "ready" : ""}`} onClick={submitPrompt}><Send size={17} /></button></div><div className="composer-foot"><span><kbd>↵</kbd> to send <kbd>⇧ ↵</kbd> new line</span><span>Private by default · <button onClick={() => toast("Model details opened")}>{provider} <ChevronDown size={12} /></button></span></div></div>
            </div>

            <aside className="inspector"><div className="inspector-title"><span>Session controls</span><button onClick={() => setShowProviders(!showProviders)} className={`toggle-control ${showProviders ? "active" : ""}`}><Settings2 size={15} /></button></div><div className="control-group"><label>Character card</label><button className="select-control" onClick={() => toast("Character card selector coming soon")}><span><span className="card-dot" />Open-minded collaborator</span><ChevronDown size={14} /></button></div><div className="control-group"><label>Provider routing</label><div className="provider-stack"><button className="provider-row selected" onClick={() => setProvider("OpenRouter")}><span className="provider-icon router">◈</span><span><strong>OpenRouter</strong><small>Primary · 18 models</small></span><span className="provider-check">{provider === "OpenRouter" ? "●" : "○"}</span></button><button className="provider-row" onClick={() => setProvider("Together AI")}><span className="provider-icon together">✦</span><span><strong>Together AI</strong><small>Fallback · ready</small></span><span className="provider-check">{provider === "Together AI" ? "●" : "○"}</span></button></div></div>{showProviders && <div className="provider-note"><Activity size={14} /><span>Fallback routing is configured as a UI contract. Add API keys in your environment to activate it.</span></div>}<div className="control-group"><label>Response style</label><div className="segmented"><button className="seg active">Balanced</button><button className="seg">Precise</button><button className="seg">Wild</button></div></div><div className="inspector-footer"><div><span>Est. usage</span><strong>~ 0.4 credits</strong></div><button onClick={() => toast("Usage details opened")}><Activity size={14} /> Details</button></div></aside>
          </div>}

          {workspace !== "Chat" && <div className="studio-layout"><div className="creative-panel panel-surface"><div className="panel-header"><div className="panel-title">{workspace === "Image Studio" ? <ImageIcon size={16} /> : <Film size={16} />} <span>{workspace} / prompt builder</span></div><button className="ghost-btn"><MoreHorizontal size={17} /></button></div><div className="creative-form"><label>Positive prompt</label><textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={workspace === "Image Studio" ? "A tactile still life of chrome, moss, and warm light..." : "A slow camera drift through a brutalist greenhouse at dusk..."} rows={5} /><label>Negative prompt <span>optional</span></label><input placeholder="low quality, artifacts, text" /><div className="form-grid"><div><label>Model</label><button className="select-control"><span>{workspace === "Image Studio" ? "Flux 1.1 Pro" : "Wan 2.1 · 480p"}</span><ChevronDown size={14} /></button></div><div><label>Aspect ratio</label><button className="select-control"><span>16 : 9</span><ChevronDown size={14} /></button></div></div><button className="generate-btn" onClick={submitPrompt}><Sparkles size={16} /> Generate <span>2 credits</span></button></div></div><div className="gallery-panel"><div className="gallery-header"><div><div className="eyebrow"><span className="eyebrow-line" />Your library</div><h2>Recent generations</h2></div><button className="view-all" onClick={() => toast("Full gallery coming soon")}>View all <ArrowUpRight size={14} /></button></div><div className="gallery-grid">{gallery.map(item => <div className={`gallery-card ${item.tall ? "tall" : ""}`} key={item.title}><img src={item.image} alt={item.title} /><div className="gallery-overlay"><div><strong>{item.title}</strong><span>{item.meta}</span></div><button onClick={() => toast(`${item.title} selected`)}><ArrowUpRight size={15} /></button></div></div>)}</div></div></div>}
        </div>
        <footer className="app-footer"><span><span className="footer-logo">DG</span> dgaf studio</span><span>v0.1 / private beta</span><span className="footer-links"><button onClick={() => toast("Documentation coming soon")}>Docs</button><button onClick={() => toast("Status page coming soon")}>Status</button><button onClick={() => toast("Feedback form coming soon")}>Feedback</button></span></footer>
      </section>
    </main>
  );
}

// Keep unused imports intentional for the icon vocabulary used in future provider adapters.
void AudioLines; void Cpu; void Download; void Layers3; void Play; void SquarePen;

import { ContentSection } from "@/data/contentMap";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";

export function TheoryRenderer({ sections }: { sections: ContentSection[] }) {
  if (!sections || sections.length === 0) {
    return <div className="text-zinc-400 italic">Content coming soon...</div>;
  }

  return (
    <div className="space-y-8">
      {sections.map((sec, idx) => {
        if (sec.type === "text") {
          return (
            <div key={idx} className="prose prose-invert max-w-none">
              {sec.title && <h2 className="text-2xl font-bold mb-4 text-white">{sec.title}</h2>}
              {Array.isArray(sec.content) ? (
                <div className="space-y-4">
                  {sec.content.map((p, i) => (
                    <p key={i} className="text-zinc-300 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 py-0.5 rounded text-primary">$1</code>') }} />
                  ))}
                </div>
              ) : (
                <p className="text-zinc-300 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: sec.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 py-0.5 rounded text-primary">$1</code>') }} />
              )}
            </div>
          );
        }

        if (sec.type === "code") {
          return (
            <div key={idx} className="rounded-xl overflow-hidden border border-white/10">
              <div className="bg-black/60 px-4 py-2 border-b border-white/10 text-xs font-mono text-zinc-400">
                {sec.language || "javascript"}
              </div>
              <pre className="p-4 bg-[#0d0d0d] overflow-x-auto text-sm text-green-400 font-mono">
                <code>{sec.content}</code>
              </pre>
            </div>
          );
        }

        if (sec.type === "list") {
          return (
            <div key={idx} className="prose prose-invert max-w-none">
              {sec.title && <h2 className="text-2xl font-bold mb-4 text-white">{sec.title}</h2>}
              <ul className="list-disc pl-5 space-y-2 text-zinc-300 text-lg">
                {(sec.content as string[]).map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 py-0.5 rounded text-primary">$1</code>') }} />
                ))}
              </ul>
            </div>
          );
        }

        if (sec.type === "alert") {
          const isWarning = sec.alertType === "warning";
          const isTip = sec.alertType === "tip";
          const Icon = isWarning ? AlertTriangle : isTip ? Lightbulb : Info;
          const bgClass = isWarning ? "bg-red-500/10 border-red-500/20 text-red-200" : isTip ? "bg-green-500/10 border-green-500/20 text-green-200" : "bg-blue-500/10 border-blue-500/20 text-blue-200";
          const iconClass = isWarning ? "text-red-400" : isTip ? "text-green-400" : "text-blue-400";

          return (
            <div key={idx} className={`p-6 rounded-xl border flex gap-4 ${bgClass}`}>
              <Icon className={`w-6 h-6 shrink-0 ${iconClass}`} />
              <div>
                {sec.title && <h3 className="font-bold mb-1">{sec.title}</h3>}
                <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: (sec.content as string).replace(/`(.*?)`/g, '<code class="bg-black/20 px-1 py-0.5 rounded font-mono">$1</code>') }} />
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

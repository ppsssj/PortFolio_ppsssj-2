import type { ArchitectureSystemDiagram } from "../data/portfolio";

type ArchitectureDiagramProps = {
  diagram: ArchitectureSystemDiagram;
};

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 500;

const EXT_X = 16;
const EXT_Y = 40;
const EXT_W = 420;
const CONTAINER_H = 380;

const WEB_X = 564;
const WEB_Y = EXT_Y;
const WEB_W = 420;

const ENTRY = { x: 36, y: 104, w: 150, h: 64 };
const HUB = { x: 202, y: 100, w: 214, h: 72 };
const SERVICES_Y = 192;
const SERVICES_H = 76;
const SERVICE_W = 118;
const SERVICES_X = [36, 166, 296];
const EDITOR_API = { x: 36, y: 292, w: 380, h: 64 };

const PANEL_X = 584;
const PANEL_W = 380;
const PANEL_H = 64;
const PANELS_Y = [104, 182, 260, 338];

function Node({
  x,
  y,
  w,
  h,
  label,
  note,
  emphasis,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  note?: string;
  emphasis?: boolean;
}) {
  return (
    <foreignObject x={x} y={y} width={w} height={h}>
      <div className={`arch-diagram__node${emphasis ? " arch-diagram__node--hub" : ""}`}>
        <strong>{label}</strong>
        {note ? <span>{note}</span> : null}
      </div>
    </foreignObject>
  );
}

export function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  const hubBottomCenter = HUB.x + HUB.w / 2;
  const editorApiCenter = EDITOR_API.x + EDITOR_API.w / 2;

  return (
    <div className="arch-diagram" role="img" aria-label={`${diagram.extension.title}와 ${diagram.webview.title} 간 아키텍처 다이어그램`}>
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path className="arch-diagram__arrowhead" d="M0,0 L10,5 L0,10 Z" />
          </marker>
        </defs>
        <rect className="arch-diagram__container" x={EXT_X} y={EXT_Y} width={EXT_W} height={CONTAINER_H} rx={18} />
        <rect className="arch-diagram__container" x={WEB_X} y={WEB_Y} width={WEB_W} height={CONTAINER_H} rx={18} />

        <line className="arch-diagram__edge" x1={ENTRY.x + ENTRY.w} y1={ENTRY.y + ENTRY.h / 2} x2={HUB.x} y2={HUB.y + HUB.h / 2} />
        {SERVICES_X.map((sx) => (
          <line
            className="arch-diagram__edge"
            key={sx}
            x1={hubBottomCenter}
            y1={HUB.y + HUB.h}
            x2={sx + SERVICE_W / 2}
            y2={SERVICES_Y}
          />
        ))}
        <line
          className="arch-diagram__edge"
          x1={SERVICES_X[1] + SERVICE_W / 2}
          y1={SERVICES_Y + SERVICES_H}
          x2={editorApiCenter}
          y2={EDITOR_API.y}
        />

        <line className="arch-diagram__edge arch-diagram__edge--forward" x1={EXT_X + EXT_W} y1={128} x2={WEB_X} y2={128} />
        <line className="arch-diagram__edge arch-diagram__edge--backward" x1={EXT_X + EXT_W} y1={152} x2={WEB_X} y2={152} />

        <foreignObject x={EXT_X + EXT_W} y={92} width={WEB_X - EXT_X - EXT_W} height={72}>
          <div className="arch-diagram__protocol">
            <span className="arch-diagram__protocol-badge">Typed</span>
            <p>Message Protocol</p>
          </div>
        </foreignObject>

        <foreignObject x={EXT_X + 20} y={EXT_Y + 12} width={EXT_W - 40} height={40}>
          <div className="arch-diagram__title">
            <strong>{diagram.extension.title}</strong>
            <span>{diagram.extension.subtitle}</span>
          </div>
        </foreignObject>
        <foreignObject x={WEB_X + 20} y={WEB_Y + 12} width={WEB_W - 40} height={40}>
          <div className="arch-diagram__title">
            <strong>{diagram.webview.title}</strong>
            <span>{diagram.webview.subtitle}</span>
          </div>
        </foreignObject>

        <Node {...ENTRY} label={diagram.extension.entry.label} note={diagram.extension.entry.note} />
        <Node {...HUB} label={diagram.extension.hub.label} note={diagram.extension.hub.note} emphasis />
        {diagram.extension.services.map((service, index) => (
          <Node
            key={service.label}
            x={SERVICES_X[index]}
            y={SERVICES_Y}
            w={SERVICE_W}
            h={SERVICES_H}
            label={service.label}
            note={service.note}
          />
        ))}
        <Node {...EDITOR_API} label={diagram.extension.editorApi.label} note={diagram.extension.editorApi.note} />

        {diagram.webview.panels.map((panel, index) => (
          <Node key={panel.label} x={PANEL_X} y={PANELS_Y[index]} w={PANEL_W} h={PANEL_H} label={panel.label} note={panel.note} />
        ))}
      </svg>
    </div>
  );
}

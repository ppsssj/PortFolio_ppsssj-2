import type { SystemFlowDiagram as SystemFlowDiagramData } from "../data/portfolio";

type SystemFlowDiagramProps = {
  diagram: SystemFlowDiagramData;
};

const VIEW_WIDTH = 1180;
const VIEW_HEIGHT = 464;

const USER = { x: 510, y: 8, w: 160, h: 34 };

const CLIENT = { x: 40, y: 58, w: 1100, h: 96 };
const PANEL_Y = 76;
const PANEL_H = 62;
const PANEL_W = 340;
const PANEL_X = [64, 420, 776];

const STUDIO_STATE = { x: 40, y: 178, w: 420, h: 78 };
const AI_PROXY = { x: 580, y: 178, w: 300, h: 78 };
const STRUCTURED_CMD = { x: 580, y: 272, w: 300, h: 78 };

const RENDER_ENGINE = { x: 40, y: 366, w: 340, h: 78 };
const BACKEND_API = { x: 400, y: 366, w: 340, h: 78 };
const STORAGE = { x: 760, y: 366, w: 340, h: 78 };

function Node({
  x,
  y,
  w,
  h,
  label,
  note,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  note?: string;
}) {
  return (
    <foreignObject x={x} y={y} width={w} height={h}>
      <div className="arch-diagram__node">
        <strong>{label}</strong>
        {note ? <span>{note}</span> : null}
      </div>
    </foreignObject>
  );
}

export function SystemFlowDiagram({ diagram }: SystemFlowDiagramProps) {
  const spineNotes = diagram.spine;
  const studioCenter = PANEL_X[0] + PANEL_W / 2;
  const aiPanelCenter = PANEL_X[2] + PANEL_W / 2;

  return (
    <div className="arch-diagram arch-diagram--wide" role="img" aria-label={`${diagram.client.title} 전체 아키텍처 다이어그램`}>
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path className="arch-diagram__arrowhead" d="M0,0 L10,5 L0,10 Z" />
          </marker>
        </defs>

        <line
          className="arch-diagram__edge"
          markerEnd="url(#flow-arrow)"
          x1={USER.x + USER.w / 2}
          y1={USER.y + USER.h}
          x2={USER.x + USER.w / 2}
          y2={CLIENT.y}
        />
        <Node {...USER} label={diagram.user.label} />

        <rect className="arch-diagram__container" x={CLIENT.x} y={CLIENT.y} width={CLIENT.w} height={CLIENT.h} rx={18} />
        <foreignObject x={CLIENT.x + 24} y={CLIENT.y + 14} width={CLIENT.w - 48} height={28}>
          <div className="arch-diagram__title">
            <strong>{diagram.client.title}</strong>
          </div>
        </foreignObject>
        {diagram.client.panels.map((panel, index) => (
          <Node key={panel.label} x={PANEL_X[index]} y={PANEL_Y} w={PANEL_W} h={PANEL_H} label={panel.label} note={panel.note} />
        ))}

        <line
          className="arch-diagram__edge"
          markerEnd="url(#flow-arrow)"
          x1={studioCenter}
          y1={PANEL_Y + PANEL_H}
          x2={STUDIO_STATE.x + STUDIO_STATE.w / 2}
          y2={STUDIO_STATE.y}
        />
        <line
          className="arch-diagram__edge"
          markerEnd="url(#flow-arrow)"
          x1={aiPanelCenter}
          y1={PANEL_Y + PANEL_H}
          x2={AI_PROXY.x + AI_PROXY.w / 2}
          y2={AI_PROXY.y}
        />

        <Node {...STUDIO_STATE} label={spineNotes[0].label} note={spineNotes[0].note} />
        <Node {...AI_PROXY} label={diagram.aiBranch.nodes[0].label} note={diagram.aiBranch.nodes[0].note} />

        <line
          className="arch-diagram__edge arch-diagram__edge--dashed"
          x1={STUDIO_STATE.x + STUDIO_STATE.w}
          y1={STUDIO_STATE.y + STUDIO_STATE.h / 2}
          x2={AI_PROXY.x}
          y2={AI_PROXY.y + AI_PROXY.h / 2}
        />
        <foreignObject
          x={STUDIO_STATE.x + STUDIO_STATE.w}
          y={STUDIO_STATE.y + STUDIO_STATE.h / 2 - 13}
          width={AI_PROXY.x - STUDIO_STATE.x - STUDIO_STATE.w}
          height={26}
        >
          <div className="arch-diagram__protocol">
            <span className="arch-diagram__protocol-badge">{diagram.aiBranch.context}</span>
          </div>
        </foreignObject>

        <line
          className="arch-diagram__edge"
          markerEnd="url(#flow-arrow)"
          x1={AI_PROXY.x + AI_PROXY.w / 2}
          y1={AI_PROXY.y + AI_PROXY.h}
          x2={STRUCTURED_CMD.x + STRUCTURED_CMD.w / 2}
          y2={STRUCTURED_CMD.y}
        />
        <Node {...STRUCTURED_CMD} label={diagram.aiBranch.nodes[1].label} note={diagram.aiBranch.nodes[1].note} />

        <path
          className="arch-diagram__edge"
          markerEnd="url(#flow-arrow)"
          fill="none"
          d={`M${STRUCTURED_CMD.x},${STRUCTURED_CMD.y + STRUCTURED_CMD.h / 2} H${STUDIO_STATE.x + STUDIO_STATE.w - 20} V${
            STUDIO_STATE.y + STUDIO_STATE.h
          }`}
        />

        <line
          className="arch-diagram__edge"
          markerEnd="url(#flow-arrow)"
          x1={STUDIO_STATE.x + STUDIO_STATE.w / 2}
          y1={STUDIO_STATE.y + STUDIO_STATE.h}
          x2={RENDER_ENGINE.x + RENDER_ENGINE.w / 2}
          y2={RENDER_ENGINE.y}
        />
        <Node {...RENDER_ENGINE} label={spineNotes[1].label} note={spineNotes[1].note} />

        <line
          className="arch-diagram__edge"
          markerEnd="url(#flow-arrow)"
          x1={RENDER_ENGINE.x + RENDER_ENGINE.w}
          y1={RENDER_ENGINE.y + RENDER_ENGINE.h / 2}
          x2={BACKEND_API.x}
          y2={BACKEND_API.y + BACKEND_API.h / 2}
        />
        <Node {...BACKEND_API} label={spineNotes[2].label} note={spineNotes[2].note} />

        <line
          className="arch-diagram__edge"
          markerEnd="url(#flow-arrow)"
          x1={BACKEND_API.x + BACKEND_API.w}
          y1={BACKEND_API.y + BACKEND_API.h / 2}
          x2={STORAGE.x}
          y2={STORAGE.y + STORAGE.h / 2}
        />
        <Node {...STORAGE} label={spineNotes[3].label} note={spineNotes[3].note} />
      </svg>
    </div>
  );
}

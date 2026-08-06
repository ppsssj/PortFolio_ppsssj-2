import type { ClientBackendDiagram as ClientBackendDiagramData } from "../data/portfolio";

type ClientBackendDiagramProps = {
  diagram: ClientBackendDiagramData;
};

const VIEW_WIDTH = 1180;
const VIEW_HEIGHT = 360;

const CLIENT = { x: 40, y: 20, w: 620, h: 320 };
const BACKEND = { x: 760, y: 20, w: 380, h: 150 };
const STORAGE = { x: 760, y: 190, w: 380, h: 150 };

const PROTOCOL_FORWARD_Y = 80;
const PROTOCOL_BACKWARD_Y = 112;

export function ClientBackendDiagram({ diagram }: ClientBackendDiagramProps) {
  return (
    <div className="arch-diagram arch-diagram--wide" role="img" aria-label={`${diagram.client.title}와 ${diagram.backend.title} 아키텍처 다이어그램`}>
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="prism-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path className="arch-diagram__arrowhead" d="M0,0 L10,5 L0,10 Z" />
          </marker>
        </defs>

        <rect className="arch-diagram__container" x={CLIENT.x} y={CLIENT.y} width={CLIENT.w} height={CLIENT.h} rx={18} />
        <foreignObject x={CLIENT.x} y={CLIENT.y} width={CLIENT.w} height={CLIENT.h}>
          <div className="prism-diagram__body">
            <div className="arch-diagram__title">
              <strong>{diagram.client.title}</strong>
            </div>
            {diagram.client.groups.map((group) => (
              <div className="prism-diagram__group" key={group.label}>
                <span className="prism-diagram__group-label">{group.label}</span>
                <div className="project-case-chips">
                  {group.chips.map((chip) => (
                    <span className="project-case-chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {diagram.client.note ? <p className="prism-diagram__note">{diagram.client.note}</p> : null}
          </div>
        </foreignObject>

        <rect className="arch-diagram__container" x={BACKEND.x} y={BACKEND.y} width={BACKEND.w} height={BACKEND.h} rx={18} />
        <foreignObject x={BACKEND.x} y={BACKEND.y} width={BACKEND.w} height={BACKEND.h}>
          <div className="prism-diagram__body">
            <div className="arch-diagram__title">
              <strong>{diagram.backend.title}</strong>
            </div>
            <div className="project-case-chips">
              {diagram.backend.chips.map((chip) => (
                <span className="project-case-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </foreignObject>

        <rect className="arch-diagram__container" x={STORAGE.x} y={STORAGE.y} width={STORAGE.w} height={STORAGE.h} rx={18} />
        <foreignObject x={STORAGE.x} y={STORAGE.y} width={STORAGE.w} height={STORAGE.h}>
          <div className="prism-diagram__body">
            <div className="arch-diagram__title">
              <strong>{diagram.storage.title}</strong>
            </div>
            <p className="prism-diagram__note prism-diagram__note--mono">{diagram.storage.note}</p>
            {diagram.storage.chips?.length ? (
              <div className="project-case-chips">
                {diagram.storage.chips.map((chip) => (
                  <span className="project-case-chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </foreignObject>

        <line
          className="arch-diagram__edge"
          markerEnd="url(#prism-arrow)"
          x1={BACKEND.x + BACKEND.w / 2}
          y1={BACKEND.y + BACKEND.h}
          x2={STORAGE.x + STORAGE.w / 2}
          y2={STORAGE.y}
        />

        <line
          className="arch-diagram__edge"
          markerEnd="url(#prism-arrow)"
          x1={CLIENT.x + CLIENT.w}
          y1={PROTOCOL_FORWARD_Y}
          x2={BACKEND.x}
          y2={PROTOCOL_FORWARD_Y}
        />
        <line
          className="arch-diagram__edge"
          markerStart="url(#prism-arrow)"
          x1={CLIENT.x + CLIENT.w}
          y1={PROTOCOL_BACKWARD_Y}
          x2={BACKEND.x}
          y2={PROTOCOL_BACKWARD_Y}
        />
        <foreignObject x={CLIENT.x + CLIENT.w} y={PROTOCOL_FORWARD_Y - 42} width={BACKEND.x - CLIENT.x - CLIENT.w} height={30}>
          <div className="arch-diagram__protocol">
            <span className="arch-diagram__protocol-badge">Graph CRUD</span>
          </div>
        </foreignObject>
        <foreignObject x={CLIENT.x + CLIENT.w} y={PROTOCOL_FORWARD_Y + 4} width={BACKEND.x - CLIENT.x - CLIENT.w} height={20}>
          <div className="arch-diagram__protocol">
            <p>{diagram.protocol.forward}</p>
          </div>
        </foreignObject>
        <foreignObject x={CLIENT.x + CLIENT.w} y={PROTOCOL_BACKWARD_Y + 8} width={BACKEND.x - CLIENT.x - CLIENT.w} height={20}>
          <div className="arch-diagram__protocol">
            <p>{diagram.protocol.backward}</p>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

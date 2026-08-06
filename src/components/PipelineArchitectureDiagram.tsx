import type { PipelineArchitectureDiagram as PipelineArchitectureDiagramData } from "../data/portfolio";

type PipelineArchitectureDiagramProps = {
  diagram: PipelineArchitectureDiagramData;
};

const VIEW_WIDTH = 1180;
const VIEW_HEIGHT = 420;

const CITY_DATA = { x: 40, y: 40, w: 260, h: 140 };
const AI_MODEL = { x: 360, y: 40, w: 460, h: 140 };
const BACKEND = { x: 360, y: 220, w: 460, h: 140 };
const FRONTEND = { x: 900, y: 150, w: 240, h: 230 };

const PROTOCOL_FORWARD_Y = 270;
const PROTOCOL_BACKWARD_Y = 302;

export function PipelineArchitectureDiagram({ diagram }: PipelineArchitectureDiagramProps) {
  return (
    <div className="arch-diagram arch-diagram--wide" role="img" aria-label={`${diagram.model.title}와 ${diagram.backend.title}, ${diagram.frontend.title} 아키텍처 다이어그램`}>
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="pipeline-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path className="arch-diagram__arrowhead" d="M0,0 L10,5 L0,10 Z" />
          </marker>
        </defs>

        <rect className="arch-diagram__container" x={CITY_DATA.x} y={CITY_DATA.y} width={CITY_DATA.w} height={CITY_DATA.h} rx={18} />
        <foreignObject x={CITY_DATA.x} y={CITY_DATA.y} width={CITY_DATA.w} height={CITY_DATA.h}>
          <div className="prism-diagram__body">
            <div className="arch-diagram__title">
              <strong>{diagram.input.title}</strong>
            </div>
            <p className="prism-diagram__note">{diagram.input.note}</p>
            {diagram.input.meta ? <p className="prism-diagram__note prism-diagram__note--mono">{diagram.input.meta}</p> : null}
          </div>
        </foreignObject>

        <line
          className="arch-diagram__edge"
          markerEnd="url(#pipeline-arrow)"
          x1={CITY_DATA.x + CITY_DATA.w}
          y1={CITY_DATA.y + CITY_DATA.h / 2}
          x2={AI_MODEL.x}
          y2={AI_MODEL.y + AI_MODEL.h / 2}
        />

        <rect className="arch-diagram__container" x={AI_MODEL.x} y={AI_MODEL.y} width={AI_MODEL.w} height={AI_MODEL.h} rx={18} />
        <foreignObject x={AI_MODEL.x} y={AI_MODEL.y} width={AI_MODEL.w} height={AI_MODEL.h}>
          <div className="prism-diagram__body">
            <div className="arch-diagram__title">
              <strong>{diagram.model.title}</strong>
              <span>{diagram.model.subtitle}</span>
            </div>
            <div className="project-case-chips">
              {diagram.model.chips.map((chip) => (
                <span className="project-case-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </foreignObject>

        <line
          className="arch-diagram__edge"
          markerEnd="url(#pipeline-arrow)"
          x1={AI_MODEL.x + AI_MODEL.w / 2}
          y1={AI_MODEL.y + AI_MODEL.h}
          x2={BACKEND.x + BACKEND.w / 2}
          y2={BACKEND.y}
        />

        <rect className="arch-diagram__container" x={BACKEND.x} y={BACKEND.y} width={BACKEND.w} height={BACKEND.h} rx={18} />
        <foreignObject x={BACKEND.x} y={BACKEND.y} width={BACKEND.w} height={BACKEND.h}>
          <div className="prism-diagram__body">
            <div className="arch-diagram__title">
              <strong>{diagram.backend.title}</strong>
              <span>{diagram.backend.subtitle}</span>
            </div>
            {diagram.backend.note ? <p className="prism-diagram__note">{diagram.backend.note}</p> : null}
          </div>
        </foreignObject>

        <rect className="arch-diagram__container" x={FRONTEND.x} y={FRONTEND.y} width={FRONTEND.w} height={FRONTEND.h} rx={18} />
        <foreignObject x={FRONTEND.x} y={FRONTEND.y} width={FRONTEND.w} height={FRONTEND.h}>
          <div className="prism-diagram__body">
            <div className="arch-diagram__title">
              <strong>{diagram.frontend.title}</strong>
            </div>
            <div className="project-case-chips">
              {diagram.frontend.chips.map((chip) => (
                <span className="project-case-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </foreignObject>

        <line
          className="arch-diagram__edge"
          markerStart="url(#pipeline-arrow)"
          x1={BACKEND.x + BACKEND.w}
          y1={PROTOCOL_FORWARD_Y}
          x2={FRONTEND.x}
          y2={PROTOCOL_FORWARD_Y}
        />
        <line
          className="arch-diagram__edge"
          markerEnd="url(#pipeline-arrow)"
          x1={BACKEND.x + BACKEND.w}
          y1={PROTOCOL_BACKWARD_Y}
          x2={FRONTEND.x}
          y2={PROTOCOL_BACKWARD_Y}
        />
        <foreignObject x={BACKEND.x + BACKEND.w} y={PROTOCOL_FORWARD_Y - 40} width={FRONTEND.x - BACKEND.x - BACKEND.w} height={28}>
          <div className="arch-diagram__protocol">
            <span className="arch-diagram__protocol-badge">REST</span>
          </div>
        </foreignObject>
        <foreignObject x={BACKEND.x + BACKEND.w} y={PROTOCOL_FORWARD_Y + 6} width={FRONTEND.x - BACKEND.x - BACKEND.w} height={18}>
          <div className="arch-diagram__protocol">
            <p>{diagram.protocol.forward}</p>
          </div>
        </foreignObject>
        <foreignObject x={BACKEND.x + BACKEND.w} y={PROTOCOL_BACKWARD_Y + 10} width={FRONTEND.x - BACKEND.x - BACKEND.w} height={18}>
          <div className="arch-diagram__protocol">
            <p>{diagram.protocol.backward}</p>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

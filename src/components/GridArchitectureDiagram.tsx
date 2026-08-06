import type { GridArchitectureDiagram as GridArchitectureDiagramData } from "../data/portfolio";

type GridArchitectureDiagramProps = {
  diagram: GridArchitectureDiagramData;
};

const VIEW_WIDTH = 1180;
const VIEW_HEIGHT = 420;

const ROW1_Y = 20;
const ROW2_Y = 250;
const ROW_H = 150;
const COL_W = 353;
const COL_X = [40, 413, 786];

function Cell({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  note,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle: string;
  note?: string;
}) {
  return (
    <>
      <rect className="arch-diagram__container" x={x} y={y} width={w} height={h} rx={16} />
      <foreignObject x={x} y={y} width={w} height={h}>
        <div className="prism-diagram__body prism-diagram__body--center">
          <div className="arch-diagram__title">
            <strong>{title}</strong>
            <span>{subtitle}</span>
          </div>
          {note ? <p className="prism-diagram__note">{note}</p> : null}
        </div>
      </foreignObject>
    </>
  );
}

export function GridArchitectureDiagram({ diagram }: GridArchitectureDiagramProps) {
  return (
    <div className="arch-diagram arch-diagram--wide" role="img" aria-label="git-reflow 전체 시스템 아키텍처 다이어그램">
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="grid-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path className="arch-diagram__arrowhead" d="M0,0 L10,5 L0,10 Z" />
          </marker>
        </defs>

        {COL_X.slice(0, -1).map((colX, index) => (
          <line
            key={`row1-edge-${colX}`}
            className="arch-diagram__edge"
            markerEnd="url(#grid-arrow)"
            x1={colX + COL_W}
            y1={ROW1_Y + ROW_H / 2}
            x2={COL_X[index + 1]}
            y2={ROW1_Y + ROW_H / 2}
          />
        ))}
        {COL_X.slice(0, -1).map((colX, index) => (
          <line
            key={`row2-edge-${colX}`}
            className="arch-diagram__edge"
            markerEnd="url(#grid-arrow)"
            x1={colX + COL_W}
            y1={ROW2_Y + ROW_H / 2}
            x2={COL_X[index + 1]}
            y2={ROW2_Y + ROW_H / 2}
          />
        ))}
        {COL_X.map((colX) => (
          <line
            key={`col-edge-${colX}`}
            className="arch-diagram__edge"
            markerEnd="url(#grid-arrow)"
            x1={colX + COL_W / 2}
            y1={ROW1_Y + ROW_H}
            x2={colX + COL_W / 2}
            y2={ROW2_Y}
          />
        ))}

        {diagram.topRow.map((node, index) => (
          <Cell key={node.title} x={COL_X[index]} y={ROW1_Y} w={COL_W} h={ROW_H} title={node.title} subtitle={node.subtitle} note={node.note} />
        ))}
        {diagram.bottomRow.map((node, index) => (
          <Cell key={node.title} x={COL_X[index]} y={ROW2_Y} w={COL_W} h={ROW_H} title={node.title} subtitle={node.subtitle} note={node.note} />
        ))}
      </svg>
    </div>
  );
}

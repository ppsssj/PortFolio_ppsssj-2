import { Fragment, type ReactNode } from "react";
import { records, type RecordEntry } from "../data/portfolio";

const formatCount = (count: number) => String(count).padStart(2, "0");

const recordGroups = [
  { id: "records-experience", label: "Experience & Activities", shortLabel: "Experience", count: records.experience.length + records.activities.length },
  { id: "records-awards", label: "Awards", shortLabel: "Awards", count: records.awards.length },
  { id: "records-certifications", label: "Certifications", shortLabel: "Certifications", count: records.certifications.length },
  { id: "records-publications", label: "Publications", shortLabel: "Publications", count: records.publications.length },
];

function RecordsGroup({ index, children }: { index: number; children: ReactNode }) {
  const group = recordGroups[index];

  return (
    <div className="records-group" id={group.id}>
      <h3 className="records-group__label">
        {group.label}
        <span>{formatCount(group.count)}</span>
      </h3>
      <div className="records-group__body">{children}</div>
    </div>
  );
}

function EntryRow({ entry, isLead = false }: { entry: RecordEntry; isLead?: boolean }) {
  return (
    <li className={`records-entry${isLead ? " records-entry--lead" : ""}`}>
      <div className="records-when">{entry.period}</div>
      <div className="records-entry__title">
        <strong>{entry.title}</strong>
        {entry.meta ? (
          <span>
            {entry.meta.split(" · ").map((part, index) => (
              <Fragment key={part}>
                {index > 0 ? " · " : null}
                <span className="records-entry__meta-part">{part}</span>
              </Fragment>
            ))}
          </span>
        ) : null}
      </div>
      <div className="records-entry__body">
        <p>{entry.description}</p>
        <span className="records-entry__keywords">{entry.keywords.join(" · ")}</span>
      </div>
    </li>
  );
}

function splitLastWord(text: string) {
  const index = text.lastIndexOf(" ");

  return index < 0 ? ["", text] : [text.slice(0, index + 1), text.slice(index + 1)];
}

export function RecordsSection() {
  return (
    <section className="anchor-section" id="records">
      <div className="block">
        <div className="heading-section sticky">
          <div className="heading-section__left">
            <h2 className="heading-section__title">Records</h2>
          </div>
          <nav className="records-index" aria-label="Records sections">
            {recordGroups.map((group) => (
              <a href={`#${group.id}`} key={group.id}>
                {group.shortLabel}
                <sup>{formatCount(group.count)}</sup>
              </a>
            ))}
          </nav>
        </div>

        <RecordsGroup index={0}>
          <ul className="records-entries">
            <li className="records-kind" aria-hidden="true">Experience</li>
            {records.experience.map((entry) => (
              <EntryRow entry={entry} isLead key={entry.title} />
            ))}
            <li className="records-kind" aria-hidden="true">Activities</li>
            {records.activities.map((entry) => (
              <EntryRow entry={entry} key={entry.title} />
            ))}
          </ul>
        </RecordsGroup>

        <RecordsGroup index={1}>
          <ul className="records-awards">
            {records.awards.map((award) => (
              <li className="records-award" key={award.title}>
                <div className="records-award__meta">
                  <span>{award.category}</span>
                  <span className="records-when">{award.date}</span>
                </div>
                <p className="records-award__title">{award.title}</p>
                <div className="records-award__event">{award.event}</div>
              </li>
            ))}
          </ul>
        </RecordsGroup>

        <RecordsGroup index={2}>
          <ul className="records-entries">
            {records.certifications.map((certification) => (
              <li className="records-cert" key={certification.name}>
                <div className="records-when">{certification.date}</div>
                <div className="records-cert__name">
                  <strong>{certification.name}</strong>
                  <span>{certification.type}</span>
                </div>
                <div className="records-cert__scope">{certification.scope.join(" · ")}</div>
              </li>
            ))}
          </ul>
        </RecordsGroup>

        <RecordsGroup index={3}>
          <ul className="records-entries">
            {records.publications.map((publication) => {
              const [head, lastWord] = splitLastWord(publication.title);

              return (
                <li className="records-pub" key={publication.title}>
                  <div className="records-when">{publication.year}</div>
                  <div className="records-pub__main">
                    {publication.href ? (
                      <a className="records-pub__title" href={publication.href} target="_blank" rel="noreferrer">
                        {head}
                        <span className="records-pub__nowrap">
                          {lastWord}
                          <span className="records-pub__arrow" aria-hidden="true">↗</span>
                        </span>
                        <span className="visually-hidden"> (PDF, opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="records-pub__title">{publication.title}</span>
                    )}
                    <span className="records-pub__keywords">
                      {publication.href ? <b>PDF</b> : null}
                      {publication.href ? " · " : null}
                      {publication.keywords.join(" · ")}
                    </span>
                  </div>
                  <div className="records-pub__venue">
                    {publication.venue}
                    <span>{publication.type}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </RecordsGroup>
      </div>
    </section>
  );
}

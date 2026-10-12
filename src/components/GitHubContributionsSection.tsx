import { GitHubActivity } from "./GitHubActivity";

export function GitHubContributionsSection() {
  return (
    <section className="anchor-section" id="github">
      <div className="block">
        <div className="github-activity-heading">
          <h2>GitHub Contributions</h2>
        </div>
        <GitHubActivity />
      </div>
    </section>
  );
}

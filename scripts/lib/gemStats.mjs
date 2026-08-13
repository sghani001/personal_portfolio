import resumeData from '../../src/utils/resumeData.js';

export async function getLiveDownloadTotal() {
  const gems = resumeData.openSource.gems;

  const results = await Promise.allSettled(
    gems.map(g =>
      fetch(`https://rubygems.org/api/v1/gems/${g.name}.json`).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }).then(data => data.downloads ?? 0)
    )
  );

  let sum = 0;
  let anyOk = false;
  for (const r of results) {
    if (r.status === 'fulfilled') {
      sum += r.value;
      anyOk = true;
    }
  }

  return anyOk
    ? { total: sum, isLive: true }
    : { total: resumeData.openSource.combinedDownloads, isLive: false };
}

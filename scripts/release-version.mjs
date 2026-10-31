const VERSION_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

const parseVersion = (version) => {
  const match = VERSION_PATTERN.exec(version);
  if (!match) return null;

  const parts = match.slice(1).map(Number);
  if (parts.some((part) => !Number.isSafeInteger(part))) return null;

  return parts;
};

export const getReleaseType = (previousVersion, nextVersion) => {
  const previous = parseVersion(previousVersion);
  const next = parseVersion(nextVersion);
  if (!previous || !next) return null;

  const [previousMajor, previousMinor, previousPatch] = previous;
  const [nextMajor, nextMinor, nextPatch] = next;

  if (previousVersion === '0.0.0') return nextVersion === '2.0.0' ? 'initial' : null;
  if (previousVersion === '2.0.0' && nextVersion === '2.0.0') return 'pre-versioning';
  if (nextMajor === previousMajor + 1 && nextMinor === 0 && nextPatch === 0) return 'major';
  if (nextMajor === previousMajor && nextMinor === previousMinor + 1 && nextPatch === 0) return 'minor';
  if (nextMajor === previousMajor && nextMinor === previousMinor && nextPatch === previousPatch + 1) {
    return 'patch';
  }

  return null;
};

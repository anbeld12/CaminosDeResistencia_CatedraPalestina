import type { ProjectKind } from './types';
import type { ProjectRow } from '../types/database';
import type { Project } from './types';
import { VALID_KINDS } from './constants';

export function toProject(row: ProjectRow): Project {
  const kind: ProjectKind = VALID_KINDS.includes(row.kind as never)
    ? (row.kind as ProjectKind)
    : 'ensayo';

  return {
    id: row.id,
    kind,
    title: row.title,
    author: row.author,
    year: row.year,
    n: row.n,
    tags: row.tags,
    description: row.description ?? undefined,
    url: row.url ?? undefined,
    urlAlt: row.url_alt ?? undefined,
    links: row.links ?? undefined,
    linkLabel: row.link_label ?? undefined,
    thumbnail: row.thumbnail ?? undefined,
    aiThumbnail: row.ai_thumbnail,
    members: row.members,
    group: row.group_name ?? undefined,
  };
}

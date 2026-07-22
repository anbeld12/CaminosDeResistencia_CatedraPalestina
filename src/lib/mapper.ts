import type { ProjectKind } from './types';
import type { ProjectRow } from '../types/database';
import type { Project } from './types';

export function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    kind: row.kind as ProjectKind,
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

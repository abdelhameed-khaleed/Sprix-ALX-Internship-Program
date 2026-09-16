import {
  FileText,
  Info,
  LayoutTemplate,
  Link2,
  MonitorSmartphone,
  PlayCircle,
} from "lucide-react";
import type { Resource, ResourceType } from "@/content/resources";
import { Badge, ButtonLink, Card, IconTile } from "@/components/ui";

const typeIconMap: Record<ResourceType, typeof Link2> = {
  platform: MonitorSmartphone,
  link: Link2,
  video: PlayCircle,
  document: FileText,
  template: LayoutTemplate,
};

function getActionLabel(type: ResourceType): string {
  switch (type) {
    case "video":
      return "Watch";
    case "document":
    case "template":
      return "Download";
    case "platform":
    case "link":
    default:
      return "Open";
  }
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = typeIconMap[resource.type] ?? Link2;
  const weekLabel = resource.week === "general" ? "General" : `Week ${resource.week}`;
  const actionLabel = getActionLabel(resource.type);

  return (
    <Card className="flex h-full flex-col justify-between transition-shadow duration-200 hover:shadow-e2">
      <div>
        <div className="flex items-center justify-between gap-2">
          <IconTile tone="blue">
            <Icon className="size-6 text-navy" aria-hidden="true" />
          </IconTile>
          <Badge tone={resource.week === "general" ? "blue" : "navy"}>
            {weekLabel}
          </Badge>
        </div>

        <h3 className="mt-4 text-xl font-bold text-navy">{resource.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {resource.description}
        </p>
      </div>

      <div className="mt-6 border-t border-line/70 pt-4">
        {resource.url ? (
          <ButtonLink
            href={resource.url}
            external
            variant="primary"
            className="w-full sm:w-auto"
          >
            {actionLabel}
          </ButtonLink>
        ) : (
          <div className="flex items-start gap-2 text-sm text-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
            <span>{resource.note}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

"use client";

import { useMemo, useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  filterNames,
  GENDERS,
  genderLabel,
  ORIGINS,
  originLabel,
  type DogName,
  type Gender,
  type Origin,
} from "@/lib/names";

type NameExplorerProps = {
  names: readonly DogName[];
};

export function NameExplorer({ names }: NameExplorerProps) {
  const [text, setText] = useState("");
  const [gender, setGender] = useState<Gender | "all">("all");
  const [origin, setOrigin] = useState<Origin | "all">("all");

  const matches = useMemo(
    () => filterNames(names, { text, gender, origin }),
    [names, text, gender, origin],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Search names, meanings, or tags</span>
          <Input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Try moon, norse, or short"
            className="h-11 bg-card text-base"
            autoComplete="off"
            spellCheck={false}
          />
        </label>

        <FilterRow label="Vibe">
          <FilterChip
            pressed={gender === "all"}
            onClick={() => setGender("all")}
          >
            All
          </FilterChip>
          {GENDERS.map((value) => (
            <FilterChip
              key={value}
              pressed={gender === value}
              onClick={() => setGender(value)}
            >
              {genderLabel(value)}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow label="Origin">
          <FilterChip
            pressed={origin === "all"}
            onClick={() => setOrigin("all")}
          >
            All
          </FilterChip>
          {ORIGINS.map((value) => (
            <FilterChip
              key={value}
              pressed={origin === value}
              onClick={() => setOrigin(value)}
            >
              {originLabel(value)}
            </FilterChip>
          ))}
        </FilterRow>
      </div>

      <p className="text-sm text-muted-foreground">
        {matches.length === names.length
          ? `${matches.length} names`
          : `${matches.length} of ${names.length} names`}
      </p>

      {matches.length === 0 ? (
        <p className="rounded-xl border border-dashed bg-card px-4 py-10 text-center text-muted-foreground">
          No names match that mix. Clear a filter or try a shorter search.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {matches.map((item) => (
            <li key={item.slug}>
              <NameCard name={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={pressed ? "default" : "outline"}
      aria-pressed={pressed}
      onClick={onClick}
      className="rounded-full"
    >
      {children}
    </Button>
  );
}

function NameCard({ name }: { name: DogName }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="font-heading text-2xl tracking-tight">
            {name.name}
          </CardTitle>
          <Badge variant="secondary">{genderLabel(name.gender)}</Badge>
        </div>
        <CardDescription>{originLabel(name.origin)}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-sm leading-6">{name.meaning}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {name.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

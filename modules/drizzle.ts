// https://github.com/nuxt/nuxt/blob/4e05650cde31ca73be4d14b1f0d23c7854008749/packages/nuxt/src/core/nuxt.ts#L404
import { addCustomTab } from "@nuxt/devtools-kit";
import {
  addServerImports,
  addServerImportsDir,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "Drizzle",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    const sources: Record<string, string[]> = {
      "../server/database/database": ["db"],
      "drizzle-orm": [
        "asc",
        "desc",
        "eq",
        "ne",
        "and",
        "or",
        "not",
        "gt",
        "gte",
        "lt",
        "lte",
        "inArray",
        "notInArray",
        "isNull",
        "isNotNull",
        "exists",
        "notExists",
        "between",
        "notBetween",
        "like",
        "notLike",
        "ilike",
        "notIlike",
        "arrayContains",
        "arrayContained",
        "arrayOverlaps",
      ],
    };

    // Add server imports
    addServerImports(
      Object.entries(sources).flatMap(([source, names]) => {
        return names.map((name) => {
          const sourcePath = source.startsWith(".")
            ? resolver.resolve(source)
            : source;

          return { from: sourcePath, name };
        });
      }),
    );

    addServerImportsDir(resolver.resolve("../server/database/schemas"));

    // Add custom devtools tabs
    addCustomTab({
      name: "drizzle-studio",
      title: "Drizzle Studio",
      category: "server",
      icon: "https://orm.drizzle.team/svg/drizzle.svg",
      view: {
        type: "iframe",
        src: "https://local.drizzle.studio",
      },
    });

    addCustomTab({
      name: "drizzle-docs",
      title: "Drizzle Docs",
      icon: "https://orm.drizzle.team/svg/drizzle.svg",
      view: {
        type: "iframe",
        src: "https://orm.drizzle.team/docs/overview",
      },
    });
  },
});

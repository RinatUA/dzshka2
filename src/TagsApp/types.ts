import { Prisma } from "@prisma/client";
// Как получаешь тип, если модель не создана?))
export type Tag = Prisma.TagsGetPayload<{}>
// packages
import { Module } from "@nestjs/common";

// local modules
import { NoteService } from "src/note/note.service";
import { NoteController } from "src/note/note.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}

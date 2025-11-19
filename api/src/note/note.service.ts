// packages
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Note } from "generated/prisma";
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";

// local modules
import { CreateNoteDTO } from "src/note/dto/create-note.dto";
import { UpdateNoteDTO } from "src/note/dto/update-note.dto";
import { PrismaService } from "src/prisma/prisma.service";

interface SkipTakeType {
  skip: number;
  take: number;
}

@Injectable()
export class NoteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createNoteDto: CreateNoteDTO, userId: string): Promise<Note> {
    const note = await this.prismaService.note.create({
      data: {
        title: createNoteDto.title,
        body: createNoteDto.body,
        userId: userId,
      },
    });

    return note;
  }

  async findAll({ skip, take }: SkipTakeType, userId: string): Promise<Note[]> {
    const notes = await this.prismaService.note.findMany({
      skip,
      take,
      where: {
        userId,
      },
    });

    return notes;
  }

  async findOne(id: string, userId: string): Promise<Note> {
    const note = await this.prismaService.note.findFirst({
      where: {
        id: id,
      },
    });

    if (!note) {
      throw new NotFoundException("Note not found.");
    }

    if (note.userId !== userId) {
      throw new ForbiddenException("Cannot fetch note, not allowed.");
    }

    return note;
  }

  async update(
    id: string,
    updateNoteDTO: UpdateNoteDTO,
    userId: string
  ): Promise<Note> {
    const noteToUpdate = await this.prismaService.note.findFirst({
      where: {
        id,
      },
    });

    if (!noteToUpdate) {
      throw new NotFoundException("The note you want to update not found.");
    }

    if (noteToUpdate.userId !== userId) {
      throw new ForbiddenException("You are not allowed to update this note.");
    }

    const updatedNote = await this.prismaService.note.update({
      where: {
        id,
      },
      data: updateNoteDTO,
    });

    return updatedNote;
  }

  async remove(id: string, userId: string): Promise<string> {
    try {
      const noteToDelete = await this.prismaService.note.delete({
        where: {
          id: id,
          userId: userId,
        },
      });

      return `Note with ID ${noteToDelete.id} has been deleted.`;
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new ForbiddenException();
        }
      }

      throw error;
    }
  }
}

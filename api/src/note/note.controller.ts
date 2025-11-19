// packages
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
  Request,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { Note } from "generated/prisma";

// local modules
import { AuthGuard } from "src/auth/auth.guard";
import { NoteService } from "src/note/note.service";
import { CreateNoteDTO } from "src/note/dto/create-note.dto";
import { UpdateNoteDTO } from "src/note/dto/update-note.dto";
import { CUIDValidationPipe } from "src/lib/cuid-validation.pipe";

interface RequestUser {
  user: { sub: string };
}

@Controller("api/v1/notes")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  /**
   * Create a new note for the authenticated user.
   *
   * @description The `sub` field from the JWT payload (extracted by `AuthGuard`)
   * identifies the user. The incoming DTO contains the note's title and body.
   *
   * @param createNoteDTO - Data Transfer Object containing note information
   * @param req - Express request object containing decoded JWT user data
   * @returns The newly created Note
   */
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createNoteDTO: CreateNoteDTO,
    @Request() req: RequestUser
  ): Promise<Note> {
    return this.noteService.create(createNoteDTO, req.user.sub);
  }

  /**
   * Retrieve all notes belonging to the authenticated user.
   *
   * @description Supports pagination using optional `take` and `skip` query parameters.
   * - `take`: How many notes to return (default: 10)
   * - `skip`: How many notes to skip before returning results (default: 10)
   *
   * @param req - Request containing user data from JWT
   * @param take - Number of items to return
   * @param skip - Number of items to skip
   * @returns A list of notes owned by the authenticated user
   */
  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Request() req: RequestUser,
    @Query("take", new ParseIntPipe({ optional: true })) take?: number,
    @Query("skip", new ParseIntPipe({ optional: true })) skip?: number
  ): Promise<Note[]> {
    return this.noteService.findAll(
      {
        take: take || 10,
        skip: skip || 0,
      },
      req.user.sub
    );
  }

  /**
   * Retrieve a single note by its ID.
   *
   * @description Only the owner of the note can access it. The service layer verifies
   * that the provided `id` belongs to a note owned by the authenticated user.
   *
   * @param id - The ID of the note
   * @param req - Request containing the authenticated user's ID
   * @returns The requested Note if it belongs to the user
   */
  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(
    @Param("id", CUIDValidationPipe) id: string,
    @Request() req: RequestUser
  ): Promise<Note> {
    return this.noteService.findOne(id, req.user.sub);
  }

  /**
   * Update an existing note belonging to the authenticated user.
   *
   * @description The method validates the note ID, verifies ownership,
   * and updates only the provided fields.
   *
   * @param id - The ID of the note to update
   * @param updateNoteDto - Fields to update (title/body)
   * @param req - Request containing authenticated user info
   * @returns The updated Note
   */
  @UseGuards(AuthGuard)
  @Patch(":id")
  async update(
    @Param("id", CUIDValidationPipe) id: string,
    @Body() updateNoteDTO: UpdateNoteDTO,
    @Request() req: RequestUser
  ): Promise<Note> {
    return this.noteService.update(id, updateNoteDTO, req.user.sub);
  }

  /**
   * Delete a note belonging to the authenticated user.
   *
   * @description Only the owner of the note can delete it. The service checks ownership
   * and then removes the note from the database.
   *
   * @param id - ID of the note to delete
   * @param req - Request containing authenticated user data
   * @returns A success message or confirmation string
   */
  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(
    @Param("id", CUIDValidationPipe) id: string,
    @Request() req: RequestUser
  ): Promise<string> {
    return this.noteService.remove(id, req.user.sub);
  }
}

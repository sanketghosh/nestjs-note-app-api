import { PartialType } from "@nestjs/mapped-types";
import { CreateNoteDTO } from "src/note/dto/create-note.dto";

export class UpdateNoteDTO extends PartialType(CreateNoteDTO) {}

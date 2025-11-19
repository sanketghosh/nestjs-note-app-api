// import { PartialType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/swagger";
import { CreateNoteDTO } from "src/note/dto/create-note.dto";

export class UpdateNoteDTO extends PartialType(CreateNoteDTO) {}

import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDTO {
  @IsNotEmpty({ message: "There must be a note title." })
  @IsString({ message: "Note title must be a proper string." })
  title: string;

  @IsNotEmpty({ message: "Note body must be filled." })
  @IsString({ message: "Body of the note must be a string." })
  body: string;
}

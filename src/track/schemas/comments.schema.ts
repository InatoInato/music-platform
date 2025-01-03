
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Track } from "./track.schema";
import { Types } from "mongoose";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment{
    @Prop()
    username: string;

    @Prop()
    text: string;

    @Prop({type: Types.ObjectId, ref: 'Track'})
    track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
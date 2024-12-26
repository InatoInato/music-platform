import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Comment } from "./comments.schema";

export type TrackDocument = Track & Document;

@Schema()
export class Track{
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    track: string;

    @Prop()
    listens: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop({type: [{type: Types.ObjectId, ref: "Comment"}]})
    comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
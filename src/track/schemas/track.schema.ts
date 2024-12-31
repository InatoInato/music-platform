import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Comment } from "./comments.schema";

export type TrackDocument = Track & Document;

@Schema()
export class Track{
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    artist: string;

    @Prop()
    text: string;

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
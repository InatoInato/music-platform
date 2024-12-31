import { Module } from "@nestjs/common";
import { TrackModule } from './track/track.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, "static"),
            serveRoot: "/static"
        }),
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_URL),
        TrackModule,
        FileModule
    ]
})

export class AppModule{}
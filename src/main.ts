import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async () => {
    try{
        const PORT = process.env.PORT || 3000;
        const app = await NestFactory.create(AppModule);
        app.enableCors();
        await app.listen(PORT, () => console.log(`Started in port ${PORT}`))
    } catch(e){
        console.log(e);
    }
}

start();
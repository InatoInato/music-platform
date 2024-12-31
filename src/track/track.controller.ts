import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-tracko.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: "picture", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]))
  async create(
    @Body() dto: CreateTrackDto,
    @UploadedFiles() files
  ) {
    try {
      const { picture, audio } = files;
      return await this.trackService.create(dto, picture[0], audio[0]);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAll(
    @Query('count') count: number,
    @Query('offset') offset: number
  ) {
    try {
      return await this.trackService.getAll(count, offset);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  async getOne(@Param("id") id: ObjectId) {
    try {
      return await this.trackService.getOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: ObjectId) {
    try {
      return await this.trackService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("comment")
  async addComment(@Body() dto: CreateCommentDto) {
    try {
      return await this.trackService.addComment(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("listen/:id")
  async listen(@Param("id") id: ObjectId) {
    try {
      return await this.trackService.listen(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("search")
  search(
    @Query('query') query: string
  ){
    return this.trackService.search(query);
  }
}

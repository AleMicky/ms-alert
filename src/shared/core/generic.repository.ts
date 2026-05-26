import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

import { BaseRepository } from './base.repository';

export abstract class GenericRepository<
  T extends { id: string },
> implements BaseRepository<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }

  async create(entity: Partial<T>): Promise<T> {
    const newEntity = this.repository.create(entity as DeepPartial<T>);

    return this.repository.save(newEntity);
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    await this.repository.update(id, entity as any);

    const updated = await this.findOne(id);

    if (!updated) {
      throw new Error('Registro no encontrado');
    }

    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

/*
import {
  DeepPartial,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { BaseRepository } from './base.repository';

export interface Mapper<
  Domain,
  Persistence,
> {
  toDomain(
    entity: Persistence,
  ): Domain;

  toPersistence(
    domain: Partial<Domain>,
  ): Partial<Persistence>;
}

export abstract class GenericRepository<
  Domain extends { id: string },
  Persistence extends { id: string },
> implements BaseRepository<Domain>
{
  protected constructor(
    protected readonly repository: Repository<Persistence>,

    protected readonly mapper: Mapper<
      Domain,
      Persistence
    >,
  ) {}

  async findAll(): Promise<Domain[]> {
    const entities =
      await this.repository.find();

    return entities.map(entity =>
      this.mapper.toDomain(entity),
    );
  }

  async findOne(
    id: string,
  ): Promise<Domain | null> {
    const entity =
      await this.repository.findOne({
        where: {
          id,
        } as FindOptionsWhere<Persistence>,
      });

    if (!entity) {
      return null;
    }

    return this.mapper.toDomain(entity);
  }

  async create(
    entity: Partial<Domain>,
  ): Promise<Domain> {
    const persistence =
      this.mapper.toPersistence(entity);

    const newEntity =
      this.repository.create(
        persistence as DeepPartial<Persistence>,
      );

    const saved =
      await this.repository.save(newEntity);

    return this.mapper.toDomain(saved);
  }

  async update(
    id: string,
    entity: Partial<Domain>,
  ): Promise<Domain> {
    const persistence =
      this.mapper.toPersistence(entity);

    await this.repository.update(
      id,
      persistence as any,
    );

    const updated =
      await this.findOne(id);

    if (!updated) {
      throw new Error(
        'Registro no encontrado',
      );
    }

    return updated;
  }

  async delete(
    id: string,
  ): Promise<void> {
    await this.repository.delete(id);
  }
}

*/

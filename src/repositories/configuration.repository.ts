import { EntityRepository, Repository } from 'typeorm';
import { Configuration } from './../entities/configuration.entity';

@EntityRepository(Configuration)
export class ConfigurationRepository extends Repository<Configuration> {}

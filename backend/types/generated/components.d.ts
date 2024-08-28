import type { Schema, Attribute } from '@strapi/strapi';

export interface NameDirectors extends Schema.Component {
  collectionName: 'components_name_directors';
  info: {
    displayName: 'directors';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface NameProducers extends Schema.Component {
  collectionName: 'components_name_producers';
  info: {
    displayName: 'producers';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface TimestampTimestamp extends Schema.Component {
  collectionName: 'components_timestamp_timestamps';
  info: {
    displayName: 'Timestamp';
    description: '';
  };
  attributes: {
    start: Attribute.Integer;
    end: Attribute.Integer;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'name.directors': NameDirectors;
      'name.producers': NameProducers;
      'timestamp.timestamp': TimestampTimestamp;
    }
  }
}

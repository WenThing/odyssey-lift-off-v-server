const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    tracksForHome: [Track!]!
    "Fetch a specific track, provided a track's ID"
    track(id: ID!): Track
    "Fetch a specific module, provided a module's ID"
    module(id: ID!): Module
  }

  type Mutation {
    "Increase the view count of a Track, with argument of ID"
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
  
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "the track's title"
    title: String!
    "the track's main author"
    author: Author!
    "the track's main illustration to display in track car"
    thumbnail: String
    "the track's approximate length to complete, in seconds"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The track's full duration, in seconds"
    durationInSeconds: Int
    "the number of modules this track contains"
    modulesCount: Int
    "The track's complete description, can be in Markdown format"
    description: String
    "The number of times a track has been viewed"
    numberOfViews: Int
    "The track's complete array of Modules"
    modules: [Module!]!
  }

  "A Module is a single unit of teaching. Multiple Modules compose a Track"
  type Module {
    id: ID!
    "The Module's title"
    title: String!
    "The Module's length in seconds"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The module's video duration, in seconds"
    durationInSeconds: Int
    "The Module's video URL, for video-based modules"
    videoUrl: String
    "The Module's text-based description, can be in Markdown format. In case of a video, it will be the enriched transcript"
    content: String
  }

  "Author of a complete Track"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture url"
    photo: String
  }

  type IncrementTrackViewsResponse{
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }
`;

module.exports = typeDefs;

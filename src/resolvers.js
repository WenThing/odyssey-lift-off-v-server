//A resolver function populates the data for a field in your schema.
// same name as in Schema
const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    // Query.track -> get a single track by id, for the Track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },
    //get a single module by id, for the Module detail page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
  },
  Mutation: {
    // increment's a track's numberOfViews property with async to wait for response
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        };
      }
    },
  },
  // four parameters - (parent, args, context, info)=>{}
  // Form a resolver chain using the parent
  Track: {
    // this is a resolver function for the Track.author field
    // destructure authorId from the parent argument
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    // this is a resolver function for the Track.modules field
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
    // this is a resolver for Track.durationInSeconds
    // destructure length (variable name in API) from the parent argument
    durationInSeconds: ({ length }) => length,
  },
  Module: {
    // this is a resolver for Module.durationInSeconds
    // destructure length (variable name in API) from the parent argument
    durationInSeconds: ({ length }) => length,
  }
};

module.exports = resolvers;

const { RESTDataSource } = require('apollo-datasource-rest');

class TrackAPI extends RESTDataSource{
    constructor() {
        super();
        this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';
    }

    getTracksForHome() {
        return this.get('tracks');
    }
    //Note the use of backticks (`) enclosing the author/:id endpoint, because we're using string interpolation to add the authorId at the end.
    getAuthor(authorId) {
        return this.get(`author/${authorId}`);
    }

    getTrack(trackId) {
        return this.get(`track/${trackId}`);
    }

    getTrackModules(trackId) {
        return this.get(`track/${trackId}/modules`);
    }

    getModule(moduleId) {
        return this.get(`module/${moduleId}`);
    }

    incrementTrackViews(trackdId) {
        return this.patch(`track/${trackdId}/numberOfViews`)
    }

}

module.exports = TrackAPI;
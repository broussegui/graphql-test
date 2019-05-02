const typeDefs = `
    # get my user
	type User {
		id: ID!
		name: String!
		username: String!
		email: String!
		address: Address!
		phone: String!
		whebsite: String!
		company: Company!
		albums: [Album!]
		todos: [Todo!]
		posts: [Post!]
	}
	type Company {
		name: String!
		catchPhrase: String!
		bs: String!
	}
	type Address {
		street: String!
		suite: String!
		city: String!
		zipcode: String!
		geo: Geo!
	}
	type Geo {
		lat: String!
		lng: String!
	}
	type Todo {
		user: User!
		id: ID!
		title: String!
		completed: Boolean!
	}
	type Photo {
		album: Album!
		id: ID!
		title: String!
		url: String!
		thumbnailUrl: String!
	}
	type Album {
		photos: [Photo!]
		user: User!
		id: ID!
		title: String!
	}
	type Comment {
		post: Post!
		id: ID!
		name: String!
		email: String!
		body: String!
	}
	type Post {
		user: User!
		id: ID!
		title: String!
		body: String!
		comments: [Comment!]
	}
	type Query {
		users(id: ID): [User!]
		todos(id: ID): [Todo!]
		photos(id: ID): [Photo!]
		albums(id: ID): [Album!]
		posts(id: ID): [Post!]
		comments(id: ID): [Comment!]
	}
`

module.exports = typeDefs